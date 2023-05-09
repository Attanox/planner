import { ColumnDef } from '@tanstack/react-table';
import ResultCategory from 'components/ResultCategory';
import { PageWrapper } from 'components/shared';
import AppTable from 'components/Table';
import { TData } from 'types';
import { useGetResultCategoriesQuery } from 'utils/__generated__/types';

const ResultCategoryConfiguration = () => {
	const resultCategoriesQuery = useGetResultCategoriesQuery();

	const processedData = (resultCategoriesQuery.data?.resultCategories || []).map(
		(resultCategory) => {
			return {
				...resultCategory,
				rankName: resultCategory.rank.name,
				update: String(resultCategory.id),
				remove: String(resultCategory.id),
			};
		}
	);

	const config: ColumnDef<TData<typeof processedData>>[] = [
		{ header: 'Acronym', id: 'acronym', accessorKey: 'acronym' },
		{ header: 'Note', id: 'note', accessorKey: 'note' },
		{ header: 'URL', id: 'url', accessorKey: 'url' },
		{ header: 'Rank', id: 'rankName', accessorKey: 'rankName' },
		{ header: 'Type', id: 'type', accessorKey: 'type' },
		{
			header: '',
			accessorKey: 'update',
			id: 'update',
			cell: ({ row }) => <ResultCategory.Update {...row.original} />,
		},
		{
			header: '',
			accessorKey: 'remove',
			id: 'remove',
			cell: ({ row }) => <ResultCategory.Delete {...row.original} />,
		},
	];

	return (
		<PageWrapper query={resultCategoriesQuery}>
			<AppTable
				height="83vh"
				toolbar={<ResultCategory.Create />}
				config={config}
				data={processedData}
				isFetching={resultCategoriesQuery.isFetching}
			/>
		</PageWrapper>
	);
};

export default ResultCategoryConfiguration;
