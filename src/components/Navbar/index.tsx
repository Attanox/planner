import { useStyles } from './styles';
import {
	Image,
	Button,
	Navbar,
	UnstyledButton,
	Group,
	Avatar,
	Text,
	Box,
	useMantineTheme,
	Loader,
	Drawer,
	Flex,
	Space,
	ActionIcon,
	Title,
} from '@mantine/core';
import { NavLink, useNavigate } from 'react-router-dom';
import {
	IconHome,
	IconReportAnalytics,
	IconUsers,
	IconFileAnalytics,
	IconLogout,
	IconSettings,
	IconPresentationAnalytics,
	IconMenu2,
	IconX,
} from '@tabler/icons';

import { LogoutDocument, useGetLoggedUserQuery } from 'utils/__generated__/types';
import { useQueryClient } from '@tanstack/react-query';
import { loggedUserQuery } from 'utils/queries';
import { fetchData } from 'utils/graphql-fetcher';
import { BREAKPOINTS, NAVBAR_WIDTH } from 'utils/constants';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from 'react-router-dom';

const Logout = () => {
	const { data } = useGetLoggedUserQuery();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const query = loggedUserQuery();

		await fetchData(LogoutDocument)();

		queryClient.invalidateQueries(query.queryKey);

		navigate('/login', { replace: true });
	}

	return (
		<>
			{data?.me?.id ? (
				<form onSubmit={handleSubmit}>
					<Button id="logout" type="submit" color="red">
						<IconLogout />
					</Button>
				</form>
			) : null}
		</>
	);
};

export function User() {
	const theme = useMantineTheme();
	const { data, isLoading } = useGetLoggedUserQuery();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Box
			sx={{
				paddingTop: theme.spacing.sm,
				borderTop: `1px solid ${
					theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
				}`,
			}}
		>
			<UnstyledButton
				sx={{
					display: 'block',
					width: '100%',
					padding: theme.spacing.xs,
					borderRadius: theme.radius.sm,
					color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

					'&:hover': {
						backgroundColor:
							theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
					},
				}}
				component={Link}
				to="reset-password"
			>
				<Group>
					<Box sx={{ flex: 1 }}>
						<Text color="dimmed" size="xs" weight="bold">
							{data?.me?.role?.id ? 'admin account' : 'regular account'}
						</Text>
						<Text size="sm" weight={500}>
							{data?.me?.name}
						</Text>
						<Text color="dimmed" size="xs">
							{data?.me?.email}
						</Text>
					</Box>
				</Group>
			</UnstyledButton>
		</Box>
	);
}

const LINKS = [
	{ link: '/dashboard', label: 'dashboard', icon: IconHome },
	{ link: '/projects', label: 'projects', icon: IconReportAnalytics },
	{ link: '/users', label: 'users', icon: IconUsers },
	{ link: '/results', label: 'results', icon: IconFileAnalytics },
	{ link: '/analytics', label: 'analytics', icon: IconPresentationAnalytics },
	{ link: '/configuration', label: 'configuration', icon: IconSettings },
];

const AppNavbar = ({ closeNavbar }: { closeNavbar?: () => void }) => {
	const { classes, cx } = useStyles();

	const items = LINKS.map((link) => (
		<NavLink
			key={link.label}
			to={link.link}
			className={({ isActive }) =>
				cx(classes.link, {
					[classes.linkActive]: isActive,
				})
			}
		>
			<link.icon className={classes.linkIcon} stroke={1.5} />
			<span style={{ textTransform: 'capitalize' }}>{link.label}</span>
		</NavLink>
	));

	return (
		<Navbar className={classes.navbar} height={700} width={{ sm: NAVBAR_WIDTH }} p="md">
			<Navbar.Section grow>
				<Flex w="100%" align={'flex-start'} mb="xl">
					{closeNavbar ? <Space w="10px" /> : null}

					<Text
						w="100%"
						style={{ lineHeight: '1.35rem', letterSpacing: '0.125rem' }}
						align="center"
						id="logo"
						fz="xl"
						fw={700}
					>
						Research
						<br />
						Planner
					</Text>

					{closeNavbar ? (
						<ActionIcon mt="sm" onClick={closeNavbar}>
							<IconX />
						</ActionIcon>
					) : null}
				</Flex>
				{items}
			</Navbar.Section>

			<Navbar.Section>
				<User />
			</Navbar.Section>

			<Navbar.Section className={classes.footer}>
				<Logout />
			</Navbar.Section>
		</Navbar>
	);
};

const ResponsiveNavbar = () => {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();
	const matches = useMediaQuery(`(min-width: ${BREAKPOINTS.sm}px)`);

	if (matches) {
		return <AppNavbar />;
	}

	return (
		<>
			<Drawer
				opened={opened}
				onClose={() => setOpened(false)}
				title=""
				overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
				overlayOpacity={0.55}
				overlayBlur={3}
			>
				<AppNavbar closeNavbar={() => setOpened(false)} />
			</Drawer>

			<Box
				p={'md'}
				sx={() => ({
					position: 'fixed',
					zIndex: 199,
					width: '100%',
					height: '20px',
					top: 0,
					left: 0,
					backgroundColor: 'white',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				})}
			>
				<Text color={'dimmed'} fz="xs">
					RTD planner
				</Text>
				<ActionIcon sx={(theme) => ({ color: theme.primaryColor })} onClick={() => setOpened(true)}>
					<IconMenu2 />
				</ActionIcon>
			</Box>
			<Space h={'60px'} />
		</>
	);
};

export default ResponsiveNavbar;
