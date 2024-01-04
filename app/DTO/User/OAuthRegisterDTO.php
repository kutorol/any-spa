<?php

declare(strict_types=1);

namespace App\DTO\User;

use App\Enums\Common\Locale;
use App\Enums\User\RolesEnum;
use App\Enums\User\SexEnum;
use App\Models\User\OAuth;

class OAuthRegisterDTO
{
    private string $name = '';

    private string $title = OAuth::OAUTH_TITLE_GOOGLE;

    private string $email = '';

    private RolesEnum $role = RolesEnum::USER;

    private SexEnum $sex = SexEnum::MALE;

    private Locale $locale = Locale::RU;

    private ?string $rawLocale = null;

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

    public function getSex(): SexEnum
    {
        return $this->sex;
    }

    public function setSex(?string $sex): self
    {
        $this->sex = $sex ? RolesEnum::from($sex) : SexEnum::MALE;

        return $this;
    }

    public function getRole(): RolesEnum
    {
        return $this->role;
    }

    public function setRole(?string $role): self
    {
        $this->role = $role ? RolesEnum::from($role) : RolesEnum::USER;

        return $this;
    }

    public function getLocale(): Locale
    {
        return $this->locale;
    }

    public function setLocale(?string $locale): self
    {
        $l = Locale::tryFrom($locale ?? Locale::RU->value);
        if (!$l) {
            $l = Locale::RU;
        }
        $this->locale = $l;

        return $this;
    }

    public function getRawLocale(): ?string
    {
        return $this->rawLocale;
    }

    public function setRawLocale(?string $locale): self
    {
        $this->rawLocale = $locale;

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
