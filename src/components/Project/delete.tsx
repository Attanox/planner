import { IconAlertCircle } from '@tabler/icons';
import { Alert, Button, Center, Group, Loader, Text } from '@mantine/core';

import { useDeleteProjectMutation, useGetProjectQuery } from 'utils/__generated__/types';
import { FormEvent } from 'react';
import { FieldLoader } from 'components/shared';

const RemoveProjectForm = ({ onSuccess, id }: { id: string; onSuccess: () => void }) => {
	const remove = useDeleteProjectMutation({ onSuccess });
	const project = useGetProjectQuery({ id });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		remove.mutate({ id });
	};

	if (project.isLoading) {
		return <FieldLoader />;
	}

	return (
		<form onSubmit={onSubmit}>
			<Text fz="lg">
				You're about to remove project called <b>{project.data?.projectById?.name}</b>
				<br />
				This action is irreversable.
			</Text>

			{remove.error ? (
				<Alert
					mt="md"
					icon={<IconAlertCircle size={16} />}
					title={remove.error.message}
					color="red"
				>
					{remove.error.cause}
				</Alert>
			) : null}

			<Group position="right" mt="lg">
				<Button color={'red'} disabled={remove.isLoading} loading={remove.isLoading} type="submit">
					Remove project
				</Button>
			</Group>
		</form>
	);
};

export default RemoveProjectForm;
