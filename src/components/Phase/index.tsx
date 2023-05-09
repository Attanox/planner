import { ActionIcon, Button } from '@mantine/core';
import { IconPencil, IconPlus, IconUserPlus, IconX } from '@tabler/icons';
import { PopupWrapper } from 'components/shared';
import AddPhaseForm from './create';
import RemovePhaseForm from './delete';
import InvolveUser from './involveUsers';
import EditPhaseForm from './update';

const Phase = {
	Create: ({ refetch, ...rest }: { result_id: string; refetch: () => void }) => {
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />} radius="xs">
						Add phase
					</Button>
				)}
				form={({ onSuccess }) => <AddPhaseForm {...rest} onSuccess={onSuccess} />}
				notificationMsg="Phase was added."
				title="Add phase"
			/>
		);
	},
	Update: ({ refetch, ...rest }: { phase_id: string; result_id: string; refetch: () => void }) => {
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon variant={'filled'} onClick={trigger}>
						<IconPencil size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => <EditPhaseForm {...rest} onSuccess={onSuccess} />}
				notificationMsg="Phase was added."
				title="Edit phase"
			/>
		);
	},
	Delete: ({
		phase_id,
		refetch,
		name,
	}: {
		phase_id: string;
		name: string;
		refetch: () => void;
	}) => {
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon color={'red'} variant={'filled'} onClick={trigger}>
						<IconX size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => (
					<RemovePhaseForm name={name} phase_id={phase_id} onSuccess={onSuccess} />
				)}
				notificationMsg="Phase was removed."
				title="Remove phase"
			/>
		);
	},
	InvolveUsers: ({
		refetch,
		...rest
	}: {
		date_begin: Date;
		date_end: Date;
		result_id: string;
		project_id: string;
		phase_id: string;
		refetch: () => void;
	}) => {
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon variant={'filled'} onClick={trigger}>
						<IconUserPlus size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => <InvolveUser {...rest} onSuccess={onSuccess} />}
				notificationMsg="Involved all listed users."
				title="Involve users in result"
			/>
		);
	},
};

export default Phase;
