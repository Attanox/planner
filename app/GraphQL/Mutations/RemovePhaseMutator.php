<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Eloquent\Results\Phase;
use App\Eloquent\Results\InvolvedUser;

use App\Exceptions\GraphQLError;

class RemovePhaseMutator
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
        $id = $args['id'];
        $phase = Phase::where('id', $id)->firstOrFail();

        $involved = InvolvedUser::where('phase_id', $id);

        if ($involved->exists()) {
            $involved->delete();
        }

        $phase->delete();
        return $phase;

    }

    public function removeByResult($_, array $args)
    {
        $id = $args['result_id'];

        $phases = Phase::where('result_id', $id)->get();

        foreach ($phases as $phase) {
            $involved = InvolvedUser::where('phase_id', $phase->id);

            if ($involved->exists()) {
                $involved->delete();
            }
            $phase->delete();
        }

        return $phases;
    }
}
