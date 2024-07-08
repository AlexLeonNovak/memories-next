import {createCRUD} from '@/lib/services';
import {TPost} from '@/types';

const crud = createCRUD<TPost>('posts');

export default { ...crud };
