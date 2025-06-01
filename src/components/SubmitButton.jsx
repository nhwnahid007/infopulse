import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

const SubmitButton = () => {
	const { pending } = useFormStatus();
	return (
		<Button className='btn bg-slate-700 text-white text-md' disabled={pending}>
			{pending ? 'Submitting...' : 'Submit'}
		</Button>
	);
    };

export default SubmitButton;
