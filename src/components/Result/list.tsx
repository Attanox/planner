import { ColumnDef } from '@tanstack/react-table';

import Result from 'components/Result';
import { TableLink } from 'components/shared';
import AppTable from 'components/Table';
import { getDate, sortDateAsc, sortDateDesc } from 'functions';
import { TData } from 'types';
import { TableResultFragment, useGetLoggedUserQuery } from 'utils/__generated__/types';

const List = ({
	results,
	loggedUserId,
	refetch,
	height,
	isFetching = false,
}: {
	results: TableResultFragment[];
	loggedUserId: string;
	refetch: () => void;
	height?: string;
	isFetching?: boolean;
}) => {
	const processedData = (results || []).map((result) => {
		const earliestPhase = result.phases.sort((a, b) =>
			sortDateAsc(a?.date_begin, b?.date_begin)
		)[0];
		const latestPhase = result.phases.sort((a, b) => sortDateDesc(a?.date_end, b?.date_end))[0];

		return {
			id: String(result.id),
			title: result.title,
			status: result.status,
			type: result.type.name,
			updateResult: String(result.id),
			removeResult: String(result.id),
			dateBegin: earliestPhase ? getDate(earliestPhase.date_begin) : '',
			dateEnd: latestPhase ? getDate(latestPhase.date_end) : '',
			isAuthor: result.author.id === loggedUserId,
			isCoauthor: result.coauthors.map((c) => c?.id).includes(loggedUserId),
		};
	});
	const config: ColumnDef<TData<typeof processedData>>[] = [
		{
			header: 'Title',
			id: 'title',
			accessorKey: 'title',
			cell: ({ cell, row }) => {
				return <TableLink name={`${cell.getValue()}`} to={`/results/${row.original.id}`} />;
			},
		},
		{ header: 'Type', id: 'type', accessorKey: 'type', maxSize: 110 },
		{ header: 'Status', id: 'status', accessorKey: 'status', maxSize: 110 },
		{ header: 'Starts', id: 'dateBegin', accessorKey: 'dateBegin', maxSize: 110 },
		{ header: 'Ends', id: 'dateEnd', accessorKey: 'dateEnd', maxSize: 110 },
		{
			header: '',
			accessorKey: 'removeResult',
			id: 'removeResult',
			maxSize: 30,
			cell: ({ cell, row }) => {
				const loggedUser = useGetLoggedUserQuery();
				const isAdmin = Boolean(loggedUser.data?.me?.role?.id);
				const canRemove = row.original.isAuthor || isAdmin;
				if (!canRemove) return null;
				return <Result.Delete id={String(cell.getValue())} />;
			},
		},
	];

	return <AppTable isFetching={isFetching} config={config} data={processedData} height={height} />;
};

export default List;
