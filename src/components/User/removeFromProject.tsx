import { IconAlertCircle } from '@tabler/icons';
import { Alert, Button, Center, Group, Loader, Text } from '@mantine/core';

import { useGetUserQuery, useRemoveUserProjectMutation } from 'utils/__generated__/types';
import { FormEvent } from 'react';
import { FormError } from 'components/shared';

const RemoveUserFromProjectForm = ({
	onSuccess,
	user_project_id,
	email,
	name,
}: {
	user_project_id: string;
	onSuccess: () => void;
	email: string;
	name: string;
}) => {
	const remove = useRemoveUserProjectMutation({ onSuccess });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		remove.mutate({ id: user_project_id });
	};

	return (
		<form onSubmit={onSubmit}>
			<Text fz="lg">
				You're about to remove <b>{name}</b>
				<br /> (email: <b>{email}</b>) from project.
				<br />
				This action is irreversable.
			</Text>

			<FormError mutation={remove} />

			<Group position="right" mt="lg">
				<Button color={'red'} disabled={remove.isLoading} loading={remove.isLoading} type="submit">
					Remove user from project
				</Button>
			</Group>
		</form>
	);
};

export default RemoveUserFromProjectForm;
