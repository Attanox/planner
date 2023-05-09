import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormError } from 'components/shared';
import { useUpdateRankMutation } from 'utils/__generated__/types';

const EditRankForm = ({
	onSuccess,
	name,
	note,
	id,
}: {
	onSuccess: () => void;
	name: string;
	note?: string | null;
	id: string;
}) => {
	const rankMutation = useUpdateRankMutation({ onSuccess });

	const form = useForm({
		initialValues: {
			name,
			note: note || '',
		},
		validate: {
			name: (value) => (!value ? 'Field is required' : null),
		},
	});

	const onSubmit = (values: typeof form.values) => {
		rankMutation.mutate({ id, ...values });
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
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
					Edit Rank
				</Button>
			</Group>
		</form>
	);
};

export default EditRankForm;
