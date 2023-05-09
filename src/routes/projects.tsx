import { useGetAllProjectsQuery, useGetLoggedUserQuery } from '../utils/__generated__/types';
import { ColumnDef } from '@tanstack/react-table';

import AppTable from 'components/Table';
import { TData } from 'types';
import Project from 'components/Project';
import { PageWrapper, TableLink } from 'components/shared';
import { IconCheck } from '@tabler/icons';
import { Group, Title } from '@mantine/core';

const Projects = () => {
	const projects = useGetAllProjectsQuery();
	const loggedUser = useGetLoggedUserQuery();

	if (projects.isError) {
		return <PageWrapper query={projects} />;
	}
	if (loggedUser.isLoading || loggedUser.isError) {
		return <PageWrapper query={loggedUser} />;
	}

	const processedData = (projects.data?.projects || []).map((project) => {
		return {
			id: String(project.id),
			acronym: String(project.short_name),
			isManager: project.solver.id === loggedUser.data.me?.id,
			color: project.color.hex,
			name: project.name,
			updateProject: String(project.id),
			removeProject: String(project.id),
		};
	});

	const config: ColumnDef<TData<typeof processedData>>[] = [
		{
			header: 'Acronym',
			id: 'acronym',
			accessorKey: 'acronym',
			cell: ({ cell, row }) => (
				<TableLink name={String(cell.getValue())} to={`/projects/${row.original.id}`} />
			),
		},
		{
			header: 'Color',
			id: 'color',
			accessorKey: 'color',
			cell: ({ cell }) =>
				cell.getValue() ? (
					<div
						style={{
							width: '20px',
							height: '20px',
							borderRadius: '50%',
							backgroundColor: `#${cell.getValue()}`,
						}}
					/>
				) : (
					''
				),
		},
		{
			header: 'Managing',
			id: 'isManager',
			accessorKey: 'isManager',
			cell: ({ cell }) =>
				cell.getValue() ? (
					<div style={{ paddingLeft: '20px' }}>
						<IconCheck size={16} />
					</div>
				) : (
					''
				),
		},
		{ header: 'Name', id: 'name', accessorKey: 'name' },
		{
			header: '',
			accessorKey: 'removeProject',
			id: 'removeProject',
			maxSize: 30,
			cell: ({ cell }) => <Project.Delete id={String(cell.getValue())} />,
		},
	];

	return (
		<>
			<Group mb="sm" position="apart">
				<Title order={1}>Projects</Title>
				<Project.Create />
			</Group>
			<AppTable
				isFetching={projects.isFetching}
				toolbar={<Project.Create />}
				config={config}
				data={processedData}
			/>
		</>
	);
};

export default Projects;
