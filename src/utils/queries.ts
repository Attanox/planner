import { fetchData } from './graphql-fetcher';
import {
	GetAllProjectsDocument,
	GetAllProjectsQuery,
	GetAllProjectsQueryVariables,
	GetAllUsersDocument,
	GetAllUsersQuery,
	GetAllUsersQueryVariables,
	GetLoggedUserDocument,
	GetLoggedUserQuery,
	GetLoggedUserQueryVariables,
	GetAllResultsDocument,
	GetAllResultsQuery,
	GetAllResultsQueryVariables,
} from './__generated__/types';

export const loggedUserQuery = () => ({
	queryKey: ['GetLoggedUser'],
	queryFn: fetchData<GetLoggedUserQuery, GetLoggedUserQueryVariables>(GetLoggedUserDocument),
});

export const allUsersQuery = () => ({
	queryKey: ['GetAllUsers'],
	queryFn: fetchData<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument),
});
export const allProjectsQuery = () => ({
	queryKey: ['GetAllProjects'],
	queryFn: fetchData<GetAllProjectsQuery, GetAllProjectsQueryVariables>(GetAllProjectsDocument),
});

export const allResultsQuery = () => ({
	queryKey: ['GetAllResults'],
	queryFn: fetchData<GetAllResultsQuery, GetAllResultsQueryVariables>(GetAllResultsDocument),
});
