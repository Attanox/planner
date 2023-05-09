import { Button, Center, Group, Loader, Textarea, TextInput } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { FieldLoader, FormError } from 'components/shared';
import { getDate, getGraphqlDate, getToday } from 'functions';
import {
	useGetPhaseQuery,
	useUpdatePhaseMutation,
	useUpdateUserResultMutation,
} from 'utils/__generated__/types';

const EditPhaseForm = ({
	onSuccess,
	result_id,
	phase_id,
}: {
	onSuccess: () => void;
	result_id: string;
	phase_id: string;
}) => {
	const userResultMutation = useUpdateUserResultMutation();
	const phaseMutation = useUpdatePhaseMutation({
		async onSuccess(data) {
			await Promise.all(
				(data.updatePhase?.users || []).map((user) => {
					return userResultMutation.mutate({
						result_id: result_id,
						user_id: user?.id || '',
						date_begin: data.updatePhase?.date_begin,
						date_end: data.updatePhase?.date_end,
					});
				})
			);
			onSuccess();
		},
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
			description: (value) => (value === '' ? 'Description' : null),
		},
	});
	const phaseQuery = useGetPhaseQuery(
		{ id: phase_id },
		{
			onSuccess(data) {
				form.setValues({
					date_begin: getDate(new Date(data.phaseById?.date_begin)),
					date_end: getDate(new Date(data.phaseById?.date_end)),
					description: data.phaseById?.description || '',
					name: data.phaseById?.name,
				});
			},
		}
	);

	const onSubmit = (values: typeof form.values) => {
		const input = {
			name: values.name,
			date_begin: getGraphqlDate(new Date(values.date_begin)),
			date_end: getGraphqlDate(new Date(values.date_end)),
			description: values.description,
			result_id: result_id,
			id: phase_id,
		};
		phaseMutation.mutate(input);
	};

	if (phaseQuery.isLoading) {
		return <FieldLoader />;
	}

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
				withAsterisk
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
					Edit phase
				</Button>
			</Group>
		</form>
	);
};

export default EditPhaseForm;
