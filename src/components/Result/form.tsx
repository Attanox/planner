import { Button, Center, Flex, Group, Loader, Stepper } from '@mantine/core';

import {
	Status,
	useCreatePhaseMutation,
	useCreateResultMutation,
	useCreateResultProjectMutation,
	useCreateTagAttachResultMutation,
	useCreateTagsMutation,
	useGetKeywordsQuery,
	useGetPhasesQuery,
	useGetResultQuery,
	useRemovePhasesOfResultMutation,
	useUpdatePhaseMutation,
	useUpdateResultMutation,
} from 'utils/__generated__/types';
import { FieldLoader, FormError } from 'components/shared';
import { GeneralInfoForm, KeywordsSelect, PhaseSelect, TPhase, useResultForm } from './shared';
import { getDate, getGraphqlDate, sortDateAsc } from 'functions';
import { FormEvent, useRef, useState } from 'react';
import AddCoAuthorForm from 'components/CoAuthor/create';

const GeneralStep = ({
	nextStep,
	setResultId,
	id,
	project,
	setProject,
}: {
	nextStep: () => void;
	id: string;
	project: string;
	setProject: (p: string) => void;
	setResultId: (id: string) => void;
}) => {
	const form = useResultForm(
		id
			? {}
			: {
					title: (value) => (value === '' ? 'Field is required' : null),
					type_id: (value) => (value === '' ? 'Field is required' : null),
					project_name: (value) => (value === '' ? 'Field is required' : null),
					author_name: (value) => (value === '' ? 'Field is required' : null),
			  }
	);

	const authorRef = useRef<string>('');
	const resultQuery = useGetResultQuery(
		{
			id,
		},
		{
			enabled: Boolean(id),
			onSuccess(data) {
				if (data.resultById) {
					const { resultCategory, type, status, comment, title, projects, author } =
						data.resultById;
					authorRef.current = author.id;
					form.setValues({
						author_name: author.name,
						project_name: projects[0]?.project.short_name,
						comment: comment || '',
						result_category_id: resultCategory?.id || '',
						status: status as Status,
						title,
						type_id: type.id,
					});
					const projectId = projects[0]?.project.id;
					if (projectId) setProject(projectId);
				}
			},
		}
	);

	const resultProjectMutation = useCreateResultProjectMutation();
	const createResultMutation = useCreateResultMutation({
		async onSuccess(data) {
			await resultProjectMutation.mutateAsync({
				project_id: project,
				result_id: String(data.createResult?.id),
			});
			nextStep();
			setResultId(data.createResult?.id || '');
		},
	});
	const updateResultMutation = useUpdateResultMutation({
		onSuccess() {
			nextStep();
		},
	});

	const onSubmit = (values: typeof form.values) => {
		const input = {
			...values,
			author: authorRef.current,
		};

		if (!id) {
			createResultMutation.mutate(input);
		} else {
			updateResultMutation.mutate({ id, ...input });
		}
	};

	if (resultQuery.isFetching) {
		return <FieldLoader />;
	}

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<GeneralInfoForm
				form={form}
				onAuthorSelect={(i) => (authorRef.current = i)}
				onProjectSelect={setProject}
				validate={!id}
			/>

			<FormError mutation={createResultMutation} />
			<FormError mutation={resultProjectMutation} />

			<Group position="right" mt="lg">
				<Button
					disabled={
						resultProjectMutation.isLoading ||
						createResultMutation.isLoading ||
						updateResultMutation.isLoading
					}
					loading={
						resultProjectMutation.isLoading ||
						createResultMutation.isLoading ||
						updateResultMutation.isLoading
					}
					type="submit"
				>
					Next
				</Button>
			</Group>
		</form>
	);
};

const KeywordsStep = ({
	nextStep,
	prevStep,
	result_id,
}: {
	prevStep: () => void;
	nextStep: () => void;
	result_id: string;
}) => {
	const keywordsQuery = useGetKeywordsQuery({ result_id });
	const attachTagsRef = useRef<Array<string>>([]);
	const createTagsMutation = useCreateTagsMutation();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		createTagsMutation
			.mutateAsync({
				names: attachTagsRef.current,
				result_id,
			})
			.then(nextStep);
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<FormError mutation={createTagsMutation} />
				{keywordsQuery.isFetching ? (
					<FieldLoader />
				) : (
					<KeywordsSelect
						initialKeywords={keywordsQuery.data?.resultById?.tags.map((t) => t?.name || '')}
						onSelect={(tags) => (attachTagsRef.current = tags)}
					/>
				)}
				<Group position="apart" mt="lg">
					<Button onClick={prevStep} variant="outline" type="button">
						Previous
					</Button>
					<Button
						disabled={createTagsMutation.isLoading}
						loading={createTagsMutation.isLoading}
						type="submit"
					>
						Next
					</Button>
				</Group>
			</form>
		</>
	);
};

const PhasesStep = ({
	nextStep,
	prevStep,
	result_id,
}: {
	nextStep: () => void;
	prevStep: () => void;
	result_id: string;
}) => {
	const phasesRef = useRef<Array<TPhase>>([]);
	const phasesQuery = useGetPhasesQuery(
		{ result_id },
		{
			onSuccess(data) {
				const phases = data.resultById?.phases || [];

				phasesRef.current = phases.map((p) => ({
					date_begin: p?.date_begin || '',
					date_end: p?.date_end || '',
					description: p?.description || '',
					name: p?.name || '',
					id: p?.id || '',
				}));
			},
		}
	);
	const createPhaseMutation = useCreatePhaseMutation();
	const removePhasesOfResultMutation = useRemovePhasesOfResultMutation();

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		removePhasesOfResultMutation.mutateAsync({ result_id }).then(() => {
			Promise.all(
				phasesRef.current
					.sort((a, b) => sortDateAsc(a.date_end, b.date_end))
					.map((phase) => {
						return createPhaseMutation.mutateAsync({
							date_begin: getGraphqlDate(new Date(phase.date_begin)),
							date_end: getGraphqlDate(new Date(phase.date_end)),
							name: phase.name,
							description: phase.description,
							result_id,
						});
					})
			).then(nextStep);
		});
	};

	const initialPhases: { [key: string]: TPhase } = {};
	const phases = phasesQuery.data?.resultById?.phases || [];
	phases.forEach((phase) => {
		if (phase) {
			initialPhases[phase?.id] = {
				date_begin: getDate(phase.date_begin),
				date_end: getDate(phase.date_end),
				name: phase.name,
				id: phase.id,
				description: phase.description || '',
			};
		}
	});

	return (
		<>
			<form onSubmit={onSubmit}>
				<FormError mutation={createPhaseMutation} />
				<FormError mutation={removePhasesOfResultMutation} />
				{phasesQuery.isFetching ? (
					<FieldLoader />
				) : (
					<PhaseSelect
						initialPhases={initialPhases}
						onPhasesChange={(newPhases) => (phasesRef.current = newPhases)}
					/>
				)}
				<Group position="apart" mt="lg">
					<Button onClick={prevStep} variant="outline" type="button">
						Previous
					</Button>
					<Button
						disabled={removePhasesOfResultMutation.isLoading || createPhaseMutation.isLoading}
						loading={removePhasesOfResultMutation.isLoading || createPhaseMutation.isLoading}
						type="submit"
					>
						Next
					</Button>
				</Group>
			</form>
		</>
	);
};

export const ResultForm = ({
	onSuccess,
	refetch,
	initialResultId = '',
}: {
	initialResultId?: string;
	onSuccess: () => void;
	refetch: () => void;
}) => {
	const [active, setActive] = useState(0);
	const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
	const [resultId, setResultId] = useState(initialResultId);
	const [project, setProject] = useState('');

	const onNext = () => {
		refetch();
		nextStep();
	};

	return (
		<Stepper active={active} onStepClick={setActive}>
			<Stepper.Step
				allowStepSelect={!!resultId}
				label="General info"
				description="Main information of a result"
			>
				<GeneralStep
					id={resultId}
					project={project}
					setProject={setProject}
					setResultId={setResultId}
					nextStep={onNext}
				/>
			</Stepper.Step>

			<Stepper.Step
				allowStepSelect={!!resultId}
				label="Phases"
				description="Create phases of the result"
			>
				<PhasesStep prevStep={prevStep} nextStep={onNext} result_id={resultId} />
			</Stepper.Step>

			<Stepper.Step
				allowStepSelect={!!resultId}
				label="Keywords"
				description="Choose some descriptive keywords"
			>
				<KeywordsStep prevStep={prevStep} nextStep={onNext} result_id={resultId} />
			</Stepper.Step>

			<Stepper.Step
				allowStepSelect={!!resultId}
				label="Co-authors"
				description="Add users who worked on result"
			>
				<AddCoAuthorForm
					renderToolbar={(isLoading) => (
						<Group position="apart" mt={'lg'}>
							<Button disabled={isLoading} variant="outline" type="button">
								Previous
							</Button>
							<Button disabled={isLoading} loading={isLoading} type="submit">
								Finish
							</Button>
						</Group>
					)}
					onSuccess={onSuccess}
					id={resultId}
					project_id={project}
				/>
			</Stepper.Step>
		</Stepper>
	);
};
