<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Projects\Project;
use Faker\Generator as Faker;

$factory->define(Project::class, function (Faker $faker) {
    return [
        'name' => $faker->unique()->sentence(4),
        'date_begin' => $begin = $faker->dateTimeBetween('-1 month', '-1 week'),
        'date_end' => $faker->dateTimeBetween($begin, '+1 month'),
        'projects_color_set_id' => $faker->numberBetween(1, 20)
    ];
});
