'use server';

import {cache} from 'react';
import {LeadRepository} from '@/lib/repositories';
import {TDeleteFormState, TFormStateSuccess, TLead} from '@/types';
import {revalidatePath} from 'next/cache';
import {createLeadSchema, parseSchemaFormData} from '@/lib/validations';

export const fetchLeads = cache(LeadRepository.getAll);

export const deleteLead = async (prevState: any, formData: FormData): Promise<TDeleteFormState> => {
  try {
    const id = formData.get('id') as string;
    id && await LeadRepository.delete(id);
    revalidatePath('/');
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
}

export const createLead = async (prevState: any, formData: FormData) => {
    const parsed = await parseSchemaFormData(createLeadSchema, formData);
    if (!parsed.success) {
      return parsed;
    }
    const lead = await LeadRepository.create(parsed.data);
    revalidatePath('/');
    return {
      success: true,
      data: lead,
    } as TFormStateSuccess<TLead>
};
