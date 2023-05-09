import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { createEmotionCache, MantineProvider } from '@mantine/core';

import { queryClient, TQueryClient } from './utils/react-query-client';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './error-page';
import Login from './routes/login';
import Users, { loader as usersLoader } from './routes/users';
import Projects from './routes/projects';
import Results from './routes/results';
import { NotificationsProvider } from '@mantine/notifications';
import Dashboard from 'routes/dashboard';
import ResultDetail from 'routes/results.$result_id';
import ProjectDetail from 'routes/projects.$project_id';
import Configuration from 'routes/configuration';

import RankConfiguration from 'routes/configuration.rank';
import TypeConfiguration from 'routes/configuration.type';
import ResultCategoryConfiguration from 'routes/configuration.result-category';
import UserDetail from 'routes/users.$user_id';
import Register from 'routes/register';
import Analytics from 'routes/analytics';
import ResetPassword from 'routes/reset-password';

const appendCache = createEmotionCache({ key: 'mantine', prepend: false });

const theme = {
	primaryColor: 'teal',
	// primaryShade: 5,
	black: '#3f3f3f',
	white: '#ffffff',
	fontFamily: 'Poppins, sans-serif',
	headings: { fontFamily: 'Varela, sans-serif' },
	components: {
		Button: { styles: { root: { letterSpacing: '1px', fontWeight: '400' as any } } },
	},
	defaultRadius: 'xs',
	loader: 'dots' as any,
};

const getRouter = (queryClient: TQueryClient) => {
	return createBrowserRouter([
		{
			path: '/',
			element: <Root />,
			errorElement: <ErrorPage />,
			loader: rootLoader(queryClient),
			children: [
				{
					index: true,
					element: <Navigate to="/dashboard" />,
				},
				{
					path: 'dashboard',
					element: <Dashboard />,
				},
				{
					path: 'users',
					element: <Users />,
				},
				{
					path: 'projects',
					element: <Projects />,
				},
				{
					path: 'results',
					element: <Results />,
				},
				{
					path: 'analytics',
					element: <Analytics />,
				},
				{
					path: 'reset-password',
					element: <ResetPassword />,
				},
				{ path: 'results/:resultId', element: <ResultDetail /> },
				{ path: 'projects/:projectId', element: <ProjectDetail /> },
				{ path: 'users/:userId', element: <UserDetail /> },
				{
					path: 'configuration',
					element: <Configuration />,
					children: [
						{ index: true, element: <Navigate to="result-category" /> },
						{ path: 'result-category', element: <ResultCategoryConfiguration /> },
						{ path: 'rank', element: <RankConfiguration /> },
						{ path: 'type', element: <TypeConfiguration /> },
					],
				},
			],
		},
		{
			path: 'login',
			element: <Login />,
		},
		{
			path: 'register',
			element: <Register />,
		},
	]);
};

function App() {
	return (
		<MantineProvider emotionCache={appendCache} theme={theme} withNormalizeCSS withGlobalStyles>
			<NotificationsProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={getRouter(queryClient)} />
					{/* <ReactQueryDevtools initialIsOpen={false} /> */}
				</QueryClientProvider>
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default App;
