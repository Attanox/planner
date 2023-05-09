import { Button, Group } from '@mantine/core';

import {
	useCreateProjectMutation,
	useCreateUserProjectMutation,
	useGetProjectColorsQuery,
} from 'utils/__generated__/types';
import { getGraphqlDate } from 'functions';
import { FormError } from 'components/shared';
import { FormContent, useProjectForm } from './shared';

const AddProjectForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const projectColors = useGetProjectColorsQuery();
	const userProjectMutation = useCreateUserProjectMutation({ onSuccess });
	const project = useCreateProjectMutation({
		onSuccess(data) {
			userProjectMutation.mutate({
				occupancy: 1,
				project_id: data.createProject?.id || '',
				user_id: data.createProject?.solver.id || '',
			});
		},
	});
	const form = useProjectForm({
		name: (value) => (value === '' ? 'Field is required' : null),
		projects_color_set_id: (value) => (value === '' ? 'Field is required' : null),
		code: (value) => (value === '' ? 'Field is required' : null),
		short_name: (value) => (value === '' ? 'Field is required' : null),
		solver: (value) => (value === '' ? 'Field is required' : null),
	});

	const onSubmit = (values: typeof form.values) => {
		const projectColor = projectColors.data?.projects_color_sets.find(
			(c) => `#${c.hex}` === values.projects_color_set_id
		);
		const input = {
			name: values.name,
			date_begin: getGraphqlDate(new Date(values.date_begin)),
			date_end: getGraphqlDate(new Date(values.date_end)),
			projects_color_set_id: projectColor?.id + '',
			code: values.code,
			short_name: values.short_name,
			solver: values.solver,
		};
		project.mutate(input);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<FormContent form={form} validate />

			<FormError mutation={project} />

			<Group position="right" mt="lg">
				<Button disabled={project.isLoading} loading={project.isLoading} type="submit">
					Add project
				</Button>
			</Group>
		</form>
	);
};

export default AddProjectForm;
