<?php

declare(strict_types=1);

namespace App\DTO\TechSupport;

use App\Enums\Common\Locale;
use App\Enums\TechSupport\TechSupportStatus;
use App\Enums\TechSupport\TechSupportType;

class TechSupportDTO
{
    private ?string $ip = null;

    private ?string $userAgent = null;

    private string $email = '';

    private ?int $uid = null;

    private ?TechSupportType $type = null;

    private ?TechSupportStatus $status = null;

    private string $comment = '';

    private Locale $locale = Locale::RU;

    private ?string $fromURL = null;

    public function __construct()
    {
        $this->ip = request()->ip();
        $this->userAgent = request()->userAgent();
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setLocale(Locale $locale): self
    {
        $this->locale = $locale;

        return $this;
    }

    public function getLocale(): Locale
    {
        return $this->locale;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getUID(): ?int
    {
        return $this->uid;
    }

    public function setUID(?int $uid): self
    {
        $this->uid = $uid;

        return $this;
    }

    public function getType(): TechSupportType
    {
        return $this->type ?? TechSupportType::TYPE_PROBLEM;
    }

    public function setType(TechSupportType $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getStatus(): TechSupportStatus
    {
        return $this->status ?? TechSupportStatus::STATUS_CREATED;
    }

    public function setStatus(TechSupportStatus $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getComment(): string
    {
        return $this->comment;
    }

    public function setComment(string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getIp(): ?string
    {
        return $this->ip;
    }

    public function getUserAgent(): ?string
    {
        return $this->userAgent;
    }

    public function getFromURL(): ?string
    {
        return $this->fromURL;
    }

    public function setFromURL(?string $fromURL): self
    {
        $this->fromURL = $fromURL;

        return $this;
    }
}
