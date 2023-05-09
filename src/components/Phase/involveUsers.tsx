import { Button, Group, Stack, Text, TextInput } from '@mantine/core';
import ItemPicker from 'components/ItemPicker';
import { FormError } from 'components/shared';
import { getGraphqlDate } from 'functions';
import { FormEvent, useRef, useState } from 'react';
import {
	useCreateInvolvedUserMutation,
	useCreateUserResultMutation,
	useGetProjectUsersQuery,
} from 'utils/__generated__/types';

const InvolveUser = ({
	onSuccess,
	phase_id,
	project_id,
	result_id,
	date_begin,
	date_end,
}: {
	onSuccess: () => void;
	phase_id: string;
	result_id: string;
	project_id: string;
	date_begin: Date;
	date_end: Date;
}) => {
	const projectUsersQuery = useGetProjectUsersQuery({ project_id });
	const involveUsersMutation = useCreateInvolvedUserMutation({});
	const userResultMutation = useCreateUserResultMutation({});
	const [picked, setPicked] = useState<{ [id: string]: string }>({});
	const notesRef = useRef<{ [id: string]: string }>({});

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		await Promise.all(
			Object.keys(picked).map((user_id) =>
				involveUsersMutation.mutate({ phase_id, user_id, note: notesRef.current[user_id] || '' })
			)
		);
		await Promise.all(
			Object.keys(picked).map((user_id) =>
				userResultMutation.mutate({
					user_id,
					result_id,
					date_begin: getGraphqlDate(date_begin),
					date_end: getGraphqlDate(date_end),
				})
			)
		);
		onSuccess();
	};
	const renderItem = (id: string, name: string, email: string) => {
		const onChange = (v: string) => {
			notesRef.current = { ...notesRef.current, [id]: v };
		};

		return (
			<div key={id}>
				<Text>{name}</Text>
				<Text size="xs" color="dimmed">
					{email}
				</Text>
				<TextInput withAsterisk mt="md" label="Note" onChange={(e) => onChange(e.target.value)} />
			</div>
		);
	};

	const users = (projectUsersQuery.data?.projectUsers || []).map(
		({ user: { email, id, name } }) => ({ email, id, name })
	);

	return (
		<Stack>
			<ItemPicker
				isLoading={projectUsersQuery.isLoading}
				users={users}
				customItemContent={renderItem}
				label="Pick user you want to involve"
				picked={picked}
				setPicked={setPicked}
			/>
			<FormError mutation={involveUsersMutation} />
			<Group position="right" mt={'lg'}>
				<form onSubmit={onSubmit}>
					<Button
						disabled={involveUsersMutation.isLoading}
						loading={involveUsersMutation.isLoading}
						type="submit"
					>
						Add result
					</Button>
				</form>
			</Group>
		</Stack>
	);
};

export default InvolveUser;
