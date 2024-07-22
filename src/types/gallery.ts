import {TPostMedia} from '@/types/posts';

export type TPostIdWMedia = TPostMedia & {
  id: string;
  categories: string[];
}
