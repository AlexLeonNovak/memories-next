import {createCRUD} from '@/lib/services';
import {TLead} from '@/types';

const crud = createCRUD<TLead>('leads');

export default { ...crud };
