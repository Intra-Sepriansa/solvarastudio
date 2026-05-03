<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        collect([
            ['name' => 'Solvara Admin', 'email' => 'admin@solvarastudio.com'],
            ['name' => 'Web Project Admin', 'email' => 'web@solvarastudio.com'],
            ['name' => 'Network Project Admin', 'email' => 'network@solvarastudio.com'],
        ])->each(function (array $admin): void {
            User::updateOrCreate(
                ['email' => $admin['email']],
                [
                    'name' => $admin['name'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                    'is_admin' => true,
                ],
            );
        });

        $this->call([
            ServiceSeeder::class,
            PortfolioSeeder::class,
            TestimonialSeeder::class,
            FaqSeeder::class,
        ]);
    }
}
