import { Button, Group } from '@mantine/core';

import { useGetUserQuery, useUpdateUserMutation } from 'utils/__generated__/types';
import { FieldLoader, FormError } from 'components/shared';
import { FormContent, useUserForm } from './shared';

const EditUserForm = ({ onSuccess, id }: { id: string; onSuccess: () => void }) => {
	const update = useUpdateUserMutation({ onSuccess });
	const form = useUserForm({
		first_name: (value) => (value === '' ? 'Field is required' : null),
		last_name: (value) => (value === '' ? 'Field is required' : null),
		email: (value) =>
			value === '' ? 'E-mail is required' : /^\S+@\S+$/.test(value) ? null : 'Invalid email',
	});
	const user = useGetUserQuery(
		{ id },
		{
			onSuccess(data) {
				if (data.userById) {
					const { email, first_name, last_name, status } = data.userById;

					form.setValues({ email, first_name, last_name, status });
				}
			},
		}
	);

	const onSubmit = (values: typeof form.values) => {
		const { email, first_name, last_name, status } = values;
		update.mutate({ id, email, first_name, last_name, status });
	};

	if (user.isLoading) {
		return <FieldLoader />;
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<FormContent form={form} validate />

			<FormError mutation={update} />

			<Group position="right" mt="lg">
				<Button disabled={update.isLoading} loading={update.isLoading} type="submit">
					Save
				</Button>
			</Group>
		</form>
	);
};

export default EditUserForm;
