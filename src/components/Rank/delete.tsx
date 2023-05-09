import { Button, Group, Stack } from '@mantine/core';
import { FormError } from 'components/shared';
import { FormEvent } from 'react';
import { useRemoveRankMutation } from 'utils/__generated__/types';

const RemoveRankForm = ({
	onSuccess,
	name,
	id,
}: {
	onSuccess: () => void;
	name: string;
	id: string;
}) => {
	const rankMutation = useRemoveRankMutation({ onSuccess });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		rankMutation.mutate({ id });
	};

	return (
		<form onSubmit={onSubmit}>
			<Stack>
				Are you sure you want to delete this type?
				<b>{name}</b>
				<FormError mutation={rankMutation} />
				<Group position="right" mt="lg">
					<Button
						loading={rankMutation.isLoading}
						disabled={rankMutation.isLoading}
						color={'red'}
						type="submit"
					>
						Remove
					</Button>
				</Group>
			</Stack>
		</form>
	);
};

export default RemoveRankForm;
