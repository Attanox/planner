<?php

use Illuminate\Database\Seeder;

use App\Eloquent;

class ResultsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Eloquent\Results\ResultCategory::class, 10)->create();
        factory(Eloquent\Results\Result::class, 50)->create();
        factory(Eloquent\Results\Phase::class, 30)->create();
    }
}
