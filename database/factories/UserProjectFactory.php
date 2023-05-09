<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Projects\UserProject;
use Faker\Generator as Faker;

$factory->define(UserProject::class, function (Faker $faker) {

    return [
        'project_id' => $project = $faker->numberBetween(1, 15),
        'user_id' => function() use ($project) {
            do {
                $user = $this->faker->numberBetween(1, 100);
            } while (UserProject::where('user_id', $user)->where('project_id', $project)->count() !== 0);
            return $user;
        },
        'occupancy' => $faker->numberBetween(15000, 25000)
    ];
});
