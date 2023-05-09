import { ActionIcon, Button } from '@mantine/core';
import { IconPlus, IconX } from '@tabler/icons';
import { PopupWrapper } from 'components/shared';
import AddCoAuthorForm from './create';
import RemoveCoAuthorForm from './delete';

const CoAuthor = {
	Create: ({ refetch, ...rest }: { id: string; project_id: string; refetch: () => void }) => {
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />} radius="xs">
						Add co-author
					</Button>
				)}
				form={({ onSuccess }) => <AddCoAuthorForm {...rest} onSuccess={onSuccess} />}
				notificationMsg="Co-author was added."
				title="Add co-author"
			/>
		);
	},
	Delete: ({
		id,
		refetch,
		name,
		email,
	}: {
		id: string;
		name: string;
		email: string;
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
					<RemoveCoAuthorForm name={name} email={email} id={id} onSuccess={onSuccess} />
				)}
				notificationMsg="Co-author was removed from result."
				title="Remove co-author from result"
			/>
		);
	},
};

export default CoAuthor;
