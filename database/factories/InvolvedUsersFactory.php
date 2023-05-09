<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Results\InvolvedUser;
use Faker\Generator as Faker;

$factory->define(InvolvedUser::class, function (Faker $faker) {
    return [
        'user_id' => $faker->numberBetween(1, 100),
        'phase_id' => $faker->numberBetween(1, 30),
        'note' => $faker->paragraph(4)
    ];
});
