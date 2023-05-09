import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormError } from 'components/shared';
import { useCreateRankMutation } from 'utils/__generated__/types';

const AddRankForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const rankMutation = useCreateRankMutation({ onSuccess });

	const form = useForm({
		initialValues: {
			name: '',
			note: '',
		},
		validate: {
			name: (value) => (!value ? 'Field is required' : null),
		},
	});

	const onSubmit = (values: typeof form.values) => {
		rankMutation.mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
				withAsterisk
				label="Name"
				placeholder="Enter rank's name"
				{...form.getInputProps('name')}
			/>
			<Textarea
				mt="sm"
				label="Note"
				placeholder="Enter rank's note"
				{...form.getInputProps('note')}
			/>

			<FormError mutation={rankMutation} />

			<Group position="right" mt="lg">
				<Button disabled={rankMutation.isLoading} loading={rankMutation.isLoading} type="submit">
					Add Rank
				</Button>
			</Group>
		</form>
	);
};

export default AddRankForm;
