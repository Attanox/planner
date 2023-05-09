import {
	MainProjectFragment,
	useFilterTimelineProjectsMutation,
	useGetAllProjectsQuery,
	useGetAllUsersQuery,
	useGetLoggedUserQuery,
	useGetTimelineProjectsByUserIdQuery,
	useGetTimelineProjectsQuery,
} from 'utils/__generated__/types';
import {
	ActionIcon,
	Button,
	Center,
	Flex,
	Group,
	Loader,
	MultiSelect,
	Space,
	Switch,
	Text,
	TextInput,
	Title,
	UnstyledButton,
} from '@mantine/core';
import { PageWrapper } from 'components/shared';
import { FormEvent, useRef, useState } from 'react';
import ProjectsTimeline from 'components/Timeline/ProjectsTimeline';
import { processUserTimelineProjectsData } from 'utils/process-data';
import { IconSearch, IconX } from '@tabler/icons';
import Result from 'components/Result';

const Filters = ({
	setTableData,
	setUsersData,
	setGetAll,
	getAll,
	search,
	setSearch,
	resetData,
}: {
	setTableData: React.Dispatch<React.SetStateAction<MainProjectFragment[]>>;
	setUsersData: () => void;
	resetData: () => void;
	setGetAll: (v: boolean) => void;
	getAll: boolean;
	search: string;
	setSearch: (v: string) => void;
}) => {
	const [searchVal, setSearchVal] = useState(search);

	const allTimelineProjectsQuery = useGetTimelineProjectsQuery();
	const filterTimelineMutation = useFilterTimelineProjectsMutation({
		onSuccess(data) {
			console.log(data);
			setTableData(data.filterTimelineProjects);
		},
	});

	const onSearch = (e: FormEvent) => {
		e.preventDefault();
		if (searchVal === '') {
			resetData();
		} else {
			filterTimelineMutation.mutate({ search_text: searchVal || '' });
		}
		setSearch(searchVal);
	};

	const onClear = () => {
		resetData();
		setSearch('');
		setSearchVal('');
	};

	const onSwitch = (getAll: boolean) => {
		setGetAll(getAll);
		if (getAll) {
			if (allTimelineProjectsQuery.data?.projects) {
				setTableData(allTimelineProjectsQuery.data?.projects);
			}
		} else {
			setUsersData();
		}
	};

	return (
		<Group ml="auto" align={'end'} style={{ flex: 1 }}>
			<Switch
				mb="xs"
				size="xs"
				label="All projects"
				defaultChecked={getAll}
				onChange={(e) => onSwitch(e.currentTarget.checked)}
			/>

			<form style={{ flex: '1' }} onSubmit={onSearch}>
				<Flex
					align={'center'}
					sx={
						searchVal
							? {
									'.mantine-TextInput-rightSection': { width: '66px' },
									'.mantine-TextInput-input': { paddingRight: '66px' },
							  }
							: {}
					}
				>
					<TextInput
						size="xs"
						disabled={filterTimelineMutation.isLoading}
						error={filterTimelineMutation.error?.cause}
						rightSection={
							<Group spacing={'xs'}>
								{searchVal ? (
									<ActionIcon
										size="sm"
										loading={filterTimelineMutation.isLoading}
										disabled={filterTimelineMutation.isLoading}
										variant="outline"
										onClick={onClear}
									>
										<IconX size="0.85rem" />
									</ActionIcon>
								) : null}
								<UnstyledButton type="submit">
									<ActionIcon
										size="sm"
										loading={filterTimelineMutation.isLoading}
										disabled={filterTimelineMutation.isLoading}
										variant="filled"
									>
										<IconSearch size="0.85rem" />
									</ActionIcon>
								</UnstyledButton>
							</Group>
						}
						value={searchVal}
						onChange={(e) => setSearchVal(e.target.value)}
						placeholder="Project's or Result's name"
						label="Filter by name"
						w="100%"
					/>
				</Flex>
			</form>
		</Group>
	);
};

const Dashboard = () => {
	const loggedUserQuery = useGetLoggedUserQuery();
	const userId = loggedUserQuery.data?.me?.id || '';
	const [tableData, setTableData] = useState<MainProjectFragment[]>([]);
	const [getAll, setGetAll] = useState(false);
	const searchRef = useRef<string>('');
	const timelineProjects = useGetTimelineProjectsByUserIdQuery(
		{ user_id: userId },
		{
			onSuccess(data) {
				setTableData(data.userProjectByUserId.map((p) => ({ ...p.project })));
			},
			enabled: Boolean(userId),
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		}
	);

	if (timelineProjects.isError || timelineProjects.isLoading)
		return <PageWrapper query={timelineProjects} />;
	if (loggedUserQuery.isError || loggedUserQuery.isLoading)
		return <PageWrapper query={loggedUserQuery} />;

	const timelines = processUserTimelineProjectsData(tableData, userId, getAll);

	return (
		<>
			<Group mb="sm" position="apart">
				<Title order={1}>Dashboard</Title>
				<Result.Create refetch={timelineProjects.refetch} />
			</Group>
			<ProjectsTimeline
				toolbar={
					<Filters
						resetData={() =>
							setTableData(timelineProjects.data.userProjectByUserId.map((p) => ({ ...p.project })))
						}
						setTableData={setTableData}
						search={searchRef.current}
						setSearch={(v) => (searchRef.current = v)}
						getAll={getAll}
						setGetAll={setGetAll}
						setUsersData={() =>
							setTableData(timelineProjects.data.userProjectByUserId.map((p) => ({ ...p.project })))
						}
					/>
				}
				timelines={timelines}
			/>
		</>
	);
};

export default Dashboard;
