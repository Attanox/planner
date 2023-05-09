import { ActionIcon, Button } from '@mantine/core';
import { IconPencil, IconPlus, IconX } from '@tabler/icons';
import { EditButton, PopupWrapper, RemoveButton } from 'components/shared';
import { useGetLoggedUserQuery, useGetTypesQuery } from 'utils/__generated__/types';
import AddTypeForm from './create';
import RemoveTypeForm from './delete';
import EditTypeForm from './update';

const Type = {
	Create: ({ ...rest }) => {
		const { refetch } = useGetTypesQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />}>
						New type
					</Button>
				)}
				form={({ onSuccess }) => <AddTypeForm onSuccess={onSuccess} />}
				notificationMsg="Type was created"
				title="Create new Type"
			/>
		);
	},
	Update: ({ ...rest }: { id: string; name: string; description?: string | null }) => {
		const { refetch } = useGetTypesQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <EditButton onClick={trigger} />}
				form={({ onSuccess }) => <EditTypeForm onSuccess={onSuccess} {...rest} />}
				notificationMsg="Type was edited"
				title="Edit Type"
			/>
		);
	},
	Delete: ({ ...rest }: { id: string; name: string }) => {
		const { refetch } = useGetTypesQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <RemoveButton onClick={trigger} />}
				form={({ onSuccess }) => <RemoveTypeForm onSuccess={onSuccess} {...rest} />}
				notificationMsg="Type was removed"
				title="Remove Type"
			/>
		);
	},
};

export default Type;
