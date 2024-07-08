import {createCRUD} from '@/lib/services';
import {TCategory} from '@/types';

const crud = createCRUD<TCategory>('categories');

export default { ...crud };
