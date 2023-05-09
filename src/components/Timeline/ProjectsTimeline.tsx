import { ReactNode } from 'react';
import { TResult } from 'utils/process-data';
import AppTimeline from 'components/Timeline';

const ProjectsTimeline = ({
	timelines: { groups, items },
	toolbar,
}: {
	timelines: TResult;
	toolbar?: ReactNode;
}) => {
	return (
		<div>
			<AppTimeline key={items.length} toolbar={toolbar} groups={groups} items={items as any} />
		</div>
	);
};

export default ProjectsTimeline;
