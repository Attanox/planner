import { Button, Center, createStyles, Loader, Paper, PasswordInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormError, showSuccessNotification } from 'components/shared';
import { useGetLoggedUserQuery, useResetPasswordMutation } from 'utils/__generated__/types';

const useLoginFormStyles = createStyles((theme) => ({
	center: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	form: {
		height: '100%',
		maxWidth: 450,
		paddingTop: 80,

		[`@media (max-width: ${theme.breakpoints.sm}px)`]: {
			maxWidth: '100%',
		},
	},

	title: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}));

const ResetPassword = () => {
	const { classes } = useLoginFormStyles();
	const { isLoading } = useGetLoggedUserQuery();
	const resetPasswordMutation = useResetPasswordMutation({
		onSuccess() {
			form.reset();
			showSuccessNotification('Password was successfully changed!');
		},
	});

	const form = useForm({
		initialValues: {
			old_password: '',
			new_password: '',
			new_password_again: '',
		},
		validate: {
			old_password: (v) => (!v ? 'Field is required' : null),
			new_password: (v) => (!v ? 'Field is required' : null),
			new_password_again: (value, values) =>
				value === ''
					? 'Field is required'
					: value !== values.new_password
					? 'Passwords do not match'
					: null,
		},
	});

	const onSubmit = (values: typeof form.values) => {
		const { new_password, old_password } = values;
		resetPasswordMutation.mutate({ newPassword: new_password, oldPassword: old_password });
	};

	if (isLoading) {
		return (
			<Center style={{ width: '100%', height: '100vh' }}>
				<Loader />
			</Center>
		);
	}

	return (
		<div className={classes.center}>
			<Paper
				component="form"
				onSubmit={form.onSubmit(onSubmit)}
				className={classes.form}
				radius={0}
				p={30}
			>
				<Title order={2} className={classes.title} align="center" mt="md" mb={50}>
					Change your password
				</Title>

				<PasswordInput
					label="Old Password"
					placeholder="Type old password"
					mt="md"
					size="md"
					{...form.getInputProps('old_password')}
				/>
				<PasswordInput
					label="New Password"
					placeholder="Type new password"
					mt="md"
					size="md"
					{...form.getInputProps('new_password')}
				/>
				<PasswordInput
					label="New Password Again"
					placeholder="Retype new password"
					mt="md"
					size="md"
					{...form.getInputProps('new_password_again')}
				/>

				<FormError mutation={resetPasswordMutation} />

				<Button
					loading={resetPasswordMutation.isLoading}
					disabled={resetPasswordMutation.isLoading}
					type="submit"
					fullWidth
					mt="xl"
					size="md"
				>
					Change password
				</Button>
			</Paper>
		</div>
	);
};

export default ResetPassword;
