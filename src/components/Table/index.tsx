import { ReactNode, useMemo, useState } from 'react';
import { Table, ScrollArea, Pagination, Space, Flex, Center } from '@mantine/core';
import { useStyles } from './styles';
import {
	type ColumnDef,
	type ColumnFiltersState,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	getPaginationRowModel,
	getSortedRowModel,
	flexRender,
} from '@tanstack/react-table';
import { IconChevronDown, IconChevronUp } from '@tabler/icons';
import { useMediaQuery } from '@mantine/hooks';
import { BREAKPOINTS } from 'utils/constants';
import { FetchOverlay } from 'components/shared';

interface AppTableProps<T> {
	data: T[];
	config: ColumnDef<T>[];
	toolbar?: ReactNode;
	height?: string;
	isFetching?: boolean;
	minWidth?: number;
}

const PAGE_SIZE = 20;

const AppTable = <T extends unknown>({
	data,
	config,
	toolbar,
	height = '90vh',
	isFetching = false,
	minWidth = 700,
}: AppTableProps<T>) => {
	const { classes, cx } = useStyles();
	const [scrolled, setScrolled] = useState(false);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState('');
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);

	const columns = useMemo(() => config, []);

	const table = useReactTable({
		data,
		columns,
		// filterFns: {

		// },
		state: {
			columnFilters,
			globalFilter,
		},
		initialState: {
			pagination: {
				pageSize: PAGE_SIZE,
			},
		},
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		// globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		autoResetPageIndex: false,
		debugTable: false,
		debugHeaders: false,
		debugColumns: false,
	});

	const tableHeight = height === 'auto' && data.length > 15 ? `650px` : height;

	return (
		<>
			<FetchOverlay isFetching={isFetching} />
			<Center sx={{ display: 'flex', flexDirection: 'column', height: tableHeight }}>
				<ScrollArea
					sx={{ height: '100%', width: '100%', margin: '0 auto' }}
					onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
				>
					<Table sx={{ minWidth, width: '100%' }}>
						<thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map((header) => {
										return (
											<th
												key={header.id}
												colSpan={header.colSpan}
												style={{
													width: header.getSize(),
												}}
											>
												{header.isPlaceholder ? null : (
													<>
														<div
															{...{
																className: header.column.getCanSort()
																	? 'cursor-pointer select-none'
																	: '',
																onClick: header.column.getToggleSortingHandler(),
															}}
														>
															{flexRender(header.column.columnDef.header, header.getContext())}
															{{
																asc: (
																	<>
																		<IconChevronUp />
																	</>
																),
																desc: (
																	<>
																		<IconChevronDown />
																	</>
																),
															}[header.column.getIsSorted() as string] ?? null}
														</div>
														{header.column.getCanFilter() ? (
															<div>{/* <Filter column={header.column} table={table} /> */}</div>
														) : null}
													</>
												)}
											</th>
										);
									})}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => {
								return (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											const c = cell.column.columnDef.cell;

											return (
												<td key={cell.id}>
													{flexRender(cell.column.columnDef.cell, cell.getContext())}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</Table>
				</ScrollArea>
				<Space h={'md'} />
				<Flex
					w={'100%'}
					direction={matches ? 'column' : 'row'}
					justify={toolbar ? 'space-between' : 'flex-end'}
				>
					{toolbar ? toolbar : null}

					{matches ? <Space h="xs" /> : null}

					<Pagination
						total={Math.ceil(data.length / PAGE_SIZE)}
						onChange={(page) => table.setPageIndex(page - 1)}
						page={table.getState().pagination.pageIndex + 1}
						size="sm"
						radius="xs"
						withEdges
						noWrap
					/>
				</Flex>
			</Center>
		</>
	);
};

export default AppTable;
