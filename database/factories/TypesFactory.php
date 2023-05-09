<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Results\Type;
use Faker\Generator as Faker;

$factory->define(Type::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->word()
    ];
});
