import moment from 'moment';
import { MainProjectFragment } from './__generated__/types';

export type TItem = {
	id: string | undefined;
	group: string | undefined;
	title: string | undefined;
	start: number;
	end: number;
	className: string;
	bgColor: string | undefined;
	color: string;
};

export type TGroup = {
	id: string;
	title: string;
	bgColor: string;
};

const CONNECTOR = '-';

const encodeResultId = (resultId: string, projectId: string, resultProjectId: string) => {
	return `${resultId}${CONNECTOR}${projectId}${CONNECTOR}${resultProjectId}`;
};

export const decodeResultId = (encodedId: string) => {
	return encodedId.split(CONNECTOR)[0];
};

export const decodeResultProjectId = (encodedId: string) => {
	return encodedId.split(CONNECTOR)[2];
};

export type TResult = {
	items: TItem[];
	groups: TGroup[];
};

export const processUserTimelineProjectsData = (
	projects: MainProjectFragment[],
	userId: string,
	getAll = false,
	justInvolved = false
): TResult => {
	const result: TResult = {
		items: [],
		groups: [],
	};

	result.groups = projects.map((project) => ({
		id: project.id || '',
		title: project.short_name || '',
		bgColor: '#' + project.color.hex,
	}));

	projects.map((project) => {
		project.results.forEach((r) => {
			if (!r?.result) return;

			const isAuthor = r.result.author.id === userId;
			const isCoauthor = r.result.coauthors.map((c) => c?.id).includes(userId);
			const isInvolved = !!r.result.phases
				.map((p) => p?.users.find((u) => u?.user.id === userId))
				.filter(Boolean).length;
			const collaborated = isAuthor || isCoauthor || isInvolved;

			if (!getAll && !collaborated) return;
			if (justInvolved && !isInvolved) return;

			r.result.phases.map((phase) => {
				const startValue = moment(phase?.date_begin)
					.set({ hours: 0, minutes: 0, seconds: 0 })
					.valueOf();

				const endValue = moment(phase?.date_end)
					.set({ hours: 23, minutes: 59, seconds: 59 })
					.valueOf();

				const newItem = {
					id: encodeResultId(r.result.id, project.id, phase?.id || ''),
					group: project.id,
					title: `${phase?.name} (${r.result.title})`,
					start: startValue,
					end: endValue,
					className: '',
					users: phase?.users.map((u) => ({
						id: u?.user.id,
						name: u?.user.name,
						email: u?.user.email,
					})),
					bgColor: '#' + project.color.hex,
					color: '#3d3d3d',
					itemProps: {
						'data-tip': r.result.title,
					},
				};

				result.items.push(newItem);
			});
		});
	});

	return result;
};
