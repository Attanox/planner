import { ActionIcon, Button } from '@mantine/core';
import { IconPencil, IconPlus, IconUserX, IconX } from '@tabler/icons';
import { EditButton, PopupWrapper, RemoveButton } from 'components/shared';
import {
	useGetAllProjectsQuery,
	useGetLoggedUserQuery,
	useGetProjectDetailQuery,
} from 'utils/__generated__/types';
import AddProjectForm from './create';
import RemoveProjectForm from './delete';
import EditProjectForm from './update';

const Project = {
	Create: () => {
		const loggedUser = useGetLoggedUserQuery();
		const { refetch } = useGetAllProjectsQuery();
		if (!loggedUser.data?.me?.role?.id) return null;

		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />} radius="xs">
						New project
					</Button>
				)}
				form={({ onSuccess }) => <AddProjectForm onSuccess={onSuccess} />}
				notificationMsg="Project was added."
				title="Add project"
			/>
		);
	},
	Update: ({ id }: { id: string }) => {
		const loggedUser = useGetLoggedUserQuery();
		const { refetch } = useGetProjectDetailQuery({ id });
		if (!loggedUser.data?.me?.role?.id) return null;

		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <EditButton onClick={trigger} />}
				form={({ onSuccess }) => <EditProjectForm id={id} onSuccess={onSuccess} />}
				notificationMsg="Project's data was updated."
				title="Edit project"
			/>
		);
	},
	Delete: ({ id }: { id: string }) => {
		const loggedUser = useGetLoggedUserQuery();
		const { refetch } = useGetAllProjectsQuery();
		if (!loggedUser.data?.me?.role?.id) return null;

		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <RemoveButton onClick={trigger} />}
				form={({ onSuccess }) => <RemoveProjectForm id={id} onSuccess={onSuccess} />}
				notificationMsg="Project was removed."
				title="Remove project"
			/>
		);
	},
};

export default Project;
