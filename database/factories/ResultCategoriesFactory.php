<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Eloquent\Results\ResultCategory;
use Faker\Generator as Faker;

$factory->define(ResultCategory::class, function (Faker $faker) {
    $type_options = array('conference', 'workshop', 'journal');


    return [
        'acronym' => $faker->regexify('[A-Z]{1,4}'),
        'url' => $faker->url(),
        'note' => $faker->text(),
        'type' => $type_options[array_rand($type_options)],
        'rank_id' => $faker->numberBetween(1, 10)
    ];
});
