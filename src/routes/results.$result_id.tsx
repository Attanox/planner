import {
	Alert,
	Center,
	Grid,
	Group,
	Loader,
	Space,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import CoAuthor from 'components/CoAuthor';
import Phase from 'components/Phase';
import Result from 'components/Result';
import { DetailArea, FullscreenLoader, PageWrapper } from 'components/shared';
import AppTable from 'components/Table';
import { getDate } from 'functions';
import { useParams } from 'react-router-dom';
import { TData } from 'types';
import { useGetLoggedUserQuery, useGetResultDetailQuery } from 'utils/__generated__/types';

const ResultDetail = () => {
	const { resultId } = useParams();
	const loggedUserQuery = useGetLoggedUserQuery();

	const resultDetailQuery = useGetResultDetailQuery(
		{ id: resultId || '' },
		{
			enabled: Boolean(resultId),
		}
	);

	if (!resultId) {
		return <Alert color={'red'}>Missing result ID.</Alert>;
	}

	if (resultDetailQuery.isLoading || resultDetailQuery.isError) {
		return <PageWrapper query={resultDetailQuery} />;
	}
	if (loggedUserQuery.isLoading || loggedUserQuery.isError) {
		return <PageWrapper query={loggedUserQuery} />;
	}

	const {
		data: { resultById },
	} = resultDetailQuery;

	const coauthors = (resultById?.coauthors || []).map((coauthor) => ({
		id: String(coauthor?.user.id),
		email: coauthor?.user.email,
		name: coauthor?.user.name,
		removeCoauthor: String(coauthor?.user.id),
	}));

	const coAuthorConfig: ColumnDef<TData<typeof coauthors>>[] = [
		{ header: 'Name', id: 'name', accessorKey: 'name' },
		{ header: 'E-mail', id: 'email', accessorKey: 'email' },
		{
			header: '',
			accessorKey: 'removeCoauthor',
			id: 'removeCoauthor',
			cell: ({ cell, row }) => {
				return (
					<CoAuthor.Delete
						name={row.original.name || ''}
						email={row.original.email || ''}
						id={String(cell.getValue())}
						refetch={resultDetailQuery.refetch}
					/>
				);
			},
		},
	];

	const phases = (resultById?.phases || []).map((phase) => ({
		id: phase?.id,
		name: phase?.name,
		desc: phase?.description,
		date_begin: phase?.date_begin,
		date_end: phase?.date_end,
		users: phase?.users.map((u) => u?.user.name).join(', '),
		involveUsers: phase?.id,
		editPhase: phase?.id,
		removePhase: String(phase?.id),
	}));
	const phasesConfig: ColumnDef<TData<typeof phases>>[] = [
		{ header: 'Name', id: 'name', accessorKey: 'name' },
		{ header: 'Description', id: 'desc', accessorKey: 'desc' },
		{
			header: 'Beginning',
			id: 'date_begin',
			accessorKey: 'date_begin',
			cell: ({ cell }) => <>{`${getDate(cell.getValue())}`}</>,
		},
		{
			header: 'End',
			id: 'date_end',
			accessorKey: 'date_end',
			cell: ({ cell }) => <>{`${getDate(cell.getValue())}`}</>,
		},
		{ header: 'Users', id: 'users', accessorKey: 'users' },
		{
			header: '',
			accessorKey: 'involveUsers',
			id: 'involveUsers',
			cell: ({ cell, row }) => {
				return (
					<Phase.InvolveUsers
						project_id={resultDetailQuery.data.resultById?.projects[0]?.project.id || ''}
						phase_id={String(cell.getValue())}
						result_id={resultId}
						date_begin={new Date(row.original?.date_begin)}
						date_end={new Date(row.original?.date_end)}
						refetch={resultDetailQuery.refetch}
					/>
				);
			},
		},
		{
			header: '',
			accessorKey: 'editPhase',
			id: 'editPhase',
			cell: ({ cell, row }) => {
				return (
					<Phase.Update
						phase_id={String(cell.getValue())}
						result_id={resultId}
						refetch={resultDetailQuery.refetch}
					/>
				);
			},
		},
		{
			header: '',
			accessorKey: 'removePhase',
			id: 'removePhase',
			cell: ({ cell, row }) => {
				return (
					<Phase.Delete
						name={row.original.name || ''}
						phase_id={String(cell.getValue())}
						refetch={resultDetailQuery.refetch}
					/>
				);
			},
		},
	];

	const { id: loggedUserId } = loggedUserQuery.data.me || { id: '' };
	const canUpdate = loggedUserId === resultById?.author.id || loggedUserQuery.data.me?.role?.id;

	return (
		<Grid gutter={45}>
			<DetailArea span={6}>
				<Group w={'100%'} align="flex-start" position="apart" noWrap>
					<Title order={1}>{resultById?.title}</Title>
					{canUpdate ? <Result.Update id={resultId} /> : null}
				</Group>
				<Space h="xs" />
				<Title order={2} size={'h4'} c="dimmed">
					{resultById?.comment}
				</Title>
				<Space h="md" />
				<Group sx={{ display: 'flex', alignItems: 'center' }}>
					<Text size={'sm'}>
						Created by <b>{resultById?.author.name}</b> (
						<a href={`mailto:${resultById?.author.email}`}>{resultById?.author.email}</a>)
					</Text>
				</Group>
				<Text mt="md" size={'sm'}>
					Currently <b>{resultById?.status}</b>
				</Text>
				<Text mt="md" size={'sm'}>
					Of publication type <b>{resultById?.type.name}</b>
				</Text>
				<Text mt="md" size={'sm'}>
					Belongs to project <b>{resultById?.projects[0]?.project.name}</b>
				</Text>
				{resultById?.resultCategory?.acronym && (
					<Text mt="md" size={'sm'}>
						Journal/Venue <b>{resultById?.resultCategory?.acronym}</b>
					</Text>
				)}
			</DetailArea>
			<Grid.Col span={12}>
				<AppTable
					config={coAuthorConfig}
					data={coauthors}
					height="auto"
					toolbar={
						<CoAuthor.Create
							project_id={resultDetailQuery.data.resultById?.projects[0]?.project.id || ''}
							id={resultId}
							refetch={resultDetailQuery.refetch}
						/>
					}
				/>
			</Grid.Col>
			<Grid.Col span={12}>
				<Space h="lg" />
				<Space h="lg" />
				<Space h="lg" />
			</Grid.Col>
			<Grid.Col span={12}>
				<AppTable
					config={phasesConfig}
					data={phases}
					height="auto"
					toolbar={<Phase.Create result_id={resultId} refetch={resultDetailQuery.refetch} />}
				/>
			</Grid.Col>
		</Grid>
	);
};

export default ResultDetail;
