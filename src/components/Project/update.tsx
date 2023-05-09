import { Button, Center, Group, Loader } from '@mantine/core';

import {
	useGetProjectColorsQuery,
	useGetProjectQuery,
	useUpdateProjectMutation,
} from 'utils/__generated__/types';
import { getDate, getGraphqlDate } from 'functions';

import { FormContent, useProjectForm } from './shared';
import { FieldLoader, FormError } from 'components/shared';

const EditProjectForm = ({ onSuccess, id }: { id: string; onSuccess: () => void }) => {
	const form = useProjectForm({});
	const p = useGetProjectQuery(
		{ id },
		{
			onSuccess(data) {
				if (!data.projectById) return;
				const { color, date_begin, date_end, name, solver, code, short_name } = data.projectById;
				form.setValues({
					date_begin: getDate(date_begin),
					date_end: getDate(date_end),
					name: name,
					projects_color_set_id: `#${color.hex}`,
					code,
					short_name,
					solver: solver.id,
				});
			},
		}
	);
	const projectColors = useGetProjectColorsQuery();
	const project = useUpdateProjectMutation({
		onSuccess() {
			p.refetch();
			onSuccess();
		},
	});

	const onSubmit = (values: typeof form.values) => {
		const projectColor = projectColors.data?.projects_color_sets.find(
			(c) => `#${c.hex}` === values.projects_color_set_id
		);
		const input = {
			id,
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

	if (p.isFetching) {
		return <FieldLoader />;
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<FormContent form={form} validate={false} />

			<FormError mutation={project} />

			<Group position="right" mt="lg">
				<Button disabled={project.isLoading} loading={project.isLoading} type="submit">
					Edit project
				</Button>
			</Group>
		</form>
	);
};

export default EditProjectForm;
