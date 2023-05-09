import { Autocomplete, Button, Group, Loader, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormError } from 'components/shared';
import {
	ResultCategoryType,
	useGetRanksQuery,
	useGetTypesQuery,
	useUpdateResultCategoryMutation,
} from 'utils/__generated__/types';

const EditResultCategoryForm = ({
	acronym,
	id,
	note,
	onSuccess,
	rank,
	type,
	url,
}: {
	onSuccess: () => void;
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
	const ranksQuery = useGetRanksQuery();
	const resultCategoryMutation = useUpdateResultCategoryMutation({ onSuccess });

	const form = useForm({
		initialValues: {
			acronym: acronym,
			note: note || '',
			url: url,
			rank_id: rank.id,
			rank_name: rank.name,
			type: type,
		},
	});

	const onSubmit = (values: typeof form.values) => {
		resultCategoryMutation.mutate({ id, ...values });
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
				label="Acronym"
				placeholder="Enter acronym"
				{...form.getInputProps('acronym')}
			/>
			<TextInput mt="sm" label="URL" placeholder="Enter URL" {...form.getInputProps('url')} />
			<Textarea mt="sm" label="Name" placeholder="Enter name" {...form.getInputProps('note')} />
			<Select
				mt="sm"
				label="Type"
				data={[
					ResultCategoryType.Conference,
					ResultCategoryType.Journal,
					ResultCategoryType.Workshop,
				]}
				{...form.getInputProps('type')}
			/>
			{ranksQuery.isLoading ? (
				<Loader mt="sm" w="100%" />
			) : (
				<Autocomplete
					mt="sm"
					label="Pick rank"
					value={form.values.rank_name}
					onItemSubmit={(i) => {
						form.setFieldValue('rank_id', i.id);
						form.setFieldValue('rank_name', i.name);
					}}
					data={(ranksQuery.data?.ranks || []).map((r) => ({ value: r.name, id: r.id }))}
					{...form.getInputProps('rank_id').error}
				/>
			)}

			<FormError mutation={resultCategoryMutation} />

			<Group position="right" mt="lg">
				<Button
					disabled={resultCategoryMutation.isLoading}
					loading={resultCategoryMutation.isLoading}
					type="submit"
				>
					Add result category
				</Button>
			</Group>
		</form>
	);
};

export default EditResultCategoryForm;
