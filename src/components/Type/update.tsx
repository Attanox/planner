import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormError } from 'components/shared';
import { useUpdateTypeMutation } from 'utils/__generated__/types';

const EditTypeForm = ({
	onSuccess,
	name,
	description,
	id,
}: {
	onSuccess: () => void;
	name: string;
	description?: string | null;
	id: string;
}) => {
	const typeMutation = useUpdateTypeMutation({ onSuccess });

	const form = useForm({
		initialValues: {
			name,
			description: description || '',
		},
		validate: {
			name: (value) => (!value ? 'Field is required' : null),
		},
	});

	const onSubmit = (values: typeof form.values) => {
		typeMutation.mutate({ id, ...values });
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
				label="Name"
				placeholder="Enter type's name"
				{...form.getInputProps('name')}
			/>
			<Textarea
				mt="sm"
				label="Description"
				placeholder="Enter type's description"
				{...form.getInputProps('description')}
			/>

			<FormError mutation={typeMutation} />

			<Group position="right" mt="lg">
				<Button disabled={typeMutation.isLoading} loading={typeMutation.isLoading} type="submit">
					Edit type
				</Button>
			</Group>
		</form>
	);
};

export default EditTypeForm;
