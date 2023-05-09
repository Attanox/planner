<?php

use Illuminate\Database\Seeder;

use App\Eloquent;
use App\Eloquent\Results\Type;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // Projects 20 integers
        factory(Eloquent\Projects\ProjectColor::class, 20)->create();


        // Result Categories 10 integers
        // factory(Eloquent\Results\Rank::class, 10)->create();
        // factory(Eloquent\Results\Type::class, 10)->create();




        Type::create([
            'name' => 'Jimp',
            'description' => 'článek v impaktovaném časopise WoS'
        ]);
        Type::create([
            'name' => 'Jneimp',
            'description' => 'článek v recenzovaném časopise ve světově uznávané databázi (ERIH A, ERIH B, ERIH C, SCOPUS)'
        ]);
        Type::create([
            'name' => 'Jost',
            'description' => 'článek v recenzovaném časopise, který není v databázích'
        ]);
        Type::create([
            'name' => 'B',
            'description' => 'odborná kniha (druh výsledku B)'
        ]);
        Type::create([
            'name' => 'C',
            'description' => 'kapitola v odborné knize'
        ]);
        Type::create([
            'name' => 'D',
            'description' => 'článek ve sborníku'
        ]);
        Type::create([
            'name' => 'P',
            'description' => 'patent'
        ]);
        Type::create([
            'name' => 'F',
            'description' => 'užitný nebo průmyslový vzor'
        ]);
        Type::create([
            'name' => 'Z7',
            'description' => 'poloprovoz, ověřená technologie, odrůda, plemeno'
        ]);
        Type::create([
            'name' => 'G',
            'description' => 'prototyp, funkční vzorek'
        ]);
        Type::create([
            'name' => 'R',
            'description' => 'software'
        ]);
    }
}
