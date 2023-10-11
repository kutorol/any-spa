<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
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
            'role' => User::ROLE_SITE_ADMIN,
            'phone' => null,
            'sex' => User::MALE,
        ]);

        \App\Models\User::factory()->create([
            'name' => 'User us er',
            'email' => 'user@user.com',
            'email_verified_at' => now(),
            'password' => Hash::make('useruser'),
            'role' => User::ROLE_USER,
            'phone' => null,
            'sex' => User::MALE,
        ]);
    }
}
