import { Autocomplete, Button, Center, Group, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { FieldLoader, FormError } from 'components/shared';
import { useRef } from 'react';
import { useGetProjectUsersQuery, useUpdateAuthorMutation } from 'utils/__generated__/types';

const SelectNewAuthor = ({
	onSelect,
	project_id,
	...rest
}: {
	project_id: string;
	onSelect: (id: string) => void;
}) => {
	const { data, isLoading } = useGetProjectUsersQuery({ project_id });

	if (isLoading) {
		return <FieldLoader />;
	}

	return (
		<Autocomplete
			mt="sm"
			withAsterisk
			label="New author"
			placeholder="Pick new author for result"
			data={(data?.projectUsers || []).map((user) => ({
				value: user.user.name,
				label: user.user.name,
				id: user.user.id,
			}))}
			onItemSubmit={(item) => onSelect(item.id)}
			{...rest}
		/>
	);
};

const UpdateAuhorForm = ({
	project_id,
	result_id,
	onSuccess,
}: {
	project_id: string;
	result_id: string;
	onSuccess: () => void;
}) => {
	const authorMutation = useUpdateAuthorMutation({ onSuccess });
	const newAuthorRef = useRef<string>('');

	const form = useForm({
		initialValues: { author: '' },

		validate: {
			author: (value) => (value === '' ? 'This field is required' : null),
		},
	});

	const onSubmit = (values: typeof form.values) => {
		authorMutation.mutate({
			author: newAuthorRef.current,
			id: result_id,
		});
	};

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<SelectNewAuthor
				project_id={project_id}
				onSelect={(id) => (newAuthorRef.current = id)}
				{...form.getInputProps('author')}
			/>

			<FormError mutation={authorMutation} />
			<Group position="right" mt="lg">
				<Button
					disabled={authorMutation.isLoading}
					loading={authorMutation.isLoading}
					type="submit"
				>
					Change author
				</Button>
			</Group>
		</form>
	);
};

export default UpdateAuhorForm;
