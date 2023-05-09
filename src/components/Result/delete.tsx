import { FormEvent } from 'react';
import { Button, Center, Group, Loader, Text } from '@mantine/core';

import { useDeleteResultMutation, useGetResultQuery } from 'utils/__generated__/types';
import { FieldLoader, FormError } from 'components/shared';

const RemoveResultForm = ({ onSuccess, id }: { id: string; onSuccess: () => void }) => {
	const remove = useDeleteResultMutation({ onSuccess });
	const resultQuery = useGetResultQuery({ id });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		remove.mutate({ id });
	};

	if (resultQuery.isLoading) {
		return <FieldLoader />;
	}

	return (
		<form onSubmit={onSubmit}>
			<Text fz="lg">
				You're about to remove result called <b>{resultQuery.data?.resultById?.title}</b>
			</Text>

			<FormError mutation={remove} />

			<Group position="right" mt="lg">
				<Button color={'red'} disabled={remove.isLoading} loading={remove.isLoading} type="submit">
					Remove project
				</Button>
			</Group>
		</form>
	);
};

export default RemoveResultForm;
