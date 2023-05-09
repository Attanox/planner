import { Button, Center, Group, Loader, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { FieldLoader, FormError } from 'components/shared';
import { getDate, getGraphqlDate, getToday } from 'functions';
import { useGetMilestoneQuery, useUpdateMilestoneMutation } from 'utils/__generated__/types';

const UpdateMilestoneForm = ({
	onSuccess,
	project_id,
	milestone_id,
	maxDate,
	minDate,
}: {
	onSuccess: () => void;
	project_id: string;
	milestone_id: string;
	minDate: Date;
	maxDate: Date;
}) => {
	const milestoneMutation = useUpdateMilestoneMutation({
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
	const milestoneQuery = useGetMilestoneQuery(
		{ id: milestone_id },
		{
			onSuccess(data) {
				form.setValues({
					date: getDate(data.milestoneById?.date),
					description: data.milestoneById?.description || '',
					name: data.milestoneById?.name || '',
				});
			},
		}
	);

	const onSubmit = (values: typeof form.values) => {
		const input = {
			name: values.name,
			description: values.description,
			date: getGraphqlDate(new Date(values.date)),
			project_id,
			id: milestone_id,
		};
		milestoneMutation.mutate(input);
	};

	if (milestoneQuery.isLoading) {
		return <FieldLoader />;
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<TextInput
				mt="sm"
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
					Save
				</Button>
			</Group>
		</form>
	);
};

export default UpdateMilestoneForm;
