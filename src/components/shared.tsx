import React, {
	ButtonHTMLAttributes,
	FC,
	Fragment,
	PropsWithChildren,
	ReactNode,
	useState,
} from 'react';
import { IconAlertCircle, IconCheck, IconLink, IconPencil, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import {
	ActionIcon,
	Alert,
	Center,
	ColProps,
	createStyles,
	CSSObject,
	Grid,
	Loader,
	LoadingOverlay,
	Modal,
	ScrollArea,
	Table,
	UnstyledButton,
	UnstyledButtonProps,
	useMantineTheme,
} from '@mantine/core';

import { MutationMeta, UseQueryResult } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useTheme } from '@nivo/core';

interface IPopupWrapper {
	form: (props: { onSuccess: () => void; onShowMsg: () => void }) => ReactNode;
	btn: (props: { trigger: () => void }) => ReactNode;
	notificationMsg: string;
	title: string;
	refetch: () => void;
	modalStyles?: CSSObject;
}

export const showSuccessNotification = (notificationMsg: string) => {
	showNotification({
		disallowClose: true,
		autoClose: 3000,
		title: 'Success!',
		message: notificationMsg,
		icon: <IconCheck size={18} />,
	});
};

export const FetchOverlay = ({ isFetching }: { isFetching: boolean }) => {
	const theme = useMantineTheme();

	return (
		<LoadingOverlay
			visible={isFetching}
			overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
			overlayOpacity={0.55}
			overlayBlur={3}
		/>
	);
};

export const PopupWrapper: FC<IPopupWrapper> = ({
	form,
	btn,
	notificationMsg,
	title,
	refetch,
	modalStyles,
}) => {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();

	const onSuccess = () => {
		refetch();
		setOpened(false);
		showSuccessNotification(notificationMsg);
	};

	const onShowMsg = () => {
		refetch();
		showSuccessNotification(notificationMsg);
	};

	return (
		<>
			<Modal
				centered
				size={'lg'}
				overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
				overlayOpacity={0.55}
				overlayBlur={3}
				opened={opened}
				onClose={() => setOpened(false)}
				title={title}
				closeOnClickOutside={false}
				styles={{
					modal: modalStyles,
				}}
				zIndex={401}
			>
				{form({ onSuccess, onShowMsg })}
				{/* <EditUserForm onSuccess={onSuccess} /> */}
			</Modal>

			{btn({ trigger: () => setOpened((prev) => !prev) })}
		</>
	);
};

interface IFormError {
	mutation: MutationMeta & {
		error: null | { message: string | undefined; cause: string | undefined };
	};
}

export const FormError = ({ mutation }: IFormError) => {
	if (!mutation.error) return null;

	return (
		<Alert
			id="form-error"
			mt="md"
			icon={<IconAlertCircle size={16} />}
			title={mutation.error.message}
			color="red"
		>
			<div dangerouslySetInnerHTML={{ __html: mutation.error.cause || '' }} />
		</Alert>
	);
};

export const LinkButton = ({
	children,
	...rest
}: PropsWithChildren<UnstyledButtonProps & ButtonHTMLAttributes<HTMLButtonElement>>) => {
	return (
		<UnstyledButton style={{ textDecoration: 'underline' }} fz={'sm'} {...rest}>
			{children}
		</UnstyledButton>
	);
};

export const TableLink = ({ name, to }: { name?: string; to: string }) => {
	if (name) {
		return (
			<Link to={to}>
				<LinkButton>{name}</LinkButton>
			</Link>
		);
	}

	return (
		<ActionIcon component={Link} to={to}>
			<IconLink scale={0.5} />
		</ActionIcon>
	);
};

export const DetailArea = ({ children, ...rest }: ColProps) => {
	return (
		<Grid.Col
			bg="gray.1"
			pt={'35px'}
			pl="xl"
			pr="lg"
			pb="md"
			style={{ borderRadius: '2px' }}
			{...rest}
		>
			{children}
		</Grid.Col>
	);
};

export const FullscreenLoader = () => (
	<Center w="100%" h="100%">
		<Loader />
	</Center>
);

export const PageWrapper = ({ query, children }: PropsWithChildren<{ query: UseQueryResult }>) => {
	if (query.isLoading) return <FullscreenLoader />;

	if (query.isError)
		return (
			<Alert color={'red'} title={(query.error as any).message}>
				{(query.error as any).cause}
			</Alert>
		);

	return <>{children}</>;
};

export const EditButton = ({ ...props }) => {
	return (
		<ActionIcon variant="filled" {...props}>
			<IconPencil size={16} />
		</ActionIcon>
	);
};

export const RemoveButton = ({ ...props }) => {
	return (
		<ActionIcon color={'red'} variant={'filled'} {...props}>
			<IconX size={16} />
		</ActionIcon>
	);
};

const useSimpleTableStyles = createStyles((theme) => ({
	header: {
		position: 'sticky',
		top: '-1px',
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		transition: 'box-shadow 150ms ease',

		'&::after': {
			content: '""',
			position: 'absolute',
			left: 0,
			right: 0,
			bottom: 0,
			borderBottom: `1px solid ${
				theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
			}`,
		},
	},
}));

export const SimpleTable = ({ body, head }: { body: JSX.Element; head: JSX.Element }) => {
	const styles = useSimpleTableStyles();

	return (
		<ScrollArea sx={{ height: 450 }}>
			<Table
				verticalSpacing="xs"
				fontSize="xs"
				striped
				highlightOnHover
				withBorder
				withColumnBorders
			>
				<thead className={styles.classes.header}>{head}</thead>
				<tbody>{body}</tbody>
			</Table>
		</ScrollArea>
	);
};

export const CustomTick = (tick: any) => {
	const theme = useTheme();

	const words: string[] = tick.value.split(' ');

	return (
		<g transform={`translate(${tick.x},${tick.y})`}>
			<text
				textAnchor="middle"
				dominantBaseline="middle"
				// textLength={200}
				lengthAdjust={'spacingAndGlyphs'}
				style={{
					...theme.axis.ticks.text,
					fill: '#333',
					fontSize: 10,
					width: '50px',
					maxWidth: '50px',
					display: 'block',
				}}
			>
				{words.map((word, idx) => (
					<Fragment key={word}>
						<tspan x="0" dy={'1.2em'}>
							{word}
						</tspan>
						<br />
					</Fragment>
				))}
			</text>
		</g>
	);
};

export const FieldLoader = () => {
	return (
		<Center mt="sm" w="100%" inline>
			<Loader />
		</Center>
	);
};
