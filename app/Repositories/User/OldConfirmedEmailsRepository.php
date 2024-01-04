<?php

declare(strict_types=1);

namespace App\Repositories\User;

use App\Models\User\OldConfirmedEmails;
use DB;

class OldConfirmedEmailsRepository
{
    public function findOldEmails(int $uid): array
    {
        return OldConfirmedEmails::select(['email'])->where('user_id', $uid)
            ->get()
            ->each(function (OldConfirmedEmails $e) {
                $e->email = mb_strtolower($e->email);
            })
            ->pluck('email', 'email')
            ->all();
    }

    public function create(int $uid, string $email): bool
    {
        $now = now();
        $email = mb_strtolower($email);

        $data = [
            'user_id' => $uid,
            'email' => $email,
            'created_at' => $now,
            'updated_at' => $now,
        ];

        return OldConfirmedEmails::upsert(
            $data,
            // ON CONFLICT (user_id, email)
            ['user_id', 'email'],
            // какие поля обновляем через updated_at
            // можно 'updated_at' => DB::raw('EXCLUDED.updated_at')
            ['updated_at']
        ) > 0;
    }
}
