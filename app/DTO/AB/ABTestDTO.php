<?php

declare(strict_types=1);

namespace App\DTO\AB;

class ABTestDTO
{
    private int $id = 0;

    private ?string $nameTest = null;

    private int $totalPercentFromUsers = 0;

    private int $maxCountUsersInTest = 0;

    private bool $isActive = false;

    private ?string $comment = null;

    /** @var ABTestValueDTO[] array */
    private array $values = [];

    public function getID(): int
    {
        return $this->id;
    }

    public function setID(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    public function getNameTest(): ?string
    {
        return $this->nameTest;
    }

    public function setNameTest(string $nameTest): self
    {
        $this->nameTest = $nameTest;

        return $this;
    }

    public function getTotalPercentFromUsers(): int
    {
        return $this->totalPercentFromUsers;
    }

    public function setTotalPercentFromUsers(int $totalPercentFromUsers): self
    {
        $this->totalPercentFromUsers = $totalPercentFromUsers;

        return $this;
    }

    public function getMaxCountUsersInTest(): int
    {
        return $this->maxCountUsersInTest;
    }

    public function setMaxCountUsersInTest(int $maxCountUsersInTest): self
    {
        $this->maxCountUsersInTest = $maxCountUsersInTest;

        return $this;
    }

    public function getIsActive(): bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): self
    {
        $this->comment = $comment;

        return $this;
    }

    public function getValues(): array
    {
        return $this->values;
    }

    public function setValues(array $values): self
    {
        $this->values = $values;

        return $this;
    }
}
