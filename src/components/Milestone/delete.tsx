import { Button, Group, Stack, Text } from '@mantine/core';
import { FormError } from 'components/shared';
import { FormEvent } from 'react';
import { useRemoveMilestoneMutation } from 'utils/__generated__/types';

const RemoveMilestoneForm = ({
	onSuccess,
	id,
	name,
}: {
	onSuccess: () => void;
	id: string;
	name: string;
}) => {
	const milestoneMutation = useRemoveMilestoneMutation({ onSuccess });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		milestoneMutation.mutate({ id });
	};

	return (
		<Stack>
			<Text>
				You're about to remove milestone <b>{name}</b>.
			</Text>

			<FormError mutation={milestoneMutation} />

			<Group position="right" mt={'lg'}>
				<form onSubmit={onSubmit}>
					<Button
						disabled={milestoneMutation.isLoading}
						loading={milestoneMutation.isLoading}
						type="submit"
						color={'red'}
					>
						Remove milestone
					</Button>
				</form>
			</Group>
		</Stack>
	);
};

export default RemoveMilestoneForm;
