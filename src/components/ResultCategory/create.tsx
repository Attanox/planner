import { Autocomplete, Button, Group, Loader, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormError } from 'components/shared';
import {
	ResultCategoryType,
	useCreateResultCategoryMutation,
	useGetRanksQuery,
	useGetTypesQuery,
} from 'utils/__generated__/types';

const AddResultCategoryForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const ranksQuery = useGetRanksQuery();
	const resultCategoryMutation = useCreateResultCategoryMutation({ onSuccess });

	const form = useForm({
		initialValues: {
			acronym: '',
			note: '',
			url: '',
			rank_id: '',
			type: 'conference' as ResultCategoryType,
		},
		validate: {
			acronym: (value) => (!value ? 'Field is required' : null),
			url: (value) => (!value ? 'Field is required' : null),
			rank_id: (value) => (!value ? 'Field is required' : null),
			type: (value) => (!value ? 'Field is required' : null),
		},
	});

	const onSubmit = (values: typeof form.values) => {
		resultCategoryMutation.mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
				withAsterisk
				label="Acronym"
				placeholder="Enter acronym"
				{...form.getInputProps('acronym')}
			/>
			<TextInput
				mt="sm"
				withAsterisk
				label="URL"
				placeholder="Enter URL"
				{...form.getInputProps('url')}
			/>
			<Textarea mt="sm" label="Name" placeholder="Enter name" {...form.getInputProps('note')} />
			<Select
				mt="sm"
				label="Type"
				withAsterisk
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
				<Select
					mt="sm"
					label="Pick rank"
					withAsterisk
					data={(ranksQuery.data?.ranks || []).map((r) => ({ value: r.id, label: r.name }))}
					{...form.getInputProps('rank_id')}
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

export default AddResultCategoryForm;
