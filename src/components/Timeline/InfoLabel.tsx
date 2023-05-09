import moment from 'moment';
import { useEffect, useState } from 'react';

const InfoLabel = ({ item, group, time }: any) => {
	const date = moment(time, 'x');
	const label = group ? group.title : '';

	return (
		<div
			style={{
				position: 'fixed',
				left: '50%',
				transform: 'translateX(-50%)',
				bottom: 50,
				background: 'rgba(0, 0, 0, 0.5)',
				color: 'white',
				padding: 10,

				fontSize: 20,
				borderRadius: 5,
				zIndex: 85,
			}}
		>
			{`${date.format('LL')}, ${label}`}
		</div>
	);
};

export default InfoLabel;
