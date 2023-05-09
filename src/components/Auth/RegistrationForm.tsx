import {
	Paper,
	TextInput,
	PasswordInput,
	Button,
	Title,
	Loader,
	Center,
	Text,
	Group,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { UserStatus, useGetLoggedUserQuery, useRegisterMutation } from 'utils/__generated__/types';
import { useForm } from '@mantine/form';
import { useLoginFormStyles } from './styles';
import { FormError, showSuccessNotification } from 'components/shared';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
	const { classes } = useLoginFormStyles();
	const { isLoading } = useGetLoggedUserQuery();
	const navigate = useNavigate();
	const registerMutation = useRegisterMutation({
		onSuccess() {
			showSuccessNotification('Registration was successful!');
			navigate('/login', { replace: true });
		},
	});

	const form = useForm({
		initialValues: {
			email: '',
			first_name: '',
			last_name: '',
			password: '',
			password_again: '',
		},
		validate: {
			first_name: (v) => (!v ? 'Field is required' : null),
			last_name: (v) => (!v ? 'Field is required' : null),
			email: (v) => (!v ? 'Field is required' : /^\S+@\S+$/.test(v) ? null : 'Invalid email'),
			password: (v) => (!v ? 'Field is required' : null),
			password_again: (value, values) =>
				value === ''
					? 'Field is required'
					: value !== values.password
					? 'Passwords do not match'
					: null,
		},
	});

	const onSubmit = (values: typeof form.values) => {
		const { email, first_name, last_name, password } = values;
		registerMutation.mutate({
			email,
			first_name,
			last_name,
			status: UserStatus.TeamMember,
			password,
		});
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
			<Paper shadow="md" radius="md" className={classes.wrapper}>
				<Paper
					component="form"
					onSubmit={form.onSubmit(onSubmit)}
					className={classes.form}
					radius={0}
					p={30}
				>
					<Title order={2} className={classes.title} align="center" mt="md" mb={50}>
						Welcome!
					</Title>

					<Group w={'100%'} mt="sm" position="apart" grow align={'flex-start'}>
						<TextInput
							withAsterisk
							data-autofocus
							label="First name"
							placeholder="Enter user's first name"
							{...form.getInputProps('first_name')}
						/>
						<TextInput
							withAsterisk
							label="Last name"
							placeholder="Enter user's last name"
							{...form.getInputProps('last_name')}
						/>
					</Group>
					<TextInput
						label="Email address"
						placeholder="hello@gmail.com"
						size="md"
						mt="md"
						type="email"
						variant="default"
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						variant="default"
						label="Password"
						placeholder="Your password"
						mt="md"
						size="md"
						{...form.getInputProps('password')}
					/>
					<PasswordInput
						variant="default"
						label="Password"
						placeholder="Your password"
						mt="md"
						size="md"
						{...form.getInputProps('password_again')}
					/>
					<Button
						loading={registerMutation.isLoading}
						disabled={registerMutation.isLoading}
						type="submit"
						fullWidth
						mt="xl"
						size="md"
					>
						Sign up
					</Button>

					<FormError mutation={registerMutation} />

					<Text align="center" mt="md">
						Already have an account?{' '}
						<Text component="span" sx={{ letterSpacing: '0.025rem' }} weight={700}>
							<Link to="/login">Login</Link>
						</Text>
					</Text>
				</Paper>
			</Paper>
		</div>
	);
};

export default RegistrationForm;
