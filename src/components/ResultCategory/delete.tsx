import { Button, Group, Stack } from '@mantine/core';
import { FormError } from 'components/shared';
import { FormEvent } from 'react';
import { useRemoveResultCategoryMutation } from 'utils/__generated__/types';

const RemoveResultCategoryForm = ({
	acronym,
	id,
	onSuccess,
}: {
	onSuccess: () => void;
	acronym: string;
	id: string;
}) => {
	const resultCategoryMutation = useRemoveResultCategoryMutation({ onSuccess });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		resultCategoryMutation.mutate({ id });
	};

	return (
		<form onSubmit={onSubmit}>
			<Stack>
				Are you sure you want to delete result category<b>{acronym}</b>?
				<FormError mutation={resultCategoryMutation} />
				<Group position="right" mt="lg">
					<Button
						loading={resultCategoryMutation.isLoading}
						disabled={resultCategoryMutation.isLoading}
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

export default RemoveResultCategoryForm;
