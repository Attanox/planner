<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Results\Rank;
use Faker\Generator as Faker;

$factory->define(Rank::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->regexify('[A-Q]{1}[1-4]{1}')
    ];
});
