import { ActionIcon, Button } from '@mantine/core';
import {
	IconBarrierBlock,
	IconBarrierBlockOff,
	IconPencil,
	IconPlus,
	IconUserX,
} from '@tabler/icons';

import { PopupWrapper } from 'components/shared';
import AddUserForm from './create';
import EditUserForm from './update';
import RemoveUserForm from './delete';
import {
	useGetAllUsersQuery,
	useGetLoggedUserQuery,
	useGetUserQuery,
} from 'utils/__generated__/types';
import AddUserToProjectForm from './addToProject';
import RemoveUserFromProjectForm from './removeFromProject';
import BlockUserForm from './block';

const User = {
	Create: () => {
		const { refetch } = useGetAllUsersQuery();
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />} radius="xs">
						Add new user
					</Button>
				)}
				form={({ onSuccess }) => <AddUserForm onSuccess={onSuccess} />}
				notificationMsg="User was added."
				title="Add user"
			/>
		);
	},
	AddToProject: ({ project_id, refetch }: { project_id: string; refetch: () => void }) => {
		const loggedUser = useGetLoggedUserQuery();
		const isAdmin = !!loggedUser.data?.me?.role?.id;
		const userProjects = (loggedUser.data?.me?.projects || []).map((p) => p?.project.id || '');

		if (!isAdmin && !userProjects.includes(project_id))
			return <div style={{ marginRight: 'auto' }} />;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />} radius="xs">
						Add user to project
					</Button>
				)}
				form={({ onSuccess }) => (
					<AddUserToProjectForm project_id={project_id} onSuccess={onSuccess} />
				)}
				notificationMsg="User was added to the project."
				title="Add user to project"
			/>
		);
	},
	Update: ({ id }: { id: string }) => {
		const { refetch } = useGetUserQuery({ id });
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon variant="filled" onClick={trigger}>
						<IconPencil size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => <EditUserForm id={id} onSuccess={onSuccess} />}
				notificationMsg="User's data was updated."
				title="Edit user"
			/>
		);
	},
	Delete: ({ id }: { id: string }) => {
		const { refetch } = useGetAllUsersQuery();
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon color={'red'} variant={'filled'} onClick={trigger}>
						<IconUserX size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => <RemoveUserForm id={id} onSuccess={onSuccess} />}
				notificationMsg="User was removed."
				title="Remove user"
			/>
		);
	},
	Block: ({ id }: { id: string }) => {
		const { refetch } = useGetAllUsersQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon variant={'filled'} onClick={trigger}>
						<IconBarrierBlock size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => <BlockUserForm blocked={false} id={id} onSuccess={onSuccess} />}
				notificationMsg="User was blocked."
				title="Block user"
			/>
		);
	},
	Unblock: ({ id }: { id: string }) => {
		const { refetch } = useGetAllUsersQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon variant={'filled'} onClick={trigger}>
						<IconBarrierBlockOff size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => <BlockUserForm blocked={true} id={id} onSuccess={onSuccess} />}
				notificationMsg="User was unblocked."
				title="Unblock user"
			/>
		);
	},
	RemoveFromProject: ({
		project_id,
		user_project_id,
		email,
		name,
		refetch,
	}: {
		project_id: string;
		user_project_id: string;
		name: string;
		email: string;
		refetch: () => void;
	}) => {
		const loggedUser = useGetLoggedUserQuery();
		const isAdmin = !!loggedUser.data?.me?.role?.id;
		const userProjects = (loggedUser.data?.me?.projects || []).map((p) => p?.project.id || '');

		if (!isAdmin && !userProjects.includes(project_id)) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon color={'red'} variant={'filled'} onClick={trigger}>
						<IconUserX size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => (
					<RemoveUserFromProjectForm
						email={email}
						name={name}
						user_project_id={user_project_id}
						onSuccess={onSuccess}
					/>
				)}
				notificationMsg="User was removed."
				title="Remove user"
			/>
		);
	},
};

export default User;
