import { Button, Group, Stack, Text } from '@mantine/core';
import { FormError } from 'components/shared';
import { FormEvent } from 'react';
import {
	useGetUserResultQuery,
	useRemoveCoAuthorMutation,
	useRemoveUserResultMutation,
} from 'utils/__generated__/types';

const RemoveCoAuthorForm = ({
	onSuccess,
	id,
	email,
	name,
}: {
	onSuccess: () => void;
	id: string;
	name: string;
	email: string;
}) => {
	const userResultMutation = useRemoveUserResultMutation({
		onSuccess,
	});
	const coauthorMutation = useRemoveCoAuthorMutation({
		onSuccess(data) {
			userResultMutation.mutate({
				result_id: data.removeCoAuthor?.result.id || '',
				user_id: data.removeCoAuthor?.user.id || '',
			});
		},
	});

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		coauthorMutation.mutate({ id });
	};

	return (
		<Stack>
			<Text>
				You're about to remove <b>{name}</b> ({email}) as a co-author.
			</Text>

			<FormError mutation={coauthorMutation} />
			<FormError mutation={userResultMutation} />

			<Group position="right" mt={'lg'}>
				<form onSubmit={onSubmit}>
					<Button
						disabled={coauthorMutation.isLoading || userResultMutation.isLoading}
						loading={coauthorMutation.isLoading || userResultMutation.isLoading}
						type="submit"
					>
						Remove as co-author
					</Button>
				</form>
			</Group>
		</Stack>
	);
};

export default RemoveCoAuthorForm;
