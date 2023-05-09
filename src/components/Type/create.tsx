import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormError } from 'components/shared';
import { useCreateTypeMutation } from 'utils/__generated__/types';

const AddTypeForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const typeMutation = useCreateTypeMutation({ onSuccess });

	const form = useForm({
		initialValues: {
			name: '',
			description: '',
		},
		validate: {
			name: (value) => (value === '' ? 'Field is required' : null),
			description: (value) => (value === '' ? 'Field is required' : null),
		},
	});

	const onSubmit = (values: typeof form.values) => {
		typeMutation.mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
				withAsterisk
				label="Name"
				placeholder="Enter name"
				{...form.getInputProps('name')}
			/>
			<Textarea
				mt="sm"
				withAsterisk
				label="Description"
				placeholder="Enter desription"
				{...form.getInputProps('description')}
			/>

			<FormError mutation={typeMutation} />

			<Group position="right" mt="lg">
				<Button disabled={typeMutation.isLoading} loading={typeMutation.isLoading} type="submit">
					Add type
				</Button>
			</Group>
		</form>
	);
};

export default AddTypeForm;
