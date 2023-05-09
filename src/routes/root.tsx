import { AppShell, Center, Flex, Loader, Paper } from '@mantine/core';
import { Outlet, redirect } from 'react-router-dom';

import AppNavbar from 'components/Navbar';
import { GetLoggedUserQuery, useGetLoggedUserQuery } from 'utils/__generated__/types';
import { TQueryClient } from 'utils/react-query-client';
import { loggedUserQuery } from 'utils/queries';
import { useMediaQuery } from '@mantine/hooks';
import { BREAKPOINTS } from 'utils/constants';

export const loader = (queryClient: TQueryClient) => async () => {
	const query = loggedUserQuery();
	// ⬇️ return data or fetch it
	const data =
		queryClient.getQueryData<Awaited<GetLoggedUserQuery>>(query.queryKey) ??
		(await queryClient.fetchQuery(query));

	if (!data?.me?.id) return redirect('login');

	return data;
};

const Root = () => {
	const { isLoading } = useGetLoggedUserQuery();
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);

	if (isLoading) {
		return (
			<Center style={{ width: '100%', height: '100vh' }}>
				<Loader />
			</Center>
		);
	}

	return (
		<AppShell
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
					width: '100%',
					...(matches ? { marginTop: '30px' } : {}),
				},
			})}
			padding="md"
			navbar={<AppNavbar />}
			sx={{
				height: '100vh',
			}}
		>
			<Paper
				p={'md'}
				sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}
				radius={'xs'}
				shadow={'xs'}
			>
				<Outlet />
			</Paper>
		</AppShell>
	);
};

export default Root;
