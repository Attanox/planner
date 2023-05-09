import { Button, Group } from '@mantine/core';
import ItemPicker from 'components/ItemPicker';
import { FormError } from 'components/shared';
import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from 'react';
import {
	UserStatus,
	useCreateCoAuthorMutation,
	useGetAllUsersQuery,
	useGetLoggedUserQuery,
	useGetProjectQuery,
	useGetProjectUsersQuery,
} from 'utils/__generated__/types';

type TPicked = { [id: string]: string };

const CoAuthorSelect = ({
	picked,
	setPicked,
	project_id,
}: {
	picked: TPicked;
	setPicked: Dispatch<SetStateAction<TPicked>>;
	project_id: string;
}) => {
	const usersQuery = useGetAllUsersQuery();
	const loggedUser = useGetLoggedUserQuery();
	const projectUsersQuery = useGetProjectUsersQuery({ project_id });

	const projectUsersIds = projectUsersQuery.data?.projectUsers.map(({ user: { id } }) => id);

	const users = (usersQuery.data?.users || [])
		.filter(
			({ id, status }) =>
				loggedUser.data?.me?.id !== id &&
				(projectUsersIds?.includes(id) || status === UserStatus.ExternalCollaborator)
		)
		.map(({ email, id, name }) => ({ email, id, name }));

	return (
		<ItemPicker
			isLoading={projectUsersQuery.isLoading || usersQuery.isLoading}
			users={users}
			label="Pick co-authors"
			picked={picked}
			setPicked={setPicked}
		/>
	);
};

const AddCoAuthorForm = ({
	id,
	project_id,
	onSuccess,
	renderToolbar,
}: {
	id: string;
	project_id: string;
	renderToolbar?: (isLoading: boolean) => ReactNode;
	onSuccess: () => void;
}) => {
	const coauthorMutation = useCreateCoAuthorMutation();

	const [picked, setPicked] = useState<TPicked>({});

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		Promise.all(
			Object.keys(picked).map((user_id) => coauthorMutation.mutate({ result_id: id, user_id }))
		).then(onSuccess);
	};

	return (
		<form onSubmit={onSubmit}>
			<CoAuthorSelect picked={picked} setPicked={setPicked} project_id={project_id} />

			<FormError mutation={coauthorMutation} />

			{renderToolbar ? (
				renderToolbar(coauthorMutation.isLoading)
			) : (
				<Group position="right" mt={'lg'}>
					<Button
						disabled={coauthorMutation.isLoading}
						loading={coauthorMutation.isLoading}
						type="submit"
					>
						Add co-author(s)
					</Button>
				</Group>
			)}
		</form>
	);
};

export default AddCoAuthorForm;
