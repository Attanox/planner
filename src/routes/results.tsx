import Result from 'components/Result';
import { PageWrapper } from 'components/shared';
import { useGetAllResultsQuery, useGetLoggedUserQuery } from '../utils/__generated__/types';
import { Group, Title } from '@mantine/core';

const Results = () => {
	const resultsQuery = useGetAllResultsQuery();
	const loggedUser = useGetLoggedUserQuery();

	if (resultsQuery.isError || resultsQuery.isLoading) {
		return <PageWrapper query={resultsQuery} />;
	}
	if (loggedUser.isError || loggedUser.isLoading) {
		return <PageWrapper query={loggedUser} />;
	}

	return (
		<>
			<Group mb="sm" position="apart">
				<Title order={1}>Results</Title>
				<Result.Create refetch={resultsQuery.refetch} />
			</Group>
			<Result.List
				isFetching={resultsQuery.isFetching}
				results={resultsQuery.data.results}
				refetch={resultsQuery.refetch}
			/>
		</>
	);
};

export default Results;
