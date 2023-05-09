import {
	ActionIcon,
	Box,
	Button,
	Center,
	CopyButton,
	Divider,
	Flex,
	Group,
	HoverCard,
	Popover,
	Portal,
	Stack,
	TextInput,
	Tooltip,
	UnstyledButton,
	useMantineTheme,
} from '@mantine/core';
import {
	IconCheck,
	IconChevronDownRight,
	IconChevronLeft,
	IconChevronRight,
	IconCopy,
	IconSearch,
} from '@tabler/icons';
import moment from 'moment';
import { FormEvent, ReactNode, memo, useMemo, useRef, useState } from 'react';
import Timeline, {
	DateHeader,
	ReactCalendarItemRendererProps,
	SidebarHeader,
	TimelineGroup,
	TimelineHeaders,
	TimelineItemBase,
	TimelineMarkers,
	TodayMarker,
} from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import { useMediaQuery } from '@mantine/hooks';
import { BREAKPOINTS } from 'utils/constants';
import { Link } from 'react-router-dom';
import { decodeResultId } from 'utils/process-data';

const keys = {
	groupIdKey: 'id',
	groupTitleKey: 'title',
	groupRightTitleKey: 'rightTitle',
	itemIdKey: 'id',
	itemTitleKey: 'title',
	itemDivTitleKey: 'title',
	itemGroupKey: 'group',
	itemTimeStartKey: 'start',
	itemTimeEndKey: 'end',
	groupLabelKey: 'title',
};

type TItemBase = TimelineItemBase<any> & {
	bgColor: string;
	color: string;
	users: Array<{ id: string; email: string; name: string }>;
};

const groupRenderer = ({
	group,
}: {
	group: {
		id: number;
		title: string;
		tip: string;
	};
}) => {
	return (
		<div className="custom-group">
			<span className="title">
				<Link style={{ color: '#3a3a3a', textDecoration: 'none' }} to={`/projects/${group.id}`}>
					{group.title}
				</Link>
			</span>
		</div>
	);
};

const ItemRenderer = ({
	item,
	itemContext,
	getItemProps,
}: ReactCalendarItemRendererProps<TItemBase>) => {
	const itemRef = useRef<HTMLDivElement>(null);

	const backgroundColor = item.bgColor;
	const borderColor = item.color;

	const itemProps = getItemProps({
		style: {
			backgroundColor,
			color: item.color,
			borderColor,
			borderStyle: 'solid',
			borderWidth: 1,
			borderRadius: 1,
			borderLeftWidth: 1,
			borderRightWidth: 1,
			cursor: 'default',
		},
	});

	const { className, key, ref, style } = itemProps;
	const strippedItemProps = {
		className,
		key,
		style,
		title: (itemProps as any).title as string,
	};

	return (
		<div ref={itemRef} {...strippedItemProps}>
			<HoverCard
				width="500px"
				onOpen={() => {
					if (itemRef.current?.style.zIndex) {
						itemRef.current.style.zIndex = '82'; // number from library
					}
				}}
				onClose={() => {
					if (itemRef.current?.style.zIndex) {
						itemRef.current.style.zIndex = '80'; // number from library
					}
				}}
				openDelay={200}
				closeDelay={400}
				position="bottom"
				withArrow
				shadow="md"
			>
				<HoverCard.Target>
					<div
						style={{
							height: itemContext.dimensions.height,
							overflow: 'hidden',
							paddingLeft: 3,
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							display: 'flex',
						}}
					>
						{itemContext.title}
					</div>
				</HoverCard.Target>
				<Portal>
					<HoverCard.Dropdown w={'100%'}>
						<Link
							style={{ color: '#3a3a3a', textDecoration: 'none' }}
							to={`/results/${decodeResultId(String(item.id))}`}
						>
							{item.title}
						</Link>

						<Divider my="sm" />

						{item.users.map((u) => {
							return (
								<Flex w={'100%'} justify={'space-between'} align="center" key={u.id}>
									<span onMouseDown={(e) => e.stopPropagation()}>
										<b>{u.name}</b> ({u.email})
									</span>
									<CopyButton value={`${u.name} (${u.email})`} timeout={2000}>
										{({ copied, copy }) => (
											<Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
												<ActionIcon
													onClick={(e: any) => {
														e.stopPropagation();
														copy();
													}}
													color={copied ? 'teal' : 'gray'}
												>
													{copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
												</ActionIcon>
											</Tooltip>
										)}
									</CopyButton>
								</Flex>
							);
						})}
					</HoverCard.Dropdown>
				</Portal>
			</HoverCard>
		</div>
	);
};

interface IProps {
	groups: TimelineGroup<any>[];
	items: TItemBase[];
	toolbar?: ReactNode;
	onItemMove?: (id: string, group: number, newDateBegin: number, newDateEnd: number) => void;
	onItemResize?: (id: string, newDateBegin: number, newDateEnd: number) => void;
}

const AppTimeline = (props: IProps) => {
	const { groups: passedGroups, items: passedItems, toolbar } = props;
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);
	const timeSpan = matches ? 1 : 15;
	const defStart = moment().startOf('day');
	// const defaultTimeStart = defStart.toDate();
	// const defaultTimeEnd = defStart.add(timeSpan, 'weeks').toDate();

	const visibleTimeStart = defStart.valueOf();
	const visibleTimeEnd = defStart.add(timeSpan, 'weeks').valueOf();
	const [visibleTime, setVisibleTime] = useState({ visibleTimeStart, visibleTimeEnd });
	const theme = useMantineTheme();
	const items = useMemo(() => passedItems, []);
	const groups = useMemo(() => passedGroups, []);

	const weekInSecs = 60 * 60 * 1000 * 24 * 7;

	const onPrevClick = () => {
		setVisibleTime((state) => {
			const zoom = state.visibleTimeEnd - state.visibleTimeStart;
			return {
				visibleTimeStart: state.visibleTimeStart - zoom,
				visibleTimeEnd: state.visibleTimeEnd - zoom,
			};
		});
	};
	const onNextClick = () => {
		setVisibleTime((state) => {
			const zoom = state.visibleTimeEnd - state.visibleTimeStart;
			return {
				visibleTimeStart: state.visibleTimeStart + zoom,
				visibleTimeEnd: state.visibleTimeEnd + zoom,
			};
		});
	};
	const onTodayClick = () => {
		setVisibleTime((state) => {
			const zoom = state.visibleTimeEnd - state.visibleTimeStart;
			const today = moment().valueOf();
			return {
				visibleTimeStart: today,
				visibleTimeEnd: today + zoom,
			};
		});
	};

	const onSearchDate = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const data = new FormData(e.target as HTMLFormElement);

		const searchedDate = moment(data.get('search') as string);

		setVisibleTime((state) => {
			const zoom = state.visibleTimeEnd - state.visibleTimeStart;
			const date = searchedDate.valueOf();
			return {
				visibleTimeStart: date,
				visibleTimeEnd: date + zoom,
			};
		});
	};

	return (
		<Box sx={{ '.react-calendar-timeline .rct-dateHeader': { fontSize: '8px' } }}>
			<Group mb="xs" align="flex-end">
				<Group display={'flex'}>
					<ActionIcon onClick={onPrevClick}>
						<IconChevronLeft />
					</ActionIcon>
					<UnstyledButton style={{ fontSize: '12px' }} onClick={onTodayClick}>
						{'Today'}
					</UnstyledButton>
					<ActionIcon onClick={onNextClick}>
						<IconChevronRight />
					</ActionIcon>
				</Group>
				<form onSubmit={onSearchDate}>
					<TextInput
						size="xs"
						label="Search date"
						rightSection={
							<UnstyledButton type="submit">
								<ActionIcon size="sm" variant="filled">
									<IconSearch size="0.85rem" />
								</ActionIcon>
							</UnstyledButton>
						}
						name="search"
						placeholder="Enter a date"
						type={'date'}
					/>
				</form>
				{toolbar ? toolbar : null}
			</Group>
			<Timeline
				groups={groups}
				items={items}
				keys={keys}
				itemTouchSendsClick={false}
				stackItems
				traditionalZoom
				itemHeightRatio={0.75}
				maxZoom={weekInSecs * 52 * 5}
				minZoom={weekInSecs * 4}
				// defaultTimeStart={defaultTimeStart}
				// defaultTimeEnd={defaultTimeEnd}
				visibleTimeStart={visibleTime.visibleTimeStart}
				visibleTimeEnd={visibleTime.visibleTimeEnd}
				itemRenderer={(rendererProps) => <ItemRenderer {...rendererProps} />}
				groupRenderer={groupRenderer}
				onTimeChange={(visibleTimeStart, visibleTimeEnd) =>
					setVisibleTime({ visibleTimeStart, visibleTimeEnd })
				}
			>
				<TimelineHeaders className="sticky">
					<SidebarHeader>
						{({ getRootProps }) => {
							return (
								<Center
									style={{
										...getRootProps().style,
										backgroundColor:
											theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
									}}
								>
									<span></span>
								</Center>
							);
						}}
					</SidebarHeader>
					<DateHeader unit="year" />
					<DateHeader unit="month" labelFormat={'MM'} />
				</TimelineHeaders>
				<TimelineMarkers>
					<TodayMarker date={new Date()}>
						{({ styles, date }) => (
							<div style={{ ...styles, width: '0.125rem', backgroundColor: 'rgba(255,0,0,0.5)' }} />
						)}
					</TodayMarker>
				</TimelineMarkers>
			</Timeline>
		</Box>
	);
};
export default AppTimeline;
