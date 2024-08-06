'use server';

import { LeadRepository } from '@/lib/repositories';
import { createLeadSchema, parseSchemaFormData } from '@/lib/validations';
import { TDeleteFormState, TFormState, TLeadEntity, TQueryOptions } from '@/types';
import { revalidatePathLocales } from '@/lib/utils';

export const fetchLeads = (queryOptions?: TQueryOptions<TLeadEntity>) => LeadRepository.getAll(queryOptions);

export const deleteLead = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id') as string;
    id && (await LeadRepository.delete(id));
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
    const parsed = await parseSchemaFormData(createLeadSchema, formData);
    if (parsed.status === 'success') {
      const data = await LeadRepository.create(parsed.data);
      revalidatePathLocales('/admin/leads');
      return { status: 'success', data };
    }
    return parsed;
  } catch (e) {
    return { status: 'fail', message: (e as Error).message };
  }
};
