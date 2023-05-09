import { ColorInput, Group, Loader, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import { FieldLoader } from 'components/shared';
import { getToday } from 'functions';
import { useGetAllUsersQuery, useGetProjectColorsQuery } from 'utils/__generated__/types';

export const INITIAL_VALUES = {
	name: '',
	date_begin: getToday(),
	date_end: getToday(),
	projects_color_set_id: '',
	code: '',
	short_name: '',
	solver: '',
};

export const useProjectForm = (validate: FormValidateInput<typeof INITIAL_VALUES> | {}) => {
	const form = useForm({
		initialValues: INITIAL_VALUES,

		validate: validate,
	});
	return form;
};

const PickSolver = ({ ...rest }) => {
	const usersQuery = useGetAllUsersQuery();
	const users = (usersQuery.data?.users || []).map(({ email, name, id }) => ({
		value: id,
		label: `${name} (${email})`,
	}));

	if (usersQuery.isLoading) return <FieldLoader />;

	return (
		<Select mt="sm" label="Main investigator" placeholder="Choose user" data={users} {...rest} />
	);
};

const PickProjectColor = ({ ...rest }) => {
	const projectColors = useGetProjectColorsQuery();

	if (projectColors.isLoading) return <FieldLoader />;

	const colors = projectColors.data?.projects_color_sets.map((c) => `#${c.hex}`);

	return (
		<ColorInput
			placeholder="Pick color"
			label="Pick project color"
			mt="sm"
			disallowInput
			withPicker={false}
			swatchesPerRow={4}
			format="hex"
			swatches={colors}
			dropdownZIndex={402}
			{...rest}
		/>
	);
};

export const FormContent = ({
	form,
	validate = false,
}: {
	form: ReturnType<typeof useProjectForm>;
	validate?: boolean;
}) => {
	return (
		<>
			<TextInput
				mt="sm"
				withAsterisk={validate}
				label="Acronym"
				placeholder="Enter project's acronym"
				{...form.getInputProps('short_name')}
			/>
			<TextInput
				mt="sm"
				withAsterisk={validate}
				label="Name"
				placeholder="Enter project's name"
				{...form.getInputProps('name')}
			/>
			<TextInput
				mt="sm"
				withAsterisk={validate}
				label="Code"
				placeholder="Enter project's code"
				{...form.getInputProps('code')}
			/>
			<Group grow>
				<TextInput
					mt="sm"
					withAsterisk={validate}
					label="Project beginning"
					placeholder="Enter project's beginning"
					type={'date'}
					{...form.getInputProps('date_begin')}
				/>
				<TextInput
					mt="sm"
					withAsterisk={validate}
					label="Project end"
					placeholder="Enter project's end"
					type={'date'}
					{...form.getInputProps('date_end')}
				/>
			</Group>
			<PickSolver {...form.getInputProps('solver')} withAsterisk={validate} />
			<PickProjectColor {...form.getInputProps('projects_color_set_id')} withAsterisk={validate} />
		</>
	);
};
