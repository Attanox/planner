import { useEffect, useRef, useState } from 'react';
import {
	ActionIcon,
	Autocomplete,
	Button,
	Center,
	Flex,
	Group,
	Loader,
	MultiSelect,
	Select,
	Stack,
	Text,
	Textarea,
	TextInput,
} from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { useForm, UseFormReturnType } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';

import {
	Status,
	useGetAllUsersQuery,
	useGetCurrentUserProjectsQuery,
	useGetLoggedUserQuery,
	useGetResultCategoriesQuery,
	useGetTagsQuery,
	useGetTypesQuery,
	useGetUserProjectsQuery,
} from 'utils/__generated__/types';
import { IconX } from '@tabler/icons';
import { FieldLoader } from 'components/shared';
import { getToday } from 'functions';

export type TPhase = {
	id?: string;
	name: string;
	description: string;
	date_begin: string;
	date_end: string;
};

const getUid = () => {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const PhaseSelect = ({
	onPhasesChange,
	initialPhases = {},
}: {
	onPhasesChange: (phases: Array<TPhase>) => void;
	initialPhases?: { [key: string]: TPhase };
}) => {
	const phases = useRef<{ [key: string]: TPhase }>(initialPhases);
	const [phasesAmount, setPhasesAmount] = useState(Object.keys(initialPhases).length);

	const onChangePhase = (key: string, payload: Partial<TPhase>) => {
		phases.current = {
			...phases.current,
			[key]: {
				...(phases.current[key] || {}),
				...payload,
			},
		};
		onPhasesChange(Object.values(phases.current));
	};

	const onRemovePhase = (key: string) => {
		delete phases.current[key];
		setPhasesAmount((c) => c - 1);
		onPhasesChange(Object.values(phases.current));
	};

	const onAddPhase = () => {
		phases.current[getUid()] = {
			name: '',
			description: '',
			date_begin: getToday(),
			date_end: getToday(),
		};
		setPhasesAmount((c) => c + 1);
		onPhasesChange(Object.values(phases.current));
	};

	const phaseKeys = Object.keys(phases.current);

	return (
		<Stack spacing={'xs'} mt="sm">
			<Text fz="sm">Result phases</Text>
			{phaseKeys.map((key) => {
				return (
					<Stack
						spacing={0}
						key={key}
						p="sm"
						style={{ borderRadius: '2px', border: '1px solid #ced4da' }}
					>
						<Group position="right">
							<ActionIcon size={'sm'} onClick={() => onRemovePhase(key)}>
								<IconX />
							</ActionIcon>
						</Group>
						<TextInput
							defaultValue={phases.current[key].name}
							onBlur={(e) => onChangePhase(key, { name: e.target.value })}
							withAsterisk
							label="Name"
							placeholder="Enter phase name"
						/>
						<Textarea
							defaultValue={phases.current[key].description}
							mt="sm"
							onBlur={(e) => onChangePhase(key, { description: e.target.value })}
							label="Description"
							placeholder="Enter phase description"
						/>
						<Group grow>
							<TextInput
								mt="sm"
								withAsterisk
								label="Phase beginning"
								placeholder="Enter phase's beginning"
								defaultValue={phases.current[key].date_begin}
								onChange={(e) => {
									const value = e.target.value;
									onChangePhase(key, {
										date_begin: value,
									});
								}}
								type={'date'}
							/>
							<TextInput
								mt="sm"
								withAsterisk
								label="Phase end"
								placeholder="Enter phase's end"
								defaultValue={phases.current[key].date_end}
								onChange={(e) => {
									const value = e.target.value;
									onChangePhase(key, {
										date_end: value,
									});
								}}
								type={'date'}
							/>
						</Group>
					</Stack>
				);
			})}
			<Group w="100%" position="right" mt="lg">
				<Center h="100%">No. of phases: {phasesAmount}</Center>

				<Button variant="outline" onClick={onAddPhase} type="button">
					Add phase
				</Button>
			</Group>
		</Stack>
	);
};

type TTags = Array<{ id: string; name: string }>;
type TItems = Array<{ value: string; label: string }>;

const mapTagsToItems = (tags: TTags): TItems => {
	return tags.map((t) => ({ value: t.name, label: t.name }));
};

export const KeywordsSelect = ({
	onSelect,
	initialKeywords = [],
	...rest
}: {
	onSelect: (tags: string[]) => void;
	initialKeywords?: Array<string>;
}) => {
	const [keywords, setKeywords] = useState<TItems>([]);
	const [selected, setSelected] = useState<Array<string>>(initialKeywords);

	const tagsQuery = useGetTagsQuery(
		{},
		{
			onSuccess(data) {
				const items = mapTagsToItems(data.tags);
				setKeywords(items);
			},
		}
	);

	if (tagsQuery.isLoading) {
		return <FieldLoader />;
	}

	return (
		<MultiSelect
			mt="sm"
			label="Keywords"
			data={keywords}
			placeholder="Select items"
			searchable
			creatable
			maxDropdownHeight={160}
			value={selected}
			getCreateLabel={(query) => `+ Create ${query}`}
			onCreate={(query) => {
				const item = { value: query, label: query };
				setKeywords((current) => [...current, item]);
				return item;
			}}
			onChange={(value) => {
				setSelected(value);
				onSelect(value);
			}}
			// {...rest}
		/>
	);
};

export const SelectType = ({ validate, ...rest }: { validate: boolean }) => {
	const { data, isLoading } = useGetTypesQuery();

	if (isLoading) {
		return <FieldLoader />;
	}

	return (
		<Select
			mt="sm"
			withAsterisk={validate}
			label="Type"
			placeholder="Pick type"
			data={(data?.types || []).map((type) => ({ value: type.id, label: type.name }))}
			{...rest}
		/>
	);
};

export const SelectStatus = ({ validate, ...rest }: { validate: boolean }) => {
	return (
		<Select
			mt="sm"
			withAsterisk={validate}
			label="Status"
			placeholder="Status"
			data={[
				{ value: 'scheduled', label: 'Scheduled' },
				{ value: 'in_progress', label: 'In progress' },
				{ value: 'delayed', label: 'Delayed' },
				{ value: 'done', label: 'Done' },
			]}
			{...rest}
		/>
	);
};

export const SelectResultCategory = ({ ...rest }) => {
	const { data, isLoading } = useGetResultCategoriesQuery();

	if (isLoading) {
		return <FieldLoader />;
	}

	return (
		<Select
			mt="sm"
			label="Venue/Journal"
			placeholder="Venue/journal"
			data={(data?.resultCategories || []).map((cat) => ({ value: cat.id, label: cat.acronym }))}
			{...rest}
		/>
	);
};

export const SelectProject = ({
	onSelect,
	authorId,
	validate,
	...rest
}: {
	authorId: string;
	validate: boolean;
	onSelect: (id: string) => void;
}) => {
	const { data, isLoading } = useGetUserProjectsQuery({ user_id: authorId });

	if (isLoading) {
		return <FieldLoader />;
	}

	return (
		<Autocomplete
			mt="sm"
			withAsterisk={validate}
			label="Project"
			placeholder="Pick project for result"
			data={(data?.userProjectByUserId || []).map(({ project }) => ({
				value: project.short_name,
				label: project.short_name,
				id: project.id,
			}))}
			onItemSubmit={(item) => onSelect(item.id)}
			{...rest}
		/>
	);
};

export const AuthorSelect = ({
	validate,
	onSelect,
	...rest
}: {
	validate: boolean;
	onSelect: (i: string) => void;
}) => {
	const loggedUser = useGetLoggedUserQuery();
	const usersQuery = useGetAllUsersQuery();

	if (loggedUser.isLoading || usersQuery.isLoading) {
		return <FieldLoader />;
	}

	return (
		<Autocomplete
			mt="sm"
			withAsterisk={validate}
			label="Result's author"
			placeholder="Pick user as the author"
			defaultValue={loggedUser.data?.me?.name}
			data={(usersQuery.data?.users || []).map((u) => ({
				value: u.name,
				label: `${u.name} (${u.email})`,
				id: u.id,
			}))}
			onItemSubmit={(item) => onSelect(item.id)}
			{...rest}
		/>
	);
};

const AuthorProjectSelect = ({
	onAuthorSelect,
	onProjectSelect,
	form,
	validate,
}: {
	form: ReturnType<typeof useResultForm>;
	validate: boolean;
	onAuthorSelect: (i: string) => void;
	onProjectSelect: (i: string) => void;
}) => {
	const [authorId, setAuthorId] = useState('');
	useGetLoggedUserQuery(
		{},
		{
			onSuccess(data) {
				onAuthorSelect(data.me?.id || '');
				setAuthorId(data.me?.id || '');
				form.setFieldValue('author_name', data.me?.name || '');
			},
		}
	);

	return (
		<Group grow>
			<AuthorSelect
				onSelect={(id) => {
					setAuthorId(id);
					onProjectSelect('');
					form.setFieldValue('project_name', '');
					onAuthorSelect(id);
				}}
				validate={validate}
				{...form.getInputProps('author_name')}
			/>
			<SelectProject
				authorId={authorId}
				onSelect={onProjectSelect}
				validate={validate}
				{...form.getInputProps('project_name')}
			/>
		</Group>
	);
};

export const INITIAL_VALUES = {
	title: '',
	keywords: [] as Array<string>,
	type_id: '',
	result_category_id: '',
	status: 'scheduled' as Status,
	comment: '',
	project_name: '',
	author_name: '',
};

export const VALIDATE: FormValidateInput<typeof INITIAL_VALUES> = {};

export const useResultForm = (validate: FormValidateInput<typeof INITIAL_VALUES> | {}) => {
	const form = useForm({
		initialValues: { ...INITIAL_VALUES },

		validate,
	});
	return form;
};

export const GeneralInfoForm = ({
	form,
	validate = false,
	...rest
}: {
	form: ReturnType<typeof useResultForm>;
	validate?: boolean;
	onAuthorSelect: (s: string) => void;
	onProjectSelect: (s: string) => void;
}) => {
	return (
		<>
			<Group grow>
				<TextInput
					mt="sm"
					withAsterisk={validate}
					label="Title"
					placeholder="Enter result's title"
					{...form.getInputProps('title')}
				/>
				<SelectStatus validate={validate} {...form.getInputProps('status')} />
			</Group>
			<Group grow>
				<SelectType validate={validate} {...form.getInputProps('type_id')} />
				<SelectResultCategory {...form.getInputProps('result_category_id')} />
			</Group>
			<AuthorProjectSelect validate={validate} form={form} {...rest} />
			<Textarea
				mt="sm"
				label="Comment"
				placeholder="Enter comment"
				{...form.getInputProps('comment')}
			/>
		</>
	);
};
