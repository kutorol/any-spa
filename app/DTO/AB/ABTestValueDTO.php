<?php

declare(strict_types=1);

namespace App\DTO\AB;

class ABTestValueDTO
{
    private int $id = 0;

    private ?string $value = null;

    public function getID(): int
    {
        return $this->id;
    }

    public function setID(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value ? trim($this->value) : null;
    }

    public function setValue(?string $value): self
    {
        $this->value = $value;

        return $this;
    }
}
