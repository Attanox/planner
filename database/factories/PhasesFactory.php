<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Results\Phase;
use Faker\Generator as Faker;

$factory->define(Phase::class, function (Faker $faker) {
    return [
        'result_id' => $faker->numberBetween(1, 50),
        'name' => $faker->sentence(5),
        'date_begin' => $begin = $faker->dateTimeBetween('this week', '+31 days'),
        'date_end' => $faker->dateTimeBetween($begin, '+31 days'),
        'description' => $faker->paragraph(4)
    ];
});
