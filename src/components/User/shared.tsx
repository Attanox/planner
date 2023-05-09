import { useForm } from '@mantine/form';
import { Group, Select, TextInput } from '@mantine/core';

import { UserStatus } from 'utils/__generated__/types';
import { getToday, processUserStatus } from 'functions';
import { FormValidateInput } from '@mantine/form/lib/types';

export const INITIAL_VALUES = {
	email: '',
	first_name: '',
	last_name: '',
	password: '',
	password_confirmation: '',
	status: UserStatus.TeamMember,
};

export const useUserForm = (validate: FormValidateInput<typeof INITIAL_VALUES> | {}) => {
	const form = useForm({
		initialValues: INITIAL_VALUES,

		validate: validate,
	});
	return form;
};

export const FormContent = ({
	form,
	validate = false,
}: {
	form: ReturnType<typeof useUserForm>;
	validate?: boolean;
}) => {
	return (
		<>
			<Group w={'100%'} mt="sm" position="apart" grow align={'flex-start'}>
				<TextInput
					withAsterisk={validate}
					data-autofocus
					label="First name"
					placeholder="Enter user's first name"
					{...form.getInputProps('first_name')}
				/>
				<TextInput
					withAsterisk={validate}
					label="Last name"
					placeholder="Enter user's last name"
					{...form.getInputProps('last_name')}
				/>
			</Group>
			<TextInput
				withAsterisk={validate}
				mt="sm"
				label="Email"
				placeholder="your@email.com"
				{...form.getInputProps('email')}
			/>
			<Select
				mt={'sm'}
				withAsterisk={validate}
				label="Status"
				data={[
					{
						value: UserStatus.TeamMember,
						label: processUserStatus(UserStatus.TeamMember),
					},
					{
						value: UserStatus.ExternalCollaborator,
						label: processUserStatus(UserStatus.ExternalCollaborator),
					},
					{
						value: UserStatus.Alumni,
						label: processUserStatus(UserStatus.Alumni),
					},
				]}
				{...form.getInputProps('status')}
			/>
		</>
	);
};
