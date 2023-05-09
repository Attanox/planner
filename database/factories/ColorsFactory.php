<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Projects\ProjectColor;
use Faker\Generator as Faker;

$factory->define(ProjectColor::class, function (Faker $faker) {
    return [
        'hex' => $faker->unique()->regexify('[A-F0-9]{6}')
    ];
});
