import {
	Alert,
	Box,
	Card,
	createStyles,
	Grid,
	Group,
	Image,
	Paper,
	Select,
	Stack,
	Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Bar } from '@nivo/bar';
import { ResponsiveCalendar } from '@nivo/calendar';
import { CustomTick, PageWrapper, SimpleTable } from 'components/shared';
import { StatsSegments } from 'components/Stats';
import ProjectsTimeline from 'components/Timeline/ProjectsTimeline';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BREAKPOINTS } from 'utils/constants';
import { processUserTimelineProjectsData } from 'utils/process-data';
import {
	useGetTimelineProjectsByUserIdQuery,
	useGetUserQuery,
	useGetUserResultsStatsQuery,
	useGetUsersAssistancesQuery,
	useGetUserScheduleQuery,
} from 'utils/__generated__/types';
import User from 'components/User';
import { processUserStatus } from 'functions';
import { useState } from 'react';

const useCardStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	imageSection: {
		padding: theme.spacing.md,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		'& .mantine-Image-image': {
			height: '100px !important',
		},
	},

	label: {
		marginBottom: theme.spacing.xs,
		lineHeight: 1,
		fontWeight: 700,
		fontSize: theme.fontSizes.xs,
		letterSpacing: -0.25,
		textTransform: 'uppercase',
	},

	section: {
		padding: theme.spacing.md,
		borderTop: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
	},

	icon: {
		marginRight: 5,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
	},
}));

const Stats = ({ user_id }: { user_id: string }) => {
	const userStatsQuery = useGetUserResultsStatsQuery({ user_id });
	const user = useGetUserQuery({ id: user_id });
	const timelineProjectsQuery = useGetTimelineProjectsByUserIdQuery({ user_id });
	const { classes } = useCardStyles();

	if (userStatsQuery.isLoading || userStatsQuery.isError) {
		return <PageWrapper query={userStatsQuery} />;
	}
	if (user.isLoading || user.isError) {
		return <PageWrapper query={user} />;
	}

	const { data } = timelineProjectsQuery;
	const items = data?.userProjectByUserId.map((stat) => {
		const projectResults = stat.project.results.length;
		const projectName = stat.project.short_name;

		let involvedIn = 0;
		stat.project.results.forEach((r) => {
			const isAuthor = r?.result.author.id === user_id;
			if (isAuthor) involvedIn += 1;
			const isCoauthor = r?.result.coauthors.map((c) => c?.user?.id).includes(user_id);
			if (isCoauthor) involvedIn += 1;
		});

		return (
			<Grid.Col span={4}>
				<Text size="xs" color="dimmed">
					{projectName}
				</Text>
				<Text weight={500} size="sm">
					{projectResults} (inv. {involvedIn})
				</Text>
			</Grid.Col>
		);
	});

	return (
		<Card withBorder radius="md" className={classes.card}>
			<Group position="apart" mt="md" align="flex-start">
				<div>
					<Text weight={700}>
						{user.data.userById?.last_name} {user.data.userById?.first_name}
					</Text>

					<Text size="sm">{processUserStatus(user.data.userById?.status!)}</Text>

					<Text size="xs" color="dimmed">
						{user.data.userById?.email}
					</Text>
				</div>
				<User.Update id={user_id} />
			</Group>

			<Card.Section className={classes.section} mt="md">
				<Text size="sm" color="dimmed" className={classes.label}>
					Project stats
				</Text>

				<Grid gutter={10}>{items}</Grid>
			</Card.Section>

			<Card.Section className={classes.section} mt="md">
				<Text size="sm" color="dimmed" className={classes.label}>
					Results stats
				</Text>

				<Group spacing={8} mb={-8}>
					{userStatsQuery.data.userStatistics.map((stats, idx) => {
						const { delayed, in_progress, scheduled, type } = stats;
						const total = Number(delayed) + Number(in_progress) + Number(scheduled);
						return (
							<StatsSegments
								key={idx}
								title={type || ''}
								total={total}
								data={[
									{
										label: 'delayed',
										color: '#47d6ab',
										count: Number(delayed),
										part: Number(delayed) / total,
									},
									{
										label: 'in_progress',
										color: '#4fcdf7',
										count: Number(in_progress),
										part: Number(in_progress) / total,
									},
									{
										label: 'scheduled',
										color: '#03141a',
										count: Number(scheduled),
										part: Number(scheduled) / total,
									},
								]}
							/>
						);
					})}
				</Group>
			</Card.Section>
		</Card>
	);
};

const UserSchedule = ({ user_id }: { user_id: string }) => {
	const userSchedule = useGetUserScheduleQuery({ user_id });

	const [year, setYear] = useState(new Date().getFullYear().toString());
	const lastTenYears = Array.from({ length: 10 }, (_, i) => String(Number(year) - i)).reverse();
	const nextTenYears = Array.from({ length: 10 }, (_, i) => String(Number(year) + i + 1));

	if (userSchedule.isLoading || userSchedule.isError) {
		return <PageWrapper query={userSchedule} />;
	}

	const data = userSchedule.data.userSchedule.map((s) => ({
		day: s.day,
		value: Number(s.value),
	}));

	return (
		<div style={{ height: '150px' }}>
			<Group position="apart">
				<Text color={'dimmed'} size={'lg'}>
					Calendar view
					<Text color={'dimmed'} size={'xs'}>
						The calendar shows overlapping phases
					</Text>
				</Text>
				<Select
					label=""
					value={year}
					onChange={(v) => setYear(v || '')}
					data={[...lastTenYears, ...nextTenYears]}
				/>
			</Group>
			<ResponsiveCalendar
				data={data}
				from={`${year}-01-01`}
				to={`${year}-12-31`}
				emptyColor="#eeeeee"
				colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
				margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
				yearSpacing={40}
				monthBorderColor="#ffffff"
				dayBorderWidth={2}
				dayBorderColor="#ffffff"
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'row',
						translateY: 36,
						itemCount: 4,
						itemWidth: 42,
						itemHeight: 36,
						itemsSpacing: 14,
						itemDirection: 'right-to-left',
					},
				]}
			/>
		</div>
	);
};

const UserColabs = ({ user_id }: { user_id: string }) => {
	const assistancesQuery = useGetUsersAssistancesQuery({ user_id });

	if (assistancesQuery.isLoading || assistancesQuery.isError) {
		return <PageWrapper query={assistancesQuery} />;
	}

	return (
		<>
			<SimpleTable
				head={
					<tr>
						<th>Collaboration</th>
						<th style={{ maxWidth: '60px' }}>Count</th>
						<th>Results</th>
					</tr>
				}
				body={
					<>
						{assistancesQuery.data.usersAssistance.map((assist) => {
							const { assistances_count, assistances, user } = assist;

							return (
								<tr key={user.id}>
									<td>{user.name}</td>
									<td style={{ width: '', textAlign: 'right' }}>{assistances_count}</td>
									<td>
										{assistances.map((a) => (
											<>
												<Link to={`/results/${a?.id}`}>{a?.title}</Link>
												&nbsp;,
											</>
										))}
									</td>
								</tr>
							);
						})}
					</>
				}
			/>
		</>
	);
};

const UserDetail = () => {
	const { userId } = useParams();
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);

	const timelineProjectsQuery = useGetTimelineProjectsByUserIdQuery(
		{ user_id: userId || '' },
		{
			enabled: Boolean(userId),
		}
	);

	if (!userId) {
		return <Alert color={'red'}>Missing user ID.</Alert>;
	}

	if (timelineProjectsQuery.isLoading || timelineProjectsQuery.isError) {
		return <PageWrapper query={timelineProjectsQuery} />;
	}

	const projects = timelineProjectsQuery.data.userProjectByUserId;
	if (!projects || !projects.length) {
		return <Alert color={'red'}>There are no projects tied to this user.</Alert>;
	}

	const timelines = processUserTimelineProjectsData(
		projects.map((p) => ({ ...p.project })),
		userId,
		false,
		true
	);

	return (
		<Grid>
			<Grid.Col order={matches ? 2 : 1} span={matches ? 12 : 8}>
				<Stack>
					<UserSchedule user_id={userId} />

					<Text color={'dimmed'} my="md" size={'lg'}>
						Timeline view
					</Text>
					<ProjectsTimeline timelines={timelines} />

					<Text color={'dimmed'} my="md" size={'lg'}>
						Collaborations view
					</Text>
					<UserColabs user_id={userId} />
				</Stack>
			</Grid.Col>
			<Grid.Col order={matches ? 1 : 2} span={matches ? 12 : 4}>
				<Stats user_id={userId} />
			</Grid.Col>
		</Grid>
	);
};

export default UserDetail;
