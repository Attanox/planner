<?php

namespace App\GraphQL\Mutations;

use App\Eloquent\Results\Result;
use GraphQL\Type\Definition\ResolveInfo;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

use App\Eloquent\Results\Tag;

class CreateTagMutator
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
        $result_id = $args['result_id'];

        $tag = Tag::firstOrCreate(['name' => $args['name']]);
        $tag->results()->attach([$result_id]);
        $tag->save();
        return $tag;
    }

    public function createTags($_, array $args)
    {
        $result_id = $args['result_id'];
        $names = $args['names'];
        $tags = [];

        // find the result
        $result = Result::where('id', '=', $result_id)->first();
        // unattach all of the attached tags
        foreach ($result->tags()->get() as $tag) {
            $tag->results()->detach([$result_id]);
        }

        // go through each name we got
        foreach ($names as $name) {
            // find or create the tag based on name
            $tag = Tag::firstOrCreate(['name' => $name]);
            // if the tag does not have result attached
            if (! $tag->results()->where('results.id', $result_id)->exists()) {
                // attach tag to result
                $tag->results()->attach([$result_id]);
            }

            array_push($tags, $tag);
        }

        return $tags;
    }
}
