<?php

declare(strict_types=1);

namespace App\Repositories\User;

use App\DTO\User\OAuthRegisterDTO;
use App\Models\User;
use App\Models\User\OAuth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Query\Builder;

class OAuthRepository
{
    // Получает юзера из соц. сети по email
    public function findByEmail(string $email, string $oauthTitle = OAuth::OAUTH_TITLE_GOOGLE): OAuth|Model|Builder|null
    {
        return OAuth::select(['user_id', 'oauth_id', 'oauth_email', 'oauth_title', 'oauth_locale', 'created_at', 'updated_at'])
            ->where('oauth_email', $email)
            ->where('oauth_title', $oauthTitle)
            ->first();
    }

    // Сохраняет данные о соц. сети
    public function create(OAuthRegisterDTO $dto, User $u): ?OAuth
    {
        return OAuth::create([
            'user_id' => $u->id,
            'oauth_id' => $dto->getId(),
            'oauth_email' => $dto->getEmail(),
            'oauth_title' => $dto->getTitle(),
            'oauth_locale' => $dto->getRawLocale(),
        ]);
    }
}
