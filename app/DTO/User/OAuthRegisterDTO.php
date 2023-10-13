<?php

declare(strict_types=1);

namespace App\DTO\User;

use App\Enums\User\RolesEnum;
use App\Models\User\OAuth;

class OAuthRegisterDTO
{
    private string $name = '';

    private string $title = OAuth::OAUTH_TITLE_GOOGLE;

    private string $email = '';

    private string $role = RolesEnum::ROLE_USER;

    private string $locale = 'ru';

    private string $id = '';

    private ?string $img = null;

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title = OAuth::OAUTH_TITLE_GOOGLE): self
    {
        $this->title = $title;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getRole(): string
    {
        return $this->role;
    }

    public function setRole(?string $role): self
    {
        if (!RolesEnum::checkRole($role)) {
            $role = RolesEnum::ROLE_USER;
        }

        $this->role = $role;

        return $this;
    }

    public function getLocale(): string
    {
        return $this->locale;
    }

    public function setLocale(?string $locale): self
    {
        $this->locale = $locale ?? 'ru';

        return $this;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getImg(): string
    {
        return trim($this->img ?? '');
    }

    public function setImg(?string $img): self
    {
        $this->img = $img;

        return $this;
    }
}
