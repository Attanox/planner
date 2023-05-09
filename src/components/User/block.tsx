import { Button, Center, Group, Loader, Text } from '@mantine/core';

import { useBlockUserMutation, useGetUserQuery } from 'utils/__generated__/types';
import { FormEvent } from 'react';
import { FieldLoader, FormError } from 'components/shared';

const BlockUserForm = ({
	onSuccess,
	id,
	blocked,
}: {
	id: string;
	onSuccess: () => void;
	blocked: boolean;
}) => {
	const block = useBlockUserMutation({ onSuccess });
	const user = useGetUserQuery({ id });

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		block.mutate({ user_id: id });
	};

	if (user.isLoading) {
		return <FieldLoader />;
	}

	const action = blocked ? 'unblock' : 'block';

	return (
		<form onSubmit={onSubmit}>
			<Text fz="lg">
				You're about to {action}{' '}
				<b>
					{user.data?.userById?.last_name} {user.data?.userById?.first_name}
				</b>
				<br /> (email: <b>{user.data?.userById?.email}</b>).
			</Text>

			<FormError mutation={block} />

			<Group position="right" mt="lg">
				<Button color={'red'} disabled={block.isLoading} loading={block.isLoading} type="submit">
					<span style={{ textTransform: 'capitalize' }}>{action}</span>&nbsp;user
				</Button>
			</Group>
		</form>
	);
};

export default BlockUserForm;
