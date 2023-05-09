import { FormEvent } from 'react';
import { Button, Group, Stack, Text } from '@mantine/core';
import { FormError } from 'components/shared';
import { useRemovePhaseMutation, useRemoveUserResultMutation } from 'utils/__generated__/types';

const RemovePhaseForm = ({
	onSuccess,
	phase_id,
	name,
}: {
	onSuccess: () => void;
	phase_id: string;
	name: string;
}) => {
	const userResultMutation = useRemoveUserResultMutation({});
	const phaseMutation = useRemovePhaseMutation({
		async onSuccess(data) {
			await Promise.all(
				(data.removePhase?.users || []).map((user) => {
					return userResultMutation.mutate({
						result_id: data.removePhase?.result.id || '',
						user_id: user?.id || '',
					});
				})
			);
			onSuccess();
		},
	});

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		phaseMutation.mutate({ id: phase_id });
	};

	return (
		<Stack>
			<Text>
				You're about to remove phase called <b>{name}</b>.
			</Text>

			<FormError mutation={phaseMutation} />

			<Group position="right" mt={'lg'}>
				<form onSubmit={onSubmit}>
					<Button
						disabled={phaseMutation.isLoading}
						loading={phaseMutation.isLoading}
						type="submit"
					>
						Remove phase
					</Button>
				</form>
			</Group>
		</Stack>
	);
};

export default RemovePhaseForm;
