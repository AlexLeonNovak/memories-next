import {EMediaType} from '@/types';

export const getFileType = (file: File): EMediaType => file.type.includes('image') ? EMediaType.IMAGE : EMediaType.VIDEO;
