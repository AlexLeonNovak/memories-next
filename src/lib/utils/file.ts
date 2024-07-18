import {EPostMediaType} from '@/types';

export const getFileType = (file: File): EPostMediaType => file.type.includes('image') ? EPostMediaType.IMAGE : EPostMediaType.VIDEO;
