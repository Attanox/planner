<?php

namespace App\GraphQL\Queries;

use App\Eloquent\Projects\Project;
use App\Eloquent\Projects\UserProject;
use App\Eloquent\Results\Phase;
use App\Eloquent\Results\Result;
use App\Eloquent\Results\ResultCategory;
use App\Eloquent\Results\ResultProject;
use App\Eloquent\Results\Tag;
use App\Eloquent\Results\UserResult;
use App\Eloquent\User;
use App\Exceptions\GraphQLError;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Auth;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Statistics
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function __invoke($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {


    }

    public function untrashed()
    {
        $result = Project::cursor()->filter(function ($project) {
            return $project->trash == false;
        });

        return $result;
    }

    /**
     * @param array<array<string>> $connections
     * @param array<Result> $results
     * @param array<User> $users
     */
    public function get_users_network(array $connections, $users, array $results)
    {
        $links = [];
        $LINK_DISTANCE = 100;
        foreach ($connections as $resultId => $connectedUsers) {
            if (count($connectedUsers) == 1 && isset($results[$resultId])) {
                $links[] = [
                    'source' => $connectedUsers[0] . "user",
                    'target' => $results[$resultId]->id . "result",
                    'distance' => $LINK_DISTANCE
                ];

                continue;
            }

            for ($i = 0; $i < count($connectedUsers); $i++) {
                $targetIdx = $i == count($connectedUsers) - 1 ? 0 : $i + 1;

                if (isset($results[$resultId])) {
                    $links[] = [
                        'source' => $connectedUsers[$targetIdx] . "user",
                        'target' => $results[$resultId]->id . "result",
                        'distance' => $LINK_DISTANCE
                    ];
                }
            }
        }


        $nodes = array();
        foreach ($users as $user) {
            $nodes[] = [
                "id" => $user->id . "user",
                "name" => $user->name,
                "email" => $user->email,
                "type" => "USER",
                "height" => 1,
                "size" => 24,
                "color" => "rgb(97, 205, 187)"
            ];

            $links[] = [
                'source' => $user->id . "user",
                'target' => "__main__user__node__",
                'distance' => $LINK_DISTANCE + 50
            ];
        }
        foreach ($results as $result) {
            $nodes[] = [
                "id" => $result->id . "result",
                "name" => $result->title,
                "email" => "",
                "type" => "RESULT",
                "height" => 2,
                "size" => 32,
                "color" => "rgb(205, 97 , 187)"
            ];

            $links[] = [
                'source' => $result->id . "result",
                'target' => "__main__user__node__",
                'distance' => $LINK_DISTANCE + 50
            ];
        }

        $nodes[] = [
            "id" => "__main__user__node__",
            "name" => "",
            "email" => "",
            "type" => "USER",
            "height" => 3,
            "size" => 0,
            "color" => "rgb(244, 117, 96)"
        ];

        // artificially added user nodes to sway the network diagram to circular shape
        // it's a very hacky solution
        for ($i = 0; $i < 7; $i++) {
            $nodes[] = [
                "id" => "__additional_user_node__" . $i,
                "name" => "",
                "email" => "",
                "type" => "USER",
                "height" => 3,
                "size" => 24,
                "color" => "rgb(97, 205, 187)"
            ];

            $links[] = [
                'source' => "__additional_user_node__" . $i,
                'target' => "__main__user__node__",
                'distance' => $LINK_DISTANCE + 50
            ];
        }

        return [
            'nodes' => $nodes,
            'links' => $links
        ];
    }

    public function users_network()
    {
        // associative array, key = result ID, value = [users_ids], at the end `array_values($connections)`
        $connections = [];
        $results = array();
        $userResults = Phase::join('involved_users', 'involved_users.phase_id', '=', 'phases.id')->get();
        foreach ($userResults as $userResult) {
            if (array_key_exists($userResult->result_id, $connections)) {
                $connections[$userResult->result_id][] = $userResult->user_id;
            } else {
                $connections[$userResult->result_id] = [$userResult->user_id];
                $results[$userResult->result_id] = Result::find($userResult->result_id);
            }
        }
        $users = User::select('id', 'name', 'email')->get();

        return $this->get_users_network($connections, $users, $results);
    }
    public function project_users_network($_, $args)
    {
        $project_id = $args['project_id'];

        $project_results = UserProject::where('result_project.project_id', '=', $project_id)
            ->join('result_project', 'result_project.project_id', '=', 'user_project.project_id')
            ->get();

        $connections = [];
        $results = array();
        foreach ($project_results as $pivot) {
            if (array_key_exists($pivot->result_id, $connections)) {
                $connections[$pivot->result_id][] = $pivot->user_id;
            } else {
                $connections[$pivot->result_id] = [$pivot->user_id];
                $results[$pivot->result_id] = Result::find($pivot->result_id);
            }
        }

        $users = User::join('user_project', 'user_project.user_id', '=', 'users.id')
            ->where('user_project.project_id', '=', $project_id)
            ->select('users.id', 'users.name', 'users.email')
            ->get();

        return $this->get_users_network($connections, $users, $results);
    }

    public function users_utilization()
    {
        $userResults = Phase::join('involved_users', 'involved_users.phase_id', '=', 'phases.id')
            ->join('users', 'involved_users.user_id', '=', 'users.id')
            ->get();

        $overlap = $this->checkOverlapInDateRanges($userResults);

        return $overlap;
    }

    public function users_assistance_statistics($_, array $args)
    {
        $user_id = $args['user_id'];

        // find results where user is an author
        $results_authored = Result::where('author', '=', $user_id)->get();

        // find results where user is a co-author
        $results_coauthored_ids = Result::join('coauthors', 'coauthors.result_id', '=', 'results.id')
            ->where('coauthors.user_id', '=', $user_id)->select('results.id')->get();

        $resultIds = [];
        foreach ($results_coauthored_ids as $r) {
            $resultIds[] = $r->id;
        }
        $results_coauthored = Result::whereIn('id', $resultIds)->get();

        $allItems = new \Illuminate\Database\Eloquent\Collection;
        $allItems = $allItems->merge($results_authored);
        $allItems = $allItems->merge($results_coauthored);

        $result = [];

        foreach ($allItems as $item) {
            $author_id = $item->author()->first()->id;
            if ($author_id != $user_id) {
                if (isset($result['id-' . $author_id])) {
                    if (! isset($result['id-' . $author_id]['assistances']['item-' . $item->id])) {
                        // array_push($result['id-' . $author_id]['assistances'], ['item-' . $item->id => $item]);
                        $result['id-' . $author_id]['assistances']['item-' . $item->id] = $item;
                        $assist = [
                            'user' => $result['id-' . $author_id]['user'],
                            'assistances' => $result['id-' . $author_id]['assistances'],
                            'assistances_count' => $result['id-' . $author_id]['assistances_count'] + 1
                        ];


                        $result['id-' . $author_id] = $assist;
                    }
                } else {
                    $newAssistances = [];
                    $newAssistances['item-' . $item->id] = $item;
                    $assist = [
                        'user' => $item->author()->first(),
                        'assistances' => $newAssistances,
                        'assistances_count' => 1
                    ];

                    $result['id-' . $author_id] = $assist;
                }
            }

            $coauthors = $item->coauthors()->get();
            foreach ($coauthors as $coauthor) {
                if ($coauthor->user_id != $user_id) {
                    if (isset($result['id-' . $coauthor->user_id])) {
                        $isIdxSet = isset($result['id-' . $coauthor->user_id]['assistances']['item-' . $item->id]);
                        if (! $isIdxSet) {
                            $result['id-' . $coauthor->user_id]['assistances']['item-' . $item->id] = $item;
                            $assist = [
                                'user' => $result['id-' . $coauthor->user_id]['user'],
                                'assistances' => $result['id-' . $coauthor->user_id]['assistances'],
                                'assistances_count' => $result['id-' . $coauthor->user_id]['assistances_count'] + 1
                            ];


                            $result['id-' . $coauthor->user_id] = $assist;
                        }
                    } else {
                        $newAssistances = [];
                        $newAssistances['item-' . $item->id] = $item;
                        $assist = [
                            'user' => $coauthor->user()->first(),
                            'assistances' => $newAssistances,
                            'assistances_count' => 1
                        ];

                        $result['id-' . $coauthor->user_id] = $assist;
                    }
                }
            }
        }

        // DEBUG:
        // foreach ($result as $r) {
        //     echo $r['user'];
        //     echo "\n";
        //     echo $r['assistances_count'];
        //     echo "\n";
        //     foreach ($r['assistances'] as $a) {
        //         echo $a;
        //         echo "\n";
        //     }
        // }

        return $result;
    }

    public function user_schedule($rootValue, array $args)
    {
        $user_id = $args['user_id'];

        $user_results = Phase::join('involved_users', 'involved_users.phase_id', '=', 'phases.id')
            ->where('involved_users.user_id', '=', $user_id)->get();

        $earliest_start = null;
        $latest_end = null;
        // * get earliest and latest dates
        foreach ($user_results as $ur) {
            $date_begin = Carbon::parse($ur['date_begin']);
            $date_end = Carbon::parse($ur['date_end']);
            if (! $earliest_start) {
                $earliest_start = $date_begin;
            } else {
                if ($earliest_start->greaterThan($date_begin)) {
                    $earliest_start = $date_begin;
                }
            }

            if (! $latest_end) {
                $latest_end = $date_end;
            } else {
                if ($date_end->greaterThan($latest_end)) {
                    $latest_end = $date_end;
                }
            }
        }

        $result = array();

        if (! $earliest_start || ! $latest_end)
            return $result;

        $period = CarbonPeriod::create($earliest_start, $latest_end);
        // * iterate over the period
        foreach ($period as $date) {
            array_push($result, ['day' => $date->format('Y-m-d'), 'value' => 0]);
            foreach ($user_results as $ur) {
                $date_begin = Carbon::parse($ur['date_begin']);
                $date_end = Carbon::parse($ur['date_end']);
                if ($date->between($date_begin, $date_end)) {
                    $result[count($result) - 1]['value'] = $result[count($result) - 1]['value'] + 1;
                }
            }
        }

        return $result;
    }


    private function get_stats_response(object $delayed_query, object $scheduled_query, object $in_progress_query, string $key)
    {
        $out = [];
        $out = $this->get_stats_for_type($out, $delayed_query, $key, 'delayed');
        $out = $this->get_stats_for_type($out, $scheduled_query, $key, 'scheduled');
        $out = $this->get_stats_for_type($out, $in_progress_query, $key, 'in_progress');
        $response = $this->convert_stats_object_to_array($out);
        return $response;
    }

    private function get_stats_for_type(array $out, object $query, string $key, string $type)
    {
        foreach ($query as $result) {
            if (array_key_exists($result[$key], $out)) {
                $out[$result[$key]][$type] = $out[$result[$key]][$type] + 1;
            } else {
                $out[$result[$key]] = [
                    'delayed' => $type === 'delayed' ? 1 : 0,
                    'scheduled' => $type === 'scheduled' ? 1 : 0,
                    'in_progress' => $type === 'in_progress' ? 1 : 0,
                ];
            }
        }

        return $out;
    }

    private function convert_stats_object_to_array(array $inp)
    {
        $response = array();

        foreach ($inp as $key => $value) {
            array_push($response, [
                'type' => $key,
                'scheduled' => $value['scheduled'],
                'delayed' => $value['delayed'],
                'in_progress' => $value['in_progress'],
            ]);
        }

        return $response;
    }

    private function get_user_result_statistics(int $user_id)
    {
        $delayed_query = UserResult::join('results', 'results.id', '=', 'user_result.result_id')
            ->join('result_project', 'results.id', '=', 'result_project.result_id')
            ->join('projects', 'projects.id', '=', 'result_project.project_id')
            ->where('user_result.user_id', '=', $user_id)
            ->where('results.status', '=', 'delayed')
            ->get();

        $scheduled_query = UserResult::join('results', 'results.id', '=', 'user_result.result_id')
            ->join('result_project', 'results.id', '=', 'result_project.result_id')
            ->join('projects', 'projects.id', '=', 'result_project.project_id')
            ->where('user_result.user_id', '=', $user_id)
            ->where('results.status', '=', 'scheduled')
            ->get();

        $in_progress_query = UserResult::join('results', 'results.id', '=', 'user_result.result_id')
            ->join('result_project', 'results.id', '=', 'result_project.result_id')
            ->join('projects', 'projects.id', '=', 'result_project.project_id')
            ->where('user_result.user_id', '=', $user_id)
            ->where('results.status', '=', 'in_progress')
            ->get();


        $response = $this->get_stats_response($delayed_query, $scheduled_query, $in_progress_query, 'short_name');

        return $response;
    }

    public function current_user_statistics()
    {
        if (! (Auth::check())) {
            throw new GraphQLError(
                'Cannot query data.',
                'You have to be authenticated for this operation.'
            );
        }

        $user = Auth::user();
        $user_id = $user->id;


        return $this->get_user_result_statistics($user_id);
    }

    public function user_results_statistics($rootValue, array $args)
    {
        $user_id = $args['user_id'];

        return $this->get_user_result_statistics($user_id);
    }

    public function projects_statistics()
    {
        $delayed_query = ResultProject::join('results', 'results.id', '=', 'result_id')
            ->join('projects', 'projects.id', '=', 'project_id')
            ->where('results.status', '=', "delayed")
            ->get();

        $scheduled_query = ResultProject::join('results', 'results.id', '=', 'result_id')
            ->join('projects', 'projects.id', '=', 'project_id')
            ->where('results.status', '=', "scheduled")
            ->get();

        $in_progress_query = ResultProject::join('results', 'results.id', '=', 'result_id')
            ->join('projects', 'projects.id', '=', 'project_id')
            ->where('results.status', '=', "in_progress")
            ->get();

        $response = $this->get_stats_response($delayed_query, $scheduled_query, $in_progress_query, 'name');

        return $response;
    }

    public function keywords_statistics()
    {
        $result = [];
        $all_tags = Tag::all();

        foreach ($all_tags as $tag) {
            $results_count = $tag->results()->count();
            array_push($result, ['text' => $tag->name, 'value' => $results_count]);
        }

        return $result;
    }

    public static function checkOverlapInDateRanges($ranges)
    {
        $overlap = [];
        for ($i = 0; $i < count($ranges); $i++) {
            $overlap[] = ['user_name' => $ranges[$i]['name'], 'user_id' => $ranges[$i]['user_id'], 'overlapping_results' => 0];
            for ($j = ($i + 1); $j < count($ranges); $j++) {

                $start = Carbon::parse($ranges[$j]['date_begin']);
                $end = Carbon::parse($ranges[$j]['date_end']);

                $start_first = Carbon::parse($ranges[$i]['date_begin']);
                $end_first = Carbon::parse($ranges[$i]['date_end']);

                if (Carbon::parse($ranges[$i]['date_begin'])->between($start, $end) || Carbon::parse($ranges[$i]['date_end'])->between($start, $end)) {
                    $overlap[count($overlap) - 1]['overlapping_results'] = $overlap[count($overlap) - 1]['overlapping_results'] + 1;
                    // $overlap[] = $ranges[$j];
                    break;
                }
                if (Carbon::parse($ranges[$j]['date_begin'])->between($start_first, $end_first) || Carbon::parse($ranges[$j]['date_end'])->between($start_first, $end_first)) {
                    $overlap[count($overlap) - 1]['overlapping_results'] = $overlap[count($overlap) - 1]['overlapping_results'] + 1;
                    // $overlapp[] = $ranges[$j];
                    break;
                }
            }
        }
        return $overlap;
    }
}
