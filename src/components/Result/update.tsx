import { ResultForm } from './form';

const EditResultForm = ({
	onSuccess,
	refetch,
	id,
}: {
	refetch: () => void;
	onSuccess: () => void;
	id: string;
}) => {
	return <ResultForm refetch={refetch} onSuccess={onSuccess} initialResultId={id} />;
};

export default EditResultForm;
