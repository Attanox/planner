<?php

use Illuminate\Database\Seeder;

use App\Eloquent\User;
use App\Eloquent\Role;

use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $x = User::create([
            'name' => 'Test Dev',
            'first_name' => 'Test',
            'last_name' => 'Dev',
            'email' => 'test@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt('secret'),
            'block' => false,
            'remember_token' => Str::random(10),
        ]);
        Role::create([
            'user_id' => $x->id,
        ]);
        // factory(User::class, 99)->create();
    }
}
