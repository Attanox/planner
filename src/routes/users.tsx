import { Center, Flex, Group, Loader, Switch, Title } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';

import { allUsersQuery } from 'utils/queries';
import { TQueryClient } from 'utils/react-query-client';
import { useGetAllUsersQuery, useGetLoggedUserQuery } from 'utils/__generated__/types';
import { isInThePast, processUserStatus } from 'functions';
import AppTable from 'components/Table';
import User from 'components/User';
import { FetchOverlay, TableLink } from 'components/shared';
import { TData } from 'types';
import { useState } from 'react';

export const loader = (queryClient: TQueryClient) => async () => {
	const query = allUsersQuery();
	// ⬇️ return data or fetch it
	const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

	return data;
};

const Users = () => {
	const { data, isFetching } = useGetAllUsersQuery();
	const { data: loggedUser } = useGetLoggedUserQuery();
	const [showBlocked, setShowBlocked] = useState(false);

	const processedData = (data?.users || [])
		.filter((user) => (showBlocked ? user.block : !user.block))
		.map((user) => {
			const pastProjects = user.projects.filter((project) =>
				isInThePast(new Date(project?.project.date_end))
			).length;
			const currentProjects = user.projects.length - pastProjects;
			return {
				id: String(user.id),
				email: user.email,
				name: user.name,
				status: processUserStatus(user.status),
				projectsLength: String(user.projects.length),
				authorLength: String(user.author.length),
				coauthorLength: String(user.coauthor.length),
				pastProjects: String(pastProjects),
				currentProjects: String(currentProjects),
				updateUser: String(user.id),
				blockUser: user.block,
				removeUser: String(user.id),
			};
		});

	const config: ColumnDef<TData<typeof processedData>>[] = [
		{
			header: 'Name',
			id: 'id',
			accessorKey: 'id',
			cell({ cell, row }) {
				return <TableLink name={row.original.name} to={`/users/${cell.getValue() || ''}`} />;
			},
		},
		{ header: 'e-mail', id: 'email', accessorKey: 'email' },
		{ header: 'Status', id: 'status', accessorKey: 'status' },
		{ header: 'Projects', id: 'projectsLength', accessorKey: 'projectsLength' },
		{ header: 'Current', id: 'currentProjects', accessorKey: 'currentProjects' },
		{ header: 'Realized', id: 'pastProjects', accessorKey: 'pastProjects' },
		{ header: 'Author', id: 'authorLength', accessorKey: 'authorLength' },
		{ header: 'Co-Author', id: 'coauthorLength', accessorKey: 'coauthorLength' },
		{
			header: '',
			accessorKey: 'blockUser',
			id: 'blockUser',
			maxSize: 30,
			cell: ({ cell, row }) => {
				const userIsMe = loggedUser?.me?.id === row.original.id;
				if (userIsMe) return null;
				const alreadyBlocked = Boolean(cell.getValue());
				if (alreadyBlocked) return <User.Unblock id={row.original.id} />;
				return <User.Block id={row.original.id} />;
			},
		},
		{
			header: '',
			accessorKey: 'removeUser',
			id: 'removeUser',
			maxSize: 30,
			cell: ({ cell, row }) => {
				const userIsMe = loggedUser?.me?.id === row.original.id;
				if (userIsMe) return null;
				return <User.Delete id={String(cell.getValue())} />;
			},
		},
	];

	return (
		<>
			<Group mb="sm" position="apart">
				<Title order={1}>Users</Title>
				{loggedUser?.me?.role?.id ? <User.Create /> : null}
			</Group>
			<AppTable isFetching={isFetching} config={config} data={processedData} />
		</>
	);
};

export default Users;
