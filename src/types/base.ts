import {ReactNode} from 'react';

export type TChildrenProps = {
  children: ReactNode;
}

export type TBaseEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
}
