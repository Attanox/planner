import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { FormError } from 'components/shared';
import { getDate, getGraphqlDate, getToday } from 'functions';
import { useCreateMilestoneMutation } from 'utils/__generated__/types';

const AddMilestoneForm = ({
	onSuccess,
	project_id,
	maxDate,
	minDate,
}: {
	project_id: string;
	onSuccess: () => void;
	maxDate: Date;
	minDate: Date;
}) => {
	const milestoneMutation = useCreateMilestoneMutation({
		onSuccess,
	});
	const form = useForm({
		initialValues: {
			name: '',
			description: '',
			date: getToday(),
		},

		validate: {
			name: (value) => (value === '' ? 'Name is required' : null),
			date: (value) =>
				new Date(value) > new Date(maxDate.getTime() + 30 * 86400000) || new Date(value) < minDate
					? 'Date is out of the permitted range'
					: null,
		},
	});

	const onSubmit = (values: typeof form.values) => {
		const input = {
			name: values.name,
			description: values.description,
			date: getGraphqlDate(new Date(values.date)),
			project_id,
		};
		milestoneMutation.mutate(input);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
				withAsterisk
				label="Name"
				placeholder="Enter milestone name"
				{...form.getInputProps('name')}
			/>
			<Textarea
				mt="sm"
				label="Description"
				placeholder="Enter milestone description"
				{...form.getInputProps('description')}
			/>
			<TextInput
				mt="sm"
				withAsterisk
				label="Date"
				placeholder="Enter milestone's date"
				type={'date'}
				// min={getDate(minDate)}
				// max={getDate(maxDate)}
				{...form.getInputProps('date')}
			/>

			<FormError mutation={milestoneMutation} />

			<Group position="right" mt="lg">
				<Button
					disabled={milestoneMutation.isLoading}
					loading={milestoneMutation.isLoading}
					type="submit"
				>
					Add milestone
				</Button>
			</Group>
		</form>
	);
};

export default AddMilestoneForm;
