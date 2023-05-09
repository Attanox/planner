import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { FormError } from 'components/shared';
import { getGraphqlDate, getToday } from 'functions';
import { useCreatePhaseMutation } from 'utils/__generated__/types';

const AddPhaseForm = ({ onSuccess, result_id }: { onSuccess: () => void; result_id: string }) => {
	const phaseMutation = useCreatePhaseMutation({
		onSuccess,
	});
	const form = useForm({
		initialValues: {
			name: '',
			description: '',
			date_begin: getToday(),
			date_end: getToday(),
		},

		validate: {
			name: (value) => (value === '' ? 'Name is required' : null),
		},
	});

	const onSubmit = (values: typeof form.values) => {
		const input = {
			name: values.name,
			date_begin: getGraphqlDate(new Date(values.date_begin)),
			date_end: getGraphqlDate(new Date(values.date_end)),
			description: values.description,
			result_id: result_id,
		};
		phaseMutation.mutate(input);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
				withAsterisk
				label="Name"
				placeholder="Enter phase name"
				{...form.getInputProps('name')}
			/>
			<Textarea
				mt="sm"
				label="Description"
				placeholder="Enter phase description"
				{...form.getInputProps('description')}
			/>
			<Group grow>
				<TextInput
					mt="sm"
					withAsterisk
					label="Phase beginning"
					placeholder="Enter phase's beginning"
					type={'date'}
					{...form.getInputProps('date_begin')}
				/>
				<TextInput
					mt="sm"
					withAsterisk
					label="Phase end"
					placeholder="Enter phase's end"
					type={'date'}
					{...form.getInputProps('date_end')}
				/>
			</Group>

			<FormError mutation={phaseMutation} />

			<Group position="right" mt="lg">
				<Button disabled={phaseMutation.isLoading} loading={phaseMutation.isLoading} type="submit">
					Add phase
				</Button>
			</Group>
		</form>
	);
};

export default AddPhaseForm;
