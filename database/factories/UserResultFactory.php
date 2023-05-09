<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Results\UserResult;
use Faker\Generator as Faker;

$factory->define(UserResult::class, function (Faker $faker) {
    return [
        'result_id' => $faker->numberBetween(1, 50),
        'user_id' => $faker->numberBetween(1, 100),
        'date_begin' => $begin = $faker->dateTimeBetween('this week', '+31 days'),
        'date_end' => $faker->dateTimeBetween($begin, '+31 days')
    ];
});
