import { IconAlertCircle } from '@tabler/icons';
import { Alert, Button, Center, Group, Loader, Text } from '@mantine/core';

import { useDeleteUserMutation, useGetUserQuery } from 'utils/__generated__/types';
import { FormEvent } from 'react';
import { FieldLoader } from 'components/shared';

const RemoveUserForm = ({ onSuccess, id }: { id: string; onSuccess: () => void }) => {
	const remove = useDeleteUserMutation({ onSuccess });
	const user = useGetUserQuery({ id });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		remove.mutate({ id });
	};

	if (user.isLoading) {
		return <FieldLoader />;
	}

	return (
		<form onSubmit={onSubmit}>
			<Text fz="lg">
				You're about to remove{' '}
				<b>
					{user.data?.userById?.last_name} {user.data?.userById?.first_name}
				</b>
				<br /> (email: <b>{user.data?.userById?.email}</b>).
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
					Remove user
				</Button>
			</Group>
		</form>
	);
};

export default RemoveUserForm;
