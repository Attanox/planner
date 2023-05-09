<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

use App\Eloquent;

use App\Eloquent\Projects\Project;

class ProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Eloquent\Projects\Project::class, 15)->create();

        for ($i = 0; $i < 50; $i++) {
            $user_project = factory(Eloquent\Projects\UserProject::class)->create();

            $result = rand(1, 50);

            // Factory Result Project
            $relation = Eloquent\Results\ResultProject::where('project_id', $user_project->project_id)
                ->where('result_id', $result)
                ->first();

            if (! $relation) {
                Eloquent\Results\ResultProject::create([
                    'project_id' => $user_project->project_id,
                    'result_id' => $result
                ]);
            }

            // User is author
            if ($user_project->id_users == Eloquent\Results\Result::find($result)->author) {
                break;
            }

            // User is involved
            switch (rand(1, 3)) {
                case 3:
                    // CoAuthor
                    Eloquent\Results\CoAuthor::create([
                        'result_id' => $result,
                        'user_id' => $user_project->user_id,
                    ]);
                    break;

                case 2:
                    // Date
                    factory(Eloquent\Results\UserResult::class)->create([
                        'result_id' => $result,
                        'user_id' => $user_project->user_id,
                    ]);
                    break;

                default:
                    // Phase
                    $phase = Eloquent\Results\Phase::where('result_id', $result);

                    if ($phase->count() == 0) {
                        break;
                    }

                    factory(Eloquent\Results\InvolvedUser::class)->create([
                        'user_id' => $user_project->user_id,
                        'phase_id' => $phase->inRandomOrder()->first()->id
                    ]);
                    break;
            }
        }
    }
}
