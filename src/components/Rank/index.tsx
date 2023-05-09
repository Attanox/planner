import { ActionIcon, Button } from '@mantine/core';
import { IconPencil, IconPlus, IconX } from '@tabler/icons';
import { EditButton, PopupWrapper, RemoveButton } from 'components/shared';
import { useGetLoggedUserQuery, useGetRanksQuery } from 'utils/__generated__/types';
import AddRankForm from './create';
import RemoveRankForm from './delete';
import EditRankForm from './update';

const Rank = {
	Create: ({ ...rest }) => {
		const { refetch } = useGetRanksQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />}>
						New rank
					</Button>
				)}
				form={({ onSuccess }) => <AddRankForm onSuccess={onSuccess} />}
				notificationMsg="Category was created"
				title="Create new category"
			/>
		);
	},
	Update: ({ ...rest }: { id: string; name: string; note?: string | null }) => {
		const { refetch } = useGetRanksQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <EditButton onClick={trigger} />}
				form={({ onSuccess }) => <EditRankForm onSuccess={onSuccess} {...rest} />}
				notificationMsg="Category was edited"
				title="Edit category"
			/>
		);
	},
	Delete: ({ ...rest }: { id: string; name: string }) => {
		const { refetch } = useGetRanksQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <RemoveButton onClick={trigger} />}
				form={({ onSuccess }) => <RemoveRankForm onSuccess={onSuccess} {...rest} />}
				notificationMsg="Category was removed"
				title="Remove category"
			/>
		);
	},
};

export default Rank;
