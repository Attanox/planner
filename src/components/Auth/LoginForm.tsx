import {
	Paper,
	TextInput,
	PasswordInput,
	Checkbox,
	Button,
	Title,
	Loader,
	Center,
	Text,
} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { useGetLoggedUserQuery, useLoginMutation } from 'utils/__generated__/types';
import { loggedUserQuery } from 'utils/queries';
import { useForm } from '@mantine/form';
import { useLoginFormStyles } from './styles';
import { FormError } from 'components/shared';

const LoginForm = () => {
	const { classes } = useLoginFormStyles();
	const { isLoading } = useGetLoggedUserQuery();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const loginMutation = useLoginMutation({
		async onSuccess(data) {
			if (data.login) {
				localStorage.setItem('token', data.login);
			}
			const query = loggedUserQuery();
			await queryClient.invalidateQueries(query.queryKey);
			navigate('/', { replace: true });
		},
	});

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			stay: false,
		},
		validate: {
			email: (v) => (!v ? 'Field is required' : null),
			password: (v) => (!v ? 'Field is required' : null),
		},
	});

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
					onSubmit={form.onSubmit((v) => loginMutation.mutate(v))}
					className={classes.form}
					radius={0}
					p={30}
				>
					<Title order={2} className={classes.title} align="center" mt="md" mb={50}>
						Welcome back!
					</Title>

					<TextInput
						label="Email address"
						placeholder="hello@gmail.com"
						size="md"
						type="email"
						variant="default"
						name="email"
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						variant="default"
						label="Password"
						placeholder="Your password"
						mt="md"
						size="md"
						name="password"
						{...form.getInputProps('password')}
					/>
					<Checkbox label="Keep me logged in" mt="xl" size="md" {...form.getInputProps('stay')} />

					<FormError mutation={loginMutation} />

					<Button
						loading={loginMutation.isLoading}
						disabled={loginMutation.isLoading}
						type="submit"
						id="submit"
						fullWidth
						mt="xl"
						size="md"
					>
						Sign in
					</Button>

					<Text align="center" mt="md">
						Don&apos;t have an account?{' '}
						<Text component="span" sx={{ letterSpacing: '0.025rem' }} weight={700}>
							<Link to="/register">Register</Link>
						</Text>
					</Text>
				</Paper>
			</Paper>
		</div>
	);
};

export default LoginForm;
