import { ActionIcon, Button, UnstyledButton } from '@mantine/core';
import { IconPencil, IconPlus, IconX } from '@tabler/icons';
import { LinkButton, PopupWrapper } from 'components/shared';
import { useGetLoggedUserQuery } from 'utils/__generated__/types';
import AddMilestoneForm from './create';
import RemoveMilestoneForm from './delete';
import UpdateMilestoneForm from './update';

const Milestone = {
	Create: ({
		refetch,
		...rest
	}: {
		project_id: string;
		refetch: () => void;
		maxDate: Date;
		minDate: Date;
	}) => {
		const loggedUser = useGetLoggedUserQuery();
		const isAdmin = !!loggedUser.data?.me?.role?.id;
		const userProjects = (loggedUser.data?.me?.projects || []).map((p) => p?.project.id || '');

		if (!isAdmin && !userProjects.includes(rest.project_id)) return null;

		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />} radius="xs">
						Add milestone
					</Button>
				)}
				form={({ onSuccess }) => <AddMilestoneForm onSuccess={onSuccess} {...rest} />}
				notificationMsg="Milestone was added."
				title="Add milestone"
			/>
		);
	},
	Update: ({
		refetch,
		name,
		...rest
	}: {
		name: string;
		milestone_id: string;
		project_id: string;
		refetch: () => void;
		maxDate: Date;
		minDate: Date;
	}) => {
		const loggedUser = useGetLoggedUserQuery();
		const isAdmin = !!loggedUser.data?.me?.role?.id;
		const userProjects = (loggedUser.data?.me?.projects || []).map((p) => p?.project.id || '');

		if (!userProjects.includes(rest.project_id) && !isAdmin) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <LinkButton onClick={trigger}>{name}</LinkButton>}
				form={({ onSuccess }) => <UpdateMilestoneForm onSuccess={onSuccess} {...rest} />}
				notificationMsg="Milestone was updated."
				title="Update milestone"
			/>
		);
	},
	Delete: ({
		id,
		refetch,
		name,
		project_id,
	}: {
		id: string;
		name: string;
		refetch: () => void;
		project_id: string;
	}) => {
		const loggedUser = useGetLoggedUserQuery();
		const isAdmin = !!loggedUser.data?.me?.role?.id;
		const userProjects = (loggedUser.data?.me?.projects || []).map((p) => p?.project.id || '');

		if (!userProjects.includes(project_id) && !isAdmin) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon color={'red'} variant={'filled'} onClick={trigger}>
						<IconX size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => <RemoveMilestoneForm name={name} id={id} onSuccess={onSuccess} />}
				notificationMsg="Milestone was removed from project."
				title="Remove milestone from project"
			/>
		);
	},
};

export default Milestone;
