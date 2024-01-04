<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\OAuth;

use App\DTO\User\OAuthRegisterDTO;
use App\Http\Controllers\Api\BaseController;
use App\Http\Controllers\Api\User\AuthController;
use App\Http\Requests\User\OAuth\GoogleOAuthRequest;
use App\Http\Requests\User\OAuth\OAuthRequestInterface;
use App\Models\User\OAuth;
use App\Repositories\User\OAuthRepository;
use Illuminate\Http\JsonResponse;
use ParagonIE\Paseto\Exception\PasetoException;

class GoogleOAuthController extends BaseController implements OAuthInterface
{
    /**
     * @throws \Throwable
     */
    public function index(GoogleOAuthRequest $request): JsonResponse
    {
        return $this->auth($request);
    }

    /**
     * @throws \Throwable
     */
    public function auth(OAuthRequestInterface $request): JsonResponse
    {
        $oauthRep = app(OAuthRepository::class);
        $data = $request->validated();

        /** @var OAuth|null $oauthInfo */
        $oauthInfo = $oauthRep->findByEmail($data['email'], OAuth::OAUTH_TITLE_GOOGLE);
        if ($oauthInfo) {
            return $this->login($oauthInfo);
        }

        return $this->register($data);
    }

    /**
     * @throws \Throwable
     * @throws PasetoException
     */
    private function login(OAuth $oauthInfo): JsonResponse
    {
        return app(AuthController::class)->loginOauth($oauthInfo);
    }

    /**
     * @throws \Throwable
     */
    private function register(array $data): JsonResponse
    {
        $dto = (new OAuthRegisterDTO())
            ->setEmail($data['email'])
            ->setRawLocale($data[self::LOCALE_PARAM] ?? null)
            ->setLocale($data[self::LOCALE_PARAM] ?? null)
            ->setId($data['id'])
            ->setImg($data['avatar'] ?? null)
            ->setName($data['name'])
            ->setRole($data['role'] ?? null)
            ->setTitle(OAuth::OAUTH_TITLE_GOOGLE);

        return app(AuthController::class)->registerOauth($dto);
    }
}
