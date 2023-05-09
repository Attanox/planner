import { ColumnDef } from '@tanstack/react-table';
import { PageWrapper } from 'components/shared';
import AppTable from 'components/Table';
import Type from 'components/Type';
import React from 'react';
import { TData } from 'types';
import { useGetTypesQuery } from 'utils/__generated__/types';

const TypeConfiguration = () => {
	const typesQuery = useGetTypesQuery();

	const processedData = (typesQuery.data?.types || []).map((type) => {
		return {
			...type,
			// color: `#${category.categoryColor.hex}`,
			update: String(type.id),
			remove: String(type.id),
		};
	});

	const config: ColumnDef<TData<typeof processedData>>[] = [
		{ header: 'Acronym', id: 'name', accessorKey: 'name' },
		{ header: 'Description', id: 'description', accessorKey: 'description' },
		{
			header: '',
			accessorKey: 'update',
			id: 'update',
			cell: ({ row }) => <Type.Update {...row.original} />,
		},
		{
			header: '',
			accessorKey: 'remove',
			id: 'remove',
			cell: ({ row }) => <Type.Delete {...row.original} />,
		},
	];

	return (
		<PageWrapper query={typesQuery}>
			<AppTable height="83vh" toolbar={<Type.Create />} config={config} data={processedData} />
		</PageWrapper>
	);
};

export default TypeConfiguration;
