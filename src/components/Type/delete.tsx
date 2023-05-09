import { Button, Group, Stack } from '@mantine/core';
import { FormError } from 'components/shared';
import { FormEvent } from 'react';
import { useRemoveTypeMutation } from 'utils/__generated__/types';

const RemoveTypeForm = ({
	onSuccess,
	name,
	id,
}: {
	onSuccess: () => void;
	name: string;
	id: string;
}) => {
	const typeMutation = useRemoveTypeMutation({ onSuccess });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		typeMutation.mutate({ id });
	};

	return (
		<form onSubmit={onSubmit}>
			<Stack>
				Are you sure you want to delete this type?
				<b>{name}</b>
				<FormError mutation={typeMutation} />
				<Group position="right" mt="lg">
					<Button
						loading={typeMutation.isLoading}
						disabled={typeMutation.isLoading}
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

export default RemoveTypeForm;
