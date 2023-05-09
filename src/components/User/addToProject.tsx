import { Button, Group, Stack } from '@mantine/core';
import ItemPicker from 'components/ItemPicker';
import { FormError } from 'components/shared';
import { FormEvent, useState } from 'react';
import { useCreateUserProjectMutation, useGetAllUsersQuery } from 'utils/__generated__/types';

const AddUserToProjectForm = ({
	project_id,
	onSuccess,
}: {
	project_id: string;
	onSuccess: () => void;
}) => {
	const usersQuery = useGetAllUsersQuery();
	const userProjectMutation = useCreateUserProjectMutation({ onSuccess });
	const [picked, setPicked] = useState<{ [id: string]: string }>({});

	const users = (usersQuery.data?.users || []).map(({ email, name, id }) => ({ email, name, id }));
	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		Promise.all(
			Object.keys(picked).map((user_id) =>
				userProjectMutation.mutate({ occupancy: users.length + 1, project_id, user_id })
			)
		);
	};

	return (
		<Stack>
			<ItemPicker
				isLoading={usersQuery.isLoading}
				users={users}
				label="Pick co-authors"
				picked={picked}
				setPicked={setPicked}
			/>
			<FormError mutation={userProjectMutation} />
			<Group position="right" mt={'lg'}>
				<form onSubmit={onSubmit}>
					<Button
						disabled={userProjectMutation.isLoading}
						loading={userProjectMutation.isLoading}
						type="submit"
					>
						Add user to project
					</Button>
				</form>
			</Group>
		</Stack>
	);
};

export default AddUserToProjectForm;
