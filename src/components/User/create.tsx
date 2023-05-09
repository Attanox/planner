import { Button, Group, PasswordInput } from '@mantine/core';

import { useRegisterMutation } from 'utils/__generated__/types';
import { FormError } from 'components/shared';
import { FormContent, useUserForm } from './shared';

const AddUserForm = ({ onSuccess }: { onSuccess: () => void }) => {
	const register = useRegisterMutation({
		onSuccess,
	});
	const form = useUserForm({
		first_name: (value) => (value === '' ? 'Field is required' : null),
		last_name: (value) => (value === '' ? 'Field is required' : null),
		email: (value) =>
			value === '' ? 'E-mail is required' : /^\S+@\S+$/.test(value) ? null : 'Invalid email',
		password: (value) => (value === '' ? 'Password is required' : null),
		password_confirmation: (value, values) =>
			value === ''
				? 'Password confirmation is required'
				: value !== values.password
				? 'Passwords do not match'
				: null,
	});

	const onSubmit = (values: typeof form.values) => {
		register.mutate(values);
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<FormContent form={form} validate />

			<Group w={'100%'} mt="sm" position="apart" grow align={'flex-start'}>
				<PasswordInput
					withAsterisk
					label="Password"
					placeholder="Enter user's password"
					{...form.getInputProps('password')}
				/>
				<PasswordInput
					withAsterisk
					label="Confirm password"
					placeholder="Confirm password"
					{...form.getInputProps('password_confirmation')}
				/>
			</Group>

			<FormError mutation={register} />

			<Group position="right" mt="lg">
				<Button disabled={register.isLoading} loading={register.isLoading} type="submit">
					Add user
				</Button>
			</Group>
		</form>
	);
};

export default AddUserForm;
