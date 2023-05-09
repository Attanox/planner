import { SegmentedControl, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { BREAKPOINTS } from 'utils/constants';

const LINKS = [
	{ label: 'Venues and Journals', value: 'result-category' },
	{ label: 'Journal/Conference Ranks', value: 'rank' },
	{ label: 'Publication Types', value: 'type' },
];

const useCurrentNavSegment = () => {
	const { pathname } = useLocation();
	const [current, setCurrent] = useState(LINKS[0].value);

	useEffect(() => {
		setCurrent(pathname.replace('/configuration/', ''));
	}, [pathname]);

	return { current };
};

const Configuration = () => {
	const navigate = useNavigate();
	const { current } = useCurrentNavSegment();
	const matches = useMediaQuery(`(max-width: ${BREAKPOINTS.sm}px)`);

	return (
		<Stack>
			<SegmentedControl
				data={LINKS}
				value={current}
				onChange={(v) => navigate(v)}
				fullWidth
				orientation={matches ? 'vertical' : 'horizontal'}
				transitionDuration={500}
				transitionTimingFunction="linear"
			/>
			<Outlet />
		</Stack>
	);
};

export default Configuration;
