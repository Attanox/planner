import {
	Alert,
	Autocomplete,
	Center,
	Group,
	Loader,
	SelectItemProps,
	Space,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { FieldLoader } from 'components/shared';
import { Dispatch, forwardRef, ReactNode, SetStateAction, useRef, useState } from 'react';
import { useGetAllUsersQuery } from 'utils/__generated__/types';

interface ItemProps extends SelectItemProps {
	name: string;
	email: string;
	id: string;
}

const ItemContent = ({ id, email, name }: { id: string; name: string; email: string }) => {
	return (
		<div key={id}>
			<Text>{name}</Text>
			<Text size="xs" color="dimmed">
				{email}
			</Text>
		</div>
	);
};

type TPicked = { [id: string]: string };
interface IItemPicker {
	picked: TPicked;
	setPicked: Dispatch<SetStateAction<TPicked>>;
	label: string;
	customItemContent?: (id: string, email: string, name: string) => JSX.Element;
	isLoading: boolean;
	users: Array<{ email: string; name: string; id: string }>;
}

// const [picked, setPicked] = useState<{ [id: string]: string }>({});
const ItemPicker = ({
	picked,
	setPicked,
	label,
	customItemContent,
	isLoading,
	users,
}: IItemPicker) => {
	const [value, setValue] = useState('');

	if (isLoading) {
		return <FieldLoader />;
	}

	return (
		<Stack spacing={'xs'}>
			<Stack>
				{users.map((u) => {
					if (!picked[u.id]) return null;

					return (
						<Alert
							onClose={() =>
								setPicked((p) => {
									const prev = { ...p };
									delete prev[u.id];
									return prev;
								})
							}
							withCloseButton
							color={'gray'}
							variant="outline"
							key={u.id}
						>
							{customItemContent ? (
								customItemContent(u.id, u.email, u.name)
							) : (
								<ItemContent id={u.id} email={u.email} name={u.name} />
							)}
						</Alert>
					);
				})}
			</Stack>
			<Autocomplete
				label={label}
				limit={100}
				maxDropdownHeight={250}
				placeholder="Pick one"
				value={value}
				onItemSubmit={(item) => {
					setValue('');
					setPicked((p) => ({ ...p, [item.id]: item.id }));
				}}
				onChange={setValue}
				itemComponent={forwardRef<HTMLDivElement, ItemProps>(
					({ name, email, id, ...others }: ItemProps, ref) => (
						<div ref={ref} {...others}>
							<Group noWrap>
								{/* <Avatar src={image} /> */}
								<ItemContent id={id} email={email} name={name} />
							</Group>
						</div>
					)
				)}
				data={(users || []).map(({ email, name, id }) => ({
					value: name,
					id,
					name,
					email,
				}))}
			/>
		</Stack>
	);
};

export default ItemPicker;
