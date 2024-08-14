'use server';

import { TDeleteFormState, TFormState, TLead, TLeadEntity, TQueryOptions } from '@/types';
import { parseSchemaFormData } from '@/server/utils';
import { createLeadSchemaServer } from './validations';
import { createDocument, deleteDocument } from '@/server/mongodb';

// export const fetchLeads = (queryOptions?: TQueryOptions<TLeadEntity>) => LeadRepository.getAll(queryOptions);

export const deleteLead = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id') as string;
    id && (await deleteDocument('leads', id));
    return {
      success: true,
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
};

export const createLead = async (prevState: any, formData: FormData): Promise<TFormState<TLeadEntity>> => {
  try {
    const parsed = await parseSchemaFormData(createLeadSchemaServer, formData);
    if (parsed.status === 'success') {
      const data = await createDocument<TLead>('leads', parsed.data);
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
};
