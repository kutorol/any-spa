<?php

declare(strict_types=1);

namespace App\DTO\TechSupport;

use App\Enums\TechSupport\TechSupportStatus;
use App\Enums\TechSupport\TechSupportType;

class TechSupportDTO
{
    private string $email = '';

    private ?int $uid = null;

    private ?TechSupportType $type = null;

    private ?TechSupportStatus $status = null;

    private string $comment = '';

    private string $locale = 'ru';

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setLocale(string $locale): self
    {
        $this->locale = $locale;

        return $this;
    }

    public function getLocale(): string
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
}
