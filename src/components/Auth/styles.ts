import { createStyles } from '@mantine/core';

export const useLoginFormStyles = createStyles((theme) => ({
	center: {
		height: '100vh',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},

	wrapper: {
		maxHeight: '90vh',
		width: '90%',
		padding: '0',
		backgroundSize: 'cover',
		backgroundImage:
			'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
	},

	form: {
		borderRight: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
		}`,
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

	logo: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		width: 120,
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
}));
