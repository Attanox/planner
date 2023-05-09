import { Alert, Grid, Group, Space, Text, Timeline, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import Milestone from 'components/Milestone';
import Project from 'components/Project';
import Result from 'components/Result';
import { DetailArea, PageWrapper } from 'components/shared';
import NetworkDiagram from 'components/Stats/Network';
import AppTable from 'components/Table';
import User from 'components/User';
import { getDate, isInThePast, sortDateAsc } from 'functions';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TData } from 'types';
import { BREAKPOINTS } from 'utils/constants';
import {
	TableResultFragment,
	useGetProjectDetailQuery,
	useGetProjectUsersNetworkQuery,
} from 'utils/__generated__/types';

const Milestones = () => {
	const { projectId } = useParams();
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);
	const [passedMilestones, setPassedMilestones] = useState(0);
	const projectDetailQuery = useGetProjectDetailQuery(
		{ id: projectId || '' },
		{
			enabled: Boolean(projectId),
			onSuccess(data) {
				const dateBegin = data.projectById?.date_begin;
				const dateEnd = data.projectById?.date_end;
				const milestones = (data.projectById?.milestones || []).map((m) => m?.date);
				let passed = 0;
				[dateBegin, ...milestones, dateEnd].forEach((d) => {
					if (isInThePast(new Date(d))) passed += 1;
				});
				setPassedMilestones(passed);
			},
		}
	);

	if (!projectId) {
		return <Alert color={'red'}>Missing result ID.</Alert>;
	}

	if (projectDetailQuery.isLoading || projectDetailQuery.isError) {
		return <PageWrapper query={projectDetailQuery} />;
	}

	const {
		data: { projectById },
	} = projectDetailQuery;
	const milestones = (projectById?.milestones || []).map((milestone) => ({
		id: String(milestone?.id),
		date: milestone?.date,
		description: milestone?.description,
		name: milestone?.name,
		updateMilestone: String(milestone?.id),
		removeMilestone: String(milestone?.id),
	}));

	const milestonesConfig: ColumnDef<TData<typeof milestones>>[] = [
		{
			header: 'Date',
			id: 'date',
			accessorKey: 'date',
			cell: ({ cell }) => <>{`${getDate(cell.getValue())}`}</>,
		},
		{
			header: 'Name',
			accessorKey: 'updateMilestone',
			id: 'updateMilestone',
			cell: ({ cell, row }) => {
				return (
					<Milestone.Update
						name={row.original.name || ''}
						maxDate={new Date(projectById?.date_end)}
						minDate={new Date(projectById?.date_begin)}
						milestone_id={String(cell.getValue())}
						refetch={projectDetailQuery.refetch}
						project_id={projectId}
					/>
				);
			},
		},
		{ header: 'Description', id: 'description', accessorKey: 'description' },
		{
			header: '',
			accessorKey: 'removeMilestone',
			id: 'removeMilestone',
			maxSize: 30,
			cell: ({ cell, row }) => {
				return (
					<Milestone.Delete
						project_id={projectId}
						refetch={projectDetailQuery.refetch}
						name={row.original.name || ''}
						id={String(cell.getValue())}
					/>
				);
			},
		},
	];

	return (
		<>
			<Grid.Col span={matches ? 12 : 8}>
				<Title mb="sm" order={2} size="h4">
					Project timeline
				</Title>
				<AppTable
					config={milestonesConfig}
					data={milestones}
					height="auto"
					minWidth={0}
					toolbar={
						<Milestone.Create
							maxDate={new Date(projectById?.date_end)}
							minDate={new Date(projectById?.date_begin)}
							refetch={projectDetailQuery.refetch}
							project_id={projectId}
						/>
					}
				/>
			</Grid.Col>
			<Grid.Col span={matches ? 12 : 4}>
				<Timeline mt="lg" active={passedMilestones - 1}>
					<Timeline.Item title="Project's start" bulletSize={24}>
						<Text color="dimmed" size="sm">
							{getDate(projectById?.date_begin)}
						</Text>
					</Timeline.Item>
					{[
						...milestones,
						{ id: 'project_s_end', name: "Project's end", date: projectById?.date_end },
					]
						.sort((a, b) => sortDateAsc(a.date, b.date))
						.map((m) => {
							return (
								<Timeline.Item
									bulletSize={m.id === 'project_s_end' ? 24 : 20}
									title={m.name}
									key={m.id}
								>
									<Text color="dimmed" size="sm">
										{getDate(m?.date)}
									</Text>
								</Timeline.Item>
							);
						})}
				</Timeline>
			</Grid.Col>
		</>
	);
};

const ProjectUsers = () => {
	const { projectId } = useParams();
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);

	const projectDetailQuery = useGetProjectDetailQuery(
		{ id: projectId || '' },
		{
			enabled: Boolean(projectId),
		}
	);

	if (!projectId) {
		return <Alert color={'red'}>Missing result ID.</Alert>;
	}

	if (projectDetailQuery.isLoading || projectDetailQuery.isError) {
		return <PageWrapper query={projectDetailQuery} />;
	}

	const {
		data: { projectById },
	} = projectDetailQuery;

	const projectUsers = (projectById?.users || []).map((user) => ({
		id: String(user?.user.id),
		email: user?.user.email,
		name: user?.user.name,
		removeUserProject: String(user?.id),
	}));

	const projectUsersConfig: ColumnDef<TData<typeof projectUsers>>[] = [
		{ header: 'Name', id: 'name', accessorKey: 'name', maxSize: 150 },
		{ header: 'E-mail', id: 'email', accessorKey: 'email', maxSize: 200 },
		{
			header: '',
			accessorKey: 'removeUserProject',
			id: 'removeUserProject',
			maxSize: 30,
			cell: ({ cell, row }) => {
				return (
					<User.RemoveFromProject
						project_id={projectId}
						refetch={projectDetailQuery.refetch}
						email={row.original.email || ''}
						name={row.original.name || ''}
						user_project_id={String(cell.getValue())}
					/>
				);
			},
		},
	];

	return (
		<Grid.Col mt="sm" span={matches ? 12 : 6}>
			<Title mb="sm" order={2} size="h4">
				Project Investigators
			</Title>
			<AppTable
				config={projectUsersConfig}
				data={projectUsers}
				height="auto"
				minWidth={0}
				toolbar={<User.AddToProject refetch={projectDetailQuery.refetch} project_id={projectId} />}
			/>
		</Grid.Col>
	);
};

const ProjectStats = () => {
	const { projectId } = useParams();
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);
	const projectDetailQuery = useGetProjectDetailQuery(
		{ id: projectId || '' },
		{
			enabled: Boolean(projectId),
		}
	);

	if (!projectId) {
		return <Alert color={'red'}>Missing result ID.</Alert>;
	}

	if (projectDetailQuery.isLoading || projectDetailQuery.isError) {
		return <PageWrapper query={projectDetailQuery} />;
	}

	const {
		data: { projectById },
	} = projectDetailQuery;

	return (
		<DetailArea span={matches ? 12 : 6}>
			<Group align={'flex-start'} noWrap>
				<div
					style={{
						marginTop: '10px',
						minWidth: '20px',
						minHeight: '20px',
						borderRadius: '50%',
						backgroundColor: `#${projectById?.color.hex}`,
					}}
				/>
				<Title order={1} size="h3">
					{projectById?.name} ({projectById?.short_name})
				</Title>
				<Space ml="auto" />
				<Project.Update id={projectId} />
			</Group>
			{/* <Space h="md" /> */}
			<Text mt="md" size={'sm'}>
				Main investigator is <b>{projectById?.solver.name}</b> (
				<a href={`mailto:${projectById?.solver.email}`}>{projectById?.solver.email}</a>)
			</Text>
			<Text mt="md" size={'sm'}>
				Code of the project is <b>{projectById?.code}</b>
			</Text>
			<Text mt="md" size={'sm'}>
				Starts <b>{getDate(projectById?.date_begin)}</b>
			</Text>
			<Text mt="md" size={'sm'}>
				Ends <b>{getDate(projectById?.date_end)}</b>
			</Text>
		</DetailArea>
	);
};

const ProjectResults = () => {
	const { projectId } = useParams();

	const projectDetailQuery = useGetProjectDetailQuery(
		{ id: projectId || '' },
		{
			enabled: Boolean(projectId),
		}
	);

	if (!projectId) {
		return <Alert color={'red'}>Missing result ID.</Alert>;
	}

	if (projectDetailQuery.isLoading || projectDetailQuery.isError) {
		return <PageWrapper query={projectDetailQuery} />;
	}

	const {
		data: { projectById },
	} = projectDetailQuery;

	const results = (projectById?.results || []).map((r) =>
		r ? r.result : null
	) as TableResultFragment[];

	return (
		<Grid.Col span={12}>
			<Title mb="sm" order={2} size="h4">
				Project results
			</Title>
			<Result.List results={results} refetch={projectDetailQuery.refetch} height="auto" />
		</Grid.Col>
	);
};

const ProjectsUsersNetwork = () => {
	const { projectId } = useParams();

	const usersNetworkQuery = useGetProjectUsersNetworkQuery(
		{ project_id: projectId || '' },
		{
			enabled: Boolean(projectId),
		}
	);

	if (!projectId) {
		return <Alert color={'red'}>Missing result ID.</Alert>;
	}

	if (usersNetworkQuery.isError || usersNetworkQuery.isLoading) {
		return (
			<Grid.Col>
				<PageWrapper query={usersNetworkQuery} />
			</Grid.Col>
		);
	}

	const data = {
		links: usersNetworkQuery.data.projectUsersNetwork?.links || [],
		nodes: usersNetworkQuery.data.projectUsersNetwork?.nodes || [],
	};

	return (
		<Grid.Col span={12}>
			<Title mb="sm" order={2} size="h4">
				Users collaborations
			</Title>
			<NetworkDiagram data={data} />
		</Grid.Col>
	);
};

const ProjectDetail = () => {
	const { projectId } = useParams();

	const projectDetailQuery = useGetProjectDetailQuery(
		{ id: projectId || '' },
		{
			enabled: Boolean(projectId),
		}
	);

	if (!projectId) {
		return <Alert color={'red'}>Missing result ID.</Alert>;
	}

	if (projectDetailQuery.isLoading || projectDetailQuery.isError) {
		return <PageWrapper query={projectDetailQuery} />;
	}

	return (
		<Grid gutter={45}>
			<ProjectStats />

			<ProjectUsers />

			<Milestones />

			<ProjectResults />

			<ProjectsUsersNetwork />
		</Grid>
	);
};

export default ProjectDetail;
