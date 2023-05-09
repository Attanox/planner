import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { EditButton, PopupWrapper, RemoveButton } from 'components/shared';
import {
	ResultCategoryType,
	useGetLoggedUserQuery,
	useGetResultCategoriesQuery,
} from 'utils/__generated__/types';
import AddResultCategoryForm from './create';
import RemoveResultCategoryForm from './delete';
import EditResultCategoryForm from './update';

const ResultCategory = {
	Create: ({ ...rest }) => {
		const { refetch } = useGetResultCategoriesQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} leftIcon={<IconPlus />}>
						New result category
					</Button>
				)}
				form={({ onSuccess }) => <AddResultCategoryForm onSuccess={onSuccess} />}
				notificationMsg="Result Category was created"
				title="Create new result category"
			/>
		);
	},
	Update: ({
		...rest
	}: {
		acronym: string;
		id: string;
		note?: string | null;
		url: string;
		rank: {
			id: string;
			name: string;
		};
		type: ResultCategoryType;
	}) => {
		const { refetch } = useGetResultCategoriesQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <EditButton onClick={trigger} />}
				form={({ onSuccess }) => <EditResultCategoryForm onSuccess={onSuccess} {...rest} />}
				notificationMsg="Result category was edited"
				title="Edit result category"
			/>
		);
	},
	Delete: ({ ...rest }: { acronym: string; id: string }) => {
		const { refetch } = useGetResultCategoriesQuery();
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.role?.id) return null;
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => <RemoveButton onClick={trigger} />}
				form={({ onSuccess }) => <RemoveResultCategoryForm onSuccess={onSuccess} {...rest} />}
				notificationMsg="Result Category was removed"
				title="Remove result category"
			/>
		);
	},
};

export default ResultCategory;
