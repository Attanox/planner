<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Results\Result;
use Faker\Generator as Faker;
use Faker\Provider\DateTime;

$factory->define(Result::class, function (Faker $faker) {
    $status_options = array('scheduled', 'in_progress', 'delayed', 'done');

    return [
        'title' => $faker->unique()->sentence(5),
        'author' => $faker->numberBetween(1, 100),
        'type_id' => $faker->numberBetween(1, 10),
        'status' => $status_options[array_rand($status_options)],
        'result_category_id' => $faker->numberBetween(1, 10),
        'comment' => $faker->text(200),
    ];
});
