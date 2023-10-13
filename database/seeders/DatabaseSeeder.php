<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\User\RolesEnum;
use App\Enums\User\SexEnum;
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

        \App\Models\User::factory()->create([
            'name' => 'Admin ad min',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => Hash::make('adminadmin'),
            'role' => RolesEnum::ROLE_SITE_ADMIN,
            'phone' => null,
            'sex' => SexEnum::MALE,
            'age' => 18,
            'is_am_pm' => false,
        ]);

        \App\Models\User::factory()->create([
            'name' => 'User us er',
            'email' => 'user@user.com',
            'email_verified_at' => now(),
            'password' => Hash::make('useruser'),
            'role' => RolesEnum::ROLE_USER,
            'phone' => null,
            'sex' => SexEnum::MALE,
            'age' => 18,
            'is_am_pm' => false,
        ]);
    }
}
