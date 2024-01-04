<?php

declare(strict_types=1);

namespace App\Repositories\User;

use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use App\Models\User\PasetoToken;
use App\Models\User\PasswordReset;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;
use ParagonIE\Paseto\Exception\PasetoException;

class PasetoTokenRepository
{
    // сколько дней действует токен доступа к сайту
    private const ACCESS_TOKEN_DAY = 1;
    // сколько дней действует токен для изменения токена доступа к сайту
    private const REFRESH_TOKEN_DAY = 30;

    public function findByID(int $uid, string $type = PasetoToken::ACCESS_TYPE): PasetoToken|Model|Builder|null
    {
        return PasetoToken::select(['user_id', 'token', 'active', 'token_type', 'expires_at'])
            ->where('user_id', $uid)
            ->where('token_type', $type)
            ->first();
    }

    public function deleteByUID(int $uid): void
    {
        PasetoToken::where('user_id', $uid)->delete();
    }

    public function delete(PasetoToken $token): bool
    {
        return (bool)$token->delete();
    }

    public function create(User $user): ?array
    {
        $now = now();

        [$untilAccess, $untilRefresh] = [now()->addDays(self::ACCESS_TOKEN_DAY), now()->addDays(self::REFRESH_TOKEN_DAY)];
        $tokenData = [
            'id' => $user->id,
            'valid_from' => $now,
            'valid_until' => $untilAccess,
            'expiration' => null,
            'claims' => ['type' => PasetoToken::ACCESS_TYPE],
        ];

        $accessToken = $user->token($tokenData);
        $refreshToken = $user->token(array_merge($tokenData, [
            'valid_until' => $untilRefresh,
            'claims' => ['type' => PasetoToken::REFRESH_TYPE],
        ]));

        $createData = [
            'user_id' => $user->id,
            'token' => $accessToken,
            'active' => 1,
            'token_type' => PasetoToken::ACCESS_TYPE,
            'expires_at' => $untilAccess,
        ];

        try {
            $createdAccess = PasetoToken::create($createData)->user_id > 0;

            $createdRefresh = PasetoToken::create(array_merge($createData, [
                'token' => $refreshToken,
                'token_type' => PasetoToken::REFRESH_TYPE,
                'expires_at' => $untilRefresh,
            ]))->user_id > 0;
        } catch (\Throwable $e) {
            PasetoToken::log()->error('create token error', [
                'code' => $e->getCode(),
                'msg' => $e->getMessage(),
            ]);

            throw new PasetoException(__('auth.token.not_created'));
        }

        if ($createdAccess && $createdRefresh) {
            return [
                BaseController::TOKEN_PARAM => [
                    PasetoToken::ACCESS_TYPE => $accessToken,
                    PasetoToken::REFRESH_TYPE => $refreshToken,
                ],
            ];
        }

        return null;
    }

    // Очищает невалидные токены авторизации
    public function clearInvalidTokens(): void
    {
        DB::transaction(function () {
            // токены авторизации
            PasetoToken::whereIn('user_id', function ($query) {
                $query->select('user_id')
                    ->from('paseto_user_token')
                    ->where('token_type', PasetoToken::REFRESH_TYPE)
                    ->where(function ($subquery) {
                        $subquery->where('active', false)->orWhere('expires_at', '<', now());
                    });
            })->delete();

            // токены восстановления пароля
            PasswordReset::where('created_at', '<', now()->addDays(2))->delete();
        });
    }

    /**
     * Пересоздает новые токены доступа для юзера в транзакции.
     * @throws \Throwable
     * @throws PasetoException
     */
    public function recreateTokenTx(?User $user): array
    {
        $err = new PasetoException(__('auth.token.not_created'));
        if (!$user) {
            throw $err;
        }

        return DB::transaction(function () use ($user, $err) {
            $this->deleteByUID($user->id);

            $tokens = $this->create($user);
            if (!$tokens) {
                throw $err;
            }

            return $tokens;
        });
    }
}
