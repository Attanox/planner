import moment from 'moment';
import { UserStatus } from 'utils/__generated__/types';

export function isInThePast(date: Date) {
	const today = new Date();

	// 👇️ OPTIONAL!
	// This line sets the hour of the current date to midnight
	// so the comparison only returns `true` if the passed in date
	// is at least yesterday
	today.setHours(0, 0, 0, 0);

	return date < today;
}

export function getGraphqlDate(date: Date | null) {
	if (!date) return '';

	const result = moment(date).format('YYYY-MM-DD HH:mm:ss');
	// const result = date
	//   .toISOString()
	//   .replace('T', ' ')
	//   .replace('Z', '')
	//   .replace(/\.\d+/, '')

	return result;
}

export function getToday() {
	return getDate(new Date());
}

// GraphQL returns any
export function getDate(date: any) {
	return moment(date).format('YYYY-MM-DD');
}

export function sortDateAsc(a: any, b: any) {
	return moment(a).diff(moment(b));
}
export function sortDateDesc(a: any, b: any) {
	return moment(b).diff(moment(a));
}

export function processUserStatus(status: UserStatus) {
	switch (status) {
		case UserStatus.TeamMember:
			return 'Team member';
		case UserStatus.ExternalCollaborator:
			return 'External collaborator';
		case UserStatus.Alumni:
			return 'Alumni';

		default:
			throw Error('Unknown user status');
	}
}
