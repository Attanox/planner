import {
	Box,
	Button,
	createStyles,
	Flex,
	Grid,
	Paper,
	RingProgress,
	ScrollArea,
	SimpleGrid,
	Stack,
	Table,
	Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Bar } from '@nivo/bar';
import { useTheme } from '@nivo/core';
import { CustomTick, PageWrapper, SimpleTable } from 'components/shared';
import NetworkDiagram from 'components/Stats/Network';
import { useNavigate } from 'react-router-dom';
import { BREAKPOINTS } from 'utils/constants';
import {
	GetGlobalsStatsQuery,
	KeywordStatistics,
	ResultStatistics,
	Status,
	useGetGlobalsStatsQuery,
	useGetKeywordStatsQuery,
	useGetUsersNetworkQuery,
	useGetUsersUtilizationQuery,
} from 'utils/__generated__/types';
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useMemo,
	useState,
} from 'react';
import { Text as VisText } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

type TContext = { status: Status | ''; keywords: string[] };
type TAPIContext = {
	setStatus: Dispatch<SetStateAction<Status | ''>>;
	setKeywords: Dispatch<SetStateAction<string[]>>;
};
const FiltersContext = createContext<TContext>({ status: '' } as TContext);
const FiltersAPIContext = createContext<TAPIContext>({} as TAPIContext);

const FiltersProvider = ({ children }: PropsWithChildren<{}>) => {
	const [status, setStatus] = useState<Status | ''>('');
	const [keywords, setKeywords] = useState<Array<string>>([]);

	const api = useMemo(
		() => ({
			setStatus,
			setKeywords,
		}),
		[]
	);

	return (
		<FiltersContext.Provider
			value={{
				status,
				keywords,
			}}
		>
			<FiltersAPIContext.Provider value={api}>{children}</FiltersAPIContext.Provider>
		</FiltersContext.Provider>
	);
};

const useFilters = () => useContext(FiltersContext);
const useFiltersAPI = () => useContext(FiltersAPIContext);

const ClearFilters = () => {
	const { status, keywords } = useFilters();
	const { setStatus, setKeywords } = useFiltersAPI();

	const onClearFilters = () => {
		setStatus('');
		setKeywords([]);
	};

	if (!status && keywords.length === 0) return null;

	return (
		<Button onClick={onClearFilters} variant="subtle">
			Clear filters
		</Button>
	);
};

const Ring = ({ segment, name, color }: { color: string; name: string; segment: number }) => {
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);
	const { status } = useFilters();
	const { setStatus } = useFiltersAPI();

	return (
		<RingProgress
			sx={{ margin: '0 auto', cursor: 'pointer' }}
			size={matches ? 100 : 140}
			sections={[{ value: segment, color: color }]}
			onClick={() => setStatus(name.toLowerCase() as Status)}
			label={
				<>
					<Text
						color={color}
						underline={status === name.toLowerCase()}
						weight={400}
						align="center"
						size={matches ? 'xs' : 'sm'}
					>
						{name}
					</Text>
					<Text color={color} weight={700} align="center" size={matches ? 'xs' : 'sm'}>
						{segment}%
					</Text>
				</>
			}
		/>
	);
};

const Rings = ({ statistics }: { statistics: ResultStatistics[] }) => {
	const delayedLength = statistics.filter((c) => c.delayed).length;
	const inProgressLength = statistics.filter((c) => c.in_progress).length;
	const scheduledLength = statistics.filter((c) => c.scheduled).length;

	const total = delayedLength + inProgressLength + scheduledLength;

	if (total === 0) return null;

	const delayedSegment = Number(((delayedLength / total) * 100).toFixed(2));
	const inProgressSegment = Number(((inProgressLength / total) * 100).toFixed(2));
	const scheduledSegment = Number(((scheduledLength / total) * 100).toFixed(2));

	return (
		<SimpleGrid mb="sm" cols={3}>
			{[
				{ segment: inProgressSegment, name: 'In progress', color: '#47d6ab' },
				{ segment: delayedSegment, name: 'Delayed', color: '#4fcdf7' },
				{ segment: scheduledSegment, name: 'Scheduled', color: '#03141a' },
			].map((v) => {
				return <Ring key={v.name} {...v} />;
			})}
		</SimpleGrid>
	);
};

const ResultStats = ({ results }: { results: GetGlobalsStatsQuery['results'] }) => {
	const { status, keywords } = useFilters();

	return (
		<SimpleTable
			head={
				<tr>
					<th>Title</th>
					<th>Status</th>
					<th>Keywords</th>
				</tr>
			}
			body={
				<>
					{results.map((result) => {
						const { id, title, status: sts, tags } = result;

						const row = () => (
							<tr key={id}>
								<td>{title}</td>
								<td>{sts}</td>
								<td>{tags.map((t) => t?.name || '').join(', ')}</td>
							</tr>
						);

						if (status) {
							return sts === status ? row() : null;
						}

						if (keywords.length > 0) {
							const hasTag = tags.some((t) => keywords.includes(t?.name || ''));
							return hasTag ? row() : null;
						}

						return row();
					})}
				</>
			}
		/>
	);
};

const ProjectStats = ({ statistics }: { statistics: ResultStatistics[] }) => {
	return (
		<SimpleTable
			head={
				<tr>
					<th>Title</th>
					<th>Scheduled</th>
					<th>In progress</th>
					<th>Delayed</th>
				</tr>
			}
			body={
				<>
					{statistics.map((stats) => {
						const { delayed, in_progress, scheduled, type } = stats;

						return (
							<tr key={type}>
								<td>{type}</td>
								<td style={{ textAlign: 'right' }}>{scheduled}</td>
								<td style={{ textAlign: 'right' }}>{in_progress}</td>
								<td style={{ textAlign: 'right' }}>{delayed}</td>
							</tr>
						);
					})}
				</>
			}
		/>
	);
};

const Keywords = () => {
	const keywordStatsQuery = useGetKeywordStatsQuery();
	const { keywords } = useFilters();
	const { setKeywords } = useFiltersAPI();

	if (keywordStatsQuery.isLoading || keywordStatsQuery.isError) {
		return <PageWrapper query={keywordStatsQuery} />;
	}
	const words = keywordStatsQuery.data.keywordsStatistics;

	const colors = ['#143059', '#2F6B9A', '#82a6c2'];
	const fontScale = scaleLog({
		domain: [Math.min(...words.map((w) => w.value)) + 1, Math.max(...words.map((w) => w.value))],
		range: [10, 100],
	});
	// ! fontScale(0) = NaN, this causes problems so I added + 1 in domain
	const fontSizeSetter = (datum: KeywordStatistics) => fontScale(datum.value);
	const fixedValueGenerator = () => 0.5;

	return (
		<Box
			sx={{
				'&': {
					border: '1px solid #3e3e3e',
					borderRadius: '2px',
					margin: '0 auto',
					display: 'flex',
					overflowX: 'auto',
					flexDirection: 'column',
					userSelect: 'none',
					'& > svg': {
						margin: '0 auto',
					},
					text: {
						margin: '1rem 0',
						cursor: 'pointer',
					},
				},
			}}
		>
			<Wordcloud
				words={words}
				width={400}
				height={200}
				fontSize={fontSizeSetter}
				font={'Impact'}
				padding={2}
				spiral={'rectangular'}
				rotate={0}
				random={fixedValueGenerator}
			>
				{(cloudWords) => {
					return cloudWords.map((w, i) => (
						<VisText
							key={w.text}
							fill={colors[i % colors.length]}
							textAnchor={'middle'}
							transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
							fontSize={w.size}
							fontFamily={w.font}
							onClick={() => setKeywords((prev) => Array.from(new Set([...prev, w.text!])))}
							style={{
								textDecoration: keywords.includes(w.text!) ? 'underline' : '',
							}}
						>
							{w.text}
						</VisText>
					));
				}}
			</Wordcloud>
		</Box>
	);
};

const UsersUtilization = () => {
	const usersUtilizationQuery = useGetUsersUtilizationQuery();
	const navigate = useNavigate();

	if (usersUtilizationQuery.isLoading || usersUtilizationQuery.isError) {
		return <PageWrapper query={usersUtilizationQuery} />;
	}

	const data = (usersUtilizationQuery.data.usersUtilization || []).map((u) => ({
		user_name: u?.user_name || '',
		user_id: u?.user_id || '',
		overlapping_results: Number(u?.overlapping_results),
	}));

	if (data.length === 0) return null;

	return (
		<Paper withBorder sx={{ height: '300px', overflowX: 'auto', '& rect': { cursor: 'pointer' } }}>
			<Bar
				data={data}
				keys={['overlapping_results']}
				indexBy="user_name"
				width={1200}
				height={250}
				// layout={matches ? 'horizontal' : 'vertical'}
				margin={{ top: 50, right: 180, bottom: 100, left: 60 }}
				padding={0.3}
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={{ scheme: 'nivo' }}
				borderColor={{
					from: 'color',
					modifiers: [['darker', 1.6]],
				}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'User name',
					legendPosition: 'middle',
					legendOffset: 64,
					renderTick: CustomTick,
				}}
				axisLeft={{
					tickSize: 1,
					tickPadding: 5,
					tickRotation: 0,
					tickValues: Array(100)
						.fill(0)
						.map((v, i) => i + 1),
					format: '',
					legend: 'Overlapping results',
					legendPosition: 'middle',
					legendOffset: -40,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from: 'color',
					modifiers: [['darker', 1.6]],
				}}
				legends={[
					{
						dataFrom: 'keys',
						anchor: 'bottom',
						direction: 'column',
						justify: false,
						translateX: 550,
						translateY: 0,
						itemsSpacing: 2,
						itemWidth: 100,
						itemHeight: 20,
						itemDirection: 'left-to-right',
						itemOpacity: 0.85,
						symbolSize: 20,
						effects: [
							{
								on: 'hover',
								style: {
									itemOpacity: 1,
								},
							},
						],
					},
				]}
				role="application"
				ariaLabel="Users utilization"
				barAriaLabel={function (e) {
					return e.formattedValue + ' results of: ' + e.indexValue;
				}}
				onClick={(datum) => {
					navigate(`/users/${datum.data.user_id}`);
				}}
			/>
		</Paper>
	);
};

const UsersCoop = () => {
	const usersNetworkQuery = useGetUsersNetworkQuery();

	if (usersNetworkQuery.isError || usersNetworkQuery.isLoading) {
		return <PageWrapper query={usersNetworkQuery} />;
	}

	const data = {
		links: usersNetworkQuery.data.usersNetwork?.links || [],
		nodes: usersNetworkQuery.data.usersNetwork?.nodes || [],
	};

	return (
		<Paper
			sx={{
				display: 'flex',
				height: '500px',
				justifyContent: 'center',
				overflow: 'auto',
			}}
			withBorder
		>
			<NetworkDiagram data={data} />
		</Paper>
	);
};

const Analytics = () => {
	const globalStatsQuery = useGetGlobalsStatsQuery();
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);

	if (globalStatsQuery.isLoading || globalStatsQuery.isError) {
		return <PageWrapper query={globalStatsQuery} />;
	}

	const { projectsStatistics, results } = globalStatsQuery.data;

	return (
		<Stack>
			<FiltersProvider>
				<Grid>
					<Grid.Col span={matches ? 12 : 6}>
						<Text color={'dimmed'} my="md" size={'lg'}>
							Result Statistics
						</Text>
						<Rings statistics={projectsStatistics} />
					</Grid.Col>
					<Grid.Col span={matches ? 12 : 6}>
						<Text color={'dimmed'} my="md" size={'lg'}>
							Words frequency
						</Text>
						<Keywords />
					</Grid.Col>
				</Grid>
				<Grid>
					{/* - uvodni prehled stavu projektu: in progress, scheduled */}
					<Grid.Col span={matches ? 12 : 6}>
						<Text color={'dimmed'} my="md" size={'lg'}>
							Projects
						</Text>
						<ProjectStats statistics={projectsStatistics} />
					</Grid.Col>
					{/* - misto categories dat vysledky - aktualni stav reseni vysledku - vsechny “in progress” a “delayed” + rozkliknutím grafu vyfiltrovat výsledky v tabulce pod ním */}
					<Grid.Col span={matches ? 12 : 6}>
						<Flex w="100%" align={'center'} justify="space-between">
							<Text color={'dimmed'} my="md" size={'lg'}>
								Results
							</Text>
							<ClearFilters />
						</Flex>
						<ResultStats results={results.filter((r) => r.status !== 'done')} />
					</Grid.Col>
				</Grid>
			</FiltersProvider>
			<Grid>
				<Grid.Col span={12}>
					<Text color={'dimmed'} my="md" size={'lg'}>
						Users utilization
					</Text>
					<UsersUtilization />
				</Grid.Col>
				<Grid.Col span={12}>
					<Text color={'dimmed'} my="md" size={'lg'}>
						Users co-op
					</Text>
					<UsersCoop />
				</Grid.Col>
			</Grid>
		</Stack>
	);
};

export default Analytics;
