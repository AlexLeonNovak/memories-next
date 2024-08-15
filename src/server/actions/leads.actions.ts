'use server';

import { revalidatePathLocales } from '@/lib/utils';
import { createDocument, deleteDocument } from '@/server/mongodb';
import { parseSchemaFormData } from '@/server/utils';
import { TDeleteFormState, TFormState, TLead, TLeadEntity, TQueryOptions } from '@/types';
import { createLeadSchemaServer } from './validations';


// export const fetchLeads = (queryOptions?: TQueryOptions<TLeadEntity>) => LeadRepository.getAll(queryOptions);

export const deleteLead = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id') as string;
    id && (await deleteDocument('leads', id));
    revalidatePathLocales('/admin/leads');
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
      revalidatePathLocales('/admin/leads');
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
};
