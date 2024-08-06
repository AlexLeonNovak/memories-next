import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const createLeadSchema = zfd.formData({
  organisation: zfd.text(z.string().min(1, 'Required')),
  name: zfd.text(z.string().min(1, 'Required')),
  email: zfd.text(z.string().email().min(1, 'Required')),
  phone: zfd.text(z.string().min(1, 'Required')),
});
