import { Box, createStyles, Group, Paper, Progress, SimpleGrid, Text } from '@mantine/core';

const useStatsStyles = createStyles((theme) => ({
	progressLabel: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		lineHeight: 1,
		fontSize: theme.fontSizes.sm,
	},

	stat: {
		borderBottom: '3px solid',
		paddingBottom: 5,
	},

	statCount: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		lineHeight: 1.3,
	},

	diff: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		display: 'flex',
		alignItems: 'center',
	},

	icon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
	},
}));

interface StatsSegmentsProps {
	total: number;
	title: string;
	data: {
		label: string;
		count: number;
		part: number;
		color: string;
	}[];
}

export function StatsSegments({ total, title, data }: StatsSegmentsProps) {
	const { classes } = useStatsStyles();

	const segments = data.map((segment) => ({
		value: Number((segment.part * 100).toFixed(2)),
		color: segment.color,
		label: `${(segment.part * 100).toFixed(2)}%`,
	}));

	const descriptions = data.map((stat) => (
		<Box key={stat.label} sx={{ borderBottomColor: stat.color }} className={classes.stat}>
			<Text transform="uppercase" size="xs" color="dimmed" weight={700}>
				{stat.label}
			</Text>

			<Group position="apart" align="flex-end" spacing={0}>
				<Text weight={700}>{stat.count}</Text>
				<Text color={stat.color} weight={700} size="sm" className={classes.statCount}>
					{(stat.part * 100).toFixed(2)}%
				</Text>
			</Group>
		</Box>
	));

	return (
		<Paper w="100%" withBorder p="md" radius="md">
			<Text size="xl" weight={700}>
				{total}
			</Text>
			<Text color="dimmed" size="sm">
				{title}
			</Text>

			<Progress
				sections={segments}
				size={34}
				classNames={{ label: classes.progressLabel }}
				mt={40}
			/>
			<SimpleGrid cols={3} breakpoints={[{ maxWidth: 'xs', cols: 1 }]} mt="xl">
				{descriptions}
			</SimpleGrid>
		</Paper>
	);
}
