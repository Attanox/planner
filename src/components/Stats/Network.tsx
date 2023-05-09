import { Link, Node, NodeType, UsersNetwork } from 'utils/__generated__/types';
import { LinkProps, Network, NodeProps, NodeTooltipProps } from '@nivo/network';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ActionIcon, Group } from '@mantine/core';
import { IconZoomIn, IconZoomOut } from '@tabler/icons';

const CustomNodeTooltipComponent = ({ node }: NodeTooltipProps<Node>) => (
	<div
		style={{
			border: `1px solid ${node.color}`,
			color: '#000000',
			padding: '9px 12px',
			borderRadius: '2px',
			backgroundColor: '#fff',
			boxShadow: '0 3px 9px rgba(0, 0, 0, .35)',
		}}
	>
		<strong>{node.data.name}</strong>
		<br />
		{node.data.type === NodeType.User ? (
			<>
				<strong>{node.data.email}</strong>
				<br />
			</>
		) : null}
	</div>
);

const CustomNodeComponent = ({
	node,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
}: NodeProps<Node>) => {
	const navigate = useNavigate();

	// from Statistics.php, this makes sure user's are in circle
	if (node.data.id === '__main__user__node__') return null;
	if (node.data.id.includes('__additional_user_node__')) return null;

	if (node.data.type === NodeType.Result) {
		return (
			<g
				onClick={() => navigate(`/results/${node.data.id}`)}
				onMouseEnter={(e) => onMouseEnter && onMouseEnter(node, e)}
				onMouseLeave={(e) => onMouseLeave && onMouseLeave(node, e)}
				onMouseMove={(e) => onMouseMove && onMouseMove(node, e)}
				transform={`translate(${node.x - 12},${node.y - 9})`}
				style={{ cursor: 'pointer' }}
			>
				<circle cx="12" cy="8" r="6" fill={node.color} stroke="#ffffff" />
			</g>
		);
	}

	return (
		<g
			onClick={() => navigate(`/users/${node.data.id}`)}
			onMouseEnter={(e) => onMouseEnter && onMouseEnter(node, e)}
			onMouseLeave={(e) => onMouseLeave && onMouseLeave(node, e)}
			onMouseMove={(e) => onMouseMove && onMouseMove(node, e)}
			transform={`translate(${node.x - 12},${node.y - 18})`}
			style={{ cursor: 'pointer' }}
		>
			<circle cx="12" cy="8" r="5" fill={node.color} stroke="#ffffff" />
			<path d="M3,21 h18 C 21,12 3,12 3,21" fill={node.color} stroke="#ffffff" />
		</g>
	);
};

const CustomLinkComponent = ({ link }: LinkProps<Node, Link>) => {
	// from Statistics.php, this makes sure user's are in circle
	if (link.data.target === '__main__user__node__') return null;

	return (
		<line
			x1={link.source.x}
			y1={link.source.y}
			x2={link.target.x}
			y2={link.target.y}
			stroke={link.color}
			strokeWidth={1}
			// strokeDasharray="5 7"
			strokeLinecap="round"
		/>
	);
};

const NetworkDiagram = ({ data }: { data: Omit<UsersNetwork, '_typename'> }) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const [zoom, setZoom] = useState<number>(1);
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

	const onZoomChange = (newZoom: number) => {
		const groupEl = wrapperRef.current?.querySelector('svg > g') as SVGGElement;
		if (groupEl) {
			const currentTransform = groupEl.getAttribute('transform');
			const newTransform = `${currentTransform || ''} scale(${newZoom})`;
			const newTransformAttr = newTransform.replace(/scale\([^)]*\)/, `scale(${newZoom})`);
			groupEl.setAttribute('transform', newTransformAttr);
		}
	};

	useEffect(() => {
		console.log(zoom);
		onZoomChange(zoom);
	}, [zoom]);

	const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);

		const svgEl = wrapperRef.current?.querySelector('svg') as SVGSVGElement;
		const svgPoint = svgEl.createSVGPoint();
		svgPoint.x = event.clientX;
		svgPoint.y = event.clientY;

		const groupEl = wrapperRef.current?.querySelector('svg > g') as SVGGElement;
		const matrix = groupEl!.getScreenCTM()!.inverse();
		const transformedPoint = svgPoint.matrixTransform(matrix);
		setDragOffset({ x: transformedPoint.x, y: transformedPoint.y });
	};

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (isDragging) {
			const svgEl = wrapperRef.current?.querySelector('svg') as SVGSVGElement;
			const svgPoint = svgEl!.createSVGPoint();
			svgPoint.x = event.clientX;
			svgPoint.y = event.clientY;

			const groupEl = wrapperRef.current?.querySelector('svg > g') as SVGGElement;
			const matrix = groupEl!.getScreenCTM()!.inverse();
			const transformedPoint = svgPoint.matrixTransform(matrix);
			const dx = transformedPoint.x - dragOffset.x;
			const dy = transformedPoint.y - dragOffset.y;

			const currentTransform = groupEl.getAttribute('transform');
			const newTransform = `translate(${dx}, ${dy}) ${currentTransform || ''}`;
			groupEl.setAttribute('transform', newTransform);
			// groupEl!.transform.baseVal.getItem(0).setTranslate(dx, dy);
		}
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	return (
		<div
			style={{ position: 'relative' }}
			ref={wrapperRef}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
		>
			<Group style={{ position: 'absolute', zIndex: '25', top: '0', right: '0' }}>
				<ActionIcon onClick={() => setZoom((p) => p + 0.1)}>
					<IconZoomIn />
				</ActionIcon>
				<ActionIcon onClick={() => setZoom((p) => p - 0.1)}>
					<IconZoomOut />
				</ActionIcon>
			</Group>
			<Network
				data={data}
				height={500}
				width={800}
				margin={{ top: 150, right: 0, bottom: 100, left: 0 }}
				animate={false}
				// centeringStrength={2}
				// repulsivity={100}
				// distanceMin={0.75}
				// distanceMax={600}
				linkDistance={function (e) {
					return e.distance;
				}}
				centeringStrength={0.5}
				repulsivity={100}
				nodeSize={function (n) {
					return n.size;
				}}
				activeNodeSize={function (n) {
					return 1.5 * n.size;
				}}
				nodeColor={function (e) {
					return e.color;
				}}
				nodeBorderWidth={1}
				nodeBorderColor={{
					from: 'color',
					modifiers: [['darker', 0.8]],
				}}
				linkThickness={function (n) {
					return 2 + 2 * n.target.data.height;
				}}
				nodeComponent={CustomNodeComponent}
				nodeTooltip={CustomNodeTooltipComponent}
				linkComponent={CustomLinkComponent}
			/>
		</div>
	);
};

export default NetworkDiagram;
