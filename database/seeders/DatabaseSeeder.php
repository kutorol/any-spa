<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\User\RolesEnum;
use App\Enums\User\SexEnum;
use App\Models\User;
use App\Models\User\UserInfo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        /** @var User $u */
        $u = User::factory()->create([
            'name' => 'Admin male 1',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => Hash::make('adminadmin'),
            'role' => RolesEnum::SITE_ADMIN->value,
        ]);

        UserInfo::create([
            'user_id' => $u->id,
            'phone' => null,
            'sex' => SexEnum::MALE->value,
            'age' => 25,
            'is_am_pm' => false,
        ]);

        $u = User::factory()->create([
            'name' => 'User female 2',
            'email' => 'user@user.com',
            'email_verified_at' => now(),
            'password' => Hash::make('useruser'),
            'role' => RolesEnum::USER->value,
        ]);

        UserInfo::create([
            'user_id' => $u->id,
            'phone' => null,
            'sex' => SexEnum::FEMALE->value,
            'age' => 18,
            'is_am_pm' => true,
        ]);
    }
}
