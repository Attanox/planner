import { ResultForm } from './form';

const AddResultForm = ({ onSuccess, refetch }: { onSuccess: () => void; refetch: () => void }) => {
	return <ResultForm refetch={refetch} onSuccess={onSuccess} />;
};

export default AddResultForm;
