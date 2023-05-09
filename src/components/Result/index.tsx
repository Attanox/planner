import { ActionIcon, Button, MantineSize } from '@mantine/core';
import { IconPencil, IconPlus, IconX } from '@tabler/icons';
import { PopupWrapper } from 'components/shared';
import {
	TableResultFragment,
	useGetAllResultsQuery,
	useGetLoggedUserQuery,
	useGetResultDetailQuery,
} from 'utils/__generated__/types';
import AddResultForm from './create';
import RemoveResultForm from './delete';
import List from './list';
import EditResultForm from './update';
import UpdateAuhorForm from './updateAuhor';

const Result = {
	Create: ({ refetch, size }: { refetch: () => void; size?: MantineSize }) => {
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<Button onClick={trigger} size={size} leftIcon={<IconPlus />} radius="xs">
						New result
					</Button>
				)}
				form={({ onSuccess, onShowMsg }) => (
					<AddResultForm refetch={onShowMsg} onSuccess={onSuccess} />
				)}
				notificationMsg="Result was added."
				title="Add result"
				modalStyles={{ width: '80vw' }}
			/>
		);
	},
	Update: ({ id }: { id: string }) => {
		const { refetch } = useGetAllResultsQuery();
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon variant="filled" onClick={trigger}>
						<IconPencil size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess, onShowMsg }) => (
					<EditResultForm refetch={onShowMsg} id={id} onSuccess={onSuccess} />
				)}
				notificationMsg="Result's data was updated."
				title="Edit result"
				modalStyles={{ width: '80vw' }}
			/>
		);
	},
	UpdateAuthor: ({ result_id, project_id }: { result_id: string; project_id: string }) => {
		const { refetch } = useGetResultDetailQuery({ id: result_id });
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon onClick={trigger}>
						<IconPencil size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => (
					<UpdateAuhorForm project_id={project_id} result_id={result_id} onSuccess={onSuccess} />
				)}
				notificationMsg="Result's author was updated."
				title="Change result's author"
			/>
		);
	},
	Delete: ({ id }: { id: string }) => {
		const { refetch } = useGetAllResultsQuery();
		return (
			<PopupWrapper
				refetch={refetch}
				btn={({ trigger }) => (
					<ActionIcon color={'red'} variant={'filled'} onClick={trigger}>
						<IconX size={16} />
					</ActionIcon>
				)}
				form={({ onSuccess }) => <RemoveResultForm id={id} onSuccess={onSuccess} />}
				notificationMsg="Result was removed."
				title="Result project"
			/>
		);
	},
	List: ({
		results,
		refetch,
		height,
		isFetching = false,
	}: {
		results: TableResultFragment[];
		refetch: () => void;
		height?: string;
		isFetching?: boolean;
	}) => {
		const loggedUser = useGetLoggedUserQuery();
		if (!loggedUser.data?.me?.id) return null;
		return (
			<List
				results={results}
				loggedUserId={loggedUser.data?.me?.id}
				refetch={refetch}
				height={height}
				isFetching={isFetching}
			/>
		);
	},
};

export default Result;
