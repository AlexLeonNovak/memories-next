import { TBaseEntity } from '.';

export type TLead = {
  organisation: string;
  name: string;
  email: string;
  phone: string;
};

export type TLeadEntity = TBaseEntity & TLead;
