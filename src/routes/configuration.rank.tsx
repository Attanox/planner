import { ColumnDef } from '@tanstack/react-table';
import Rank from 'components/Rank';
import { PageWrapper } from 'components/shared';
import AppTable from 'components/Table';
import { TData } from 'types';
import { useGetRanksQuery } from 'utils/__generated__/types';

const RankConfiguration = () => {
	const ranksQuery = useGetRanksQuery();

	const processedData = (ranksQuery.data?.ranks || []).map((rank) => {
		return {
			...rank,
			update: String(rank.id),
			remove: String(rank.id),
		};
	});

	const config: ColumnDef<TData<typeof processedData>>[] = [
		{ header: 'Name', id: 'name', accessorKey: 'name' },
		{ header: 'Note', id: 'note', accessorKey: 'note', maxSize: 200 },
		{
			header: '',
			accessorKey: 'update',
			id: 'update',
			cell: ({ row }) => <Rank.Update {...row.original} />,
		},
		{
			header: '',
			accessorKey: 'remove',
			id: 'remove',
			cell: ({ row }) => <Rank.Delete {...row.original} />,
		},
	];

	return (
		<PageWrapper query={ranksQuery}>
			<AppTable height="83vh" toolbar={<Rank.Create />} config={config} data={processedData} />
		</PageWrapper>
	);
};

export default RankConfiguration;
