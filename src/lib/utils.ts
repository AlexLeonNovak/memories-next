import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {EPostMediaType} from '@/types';
// import {Tokens} from 'next-firebase-auth-edge';
// import { User } from '@/components/auth';
// import {filterStandardClaims} from 'next-firebase-auth-edge/lib/auth/claims';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getFileType = (file: File): EPostMediaType => file.type.includes('image') ? EPostMediaType.IMAGE : EPostMediaType.VIDEO;

// export const toUser = ({decodedToken}: Tokens): User => {
//   const {
//     uid,
//     email,
//     picture: photoURL,
//     email_verified: emailVerified,
//     phone_number: phoneNumber,
//     name: displayName,
//     source_sign_in_provider: signInProvider
//   } = decodedToken;
//
//   const customClaims = filterStandardClaims(decodedToken);
//
//   return {
//     uid,
//     email: email ?? null,
//     displayName: displayName ?? null,
//     photoURL: photoURL ?? null,
//     phoneNumber: phoneNumber ?? null,
//     emailVerified: emailVerified ?? false,
//     providerId: signInProvider,
//     customClaims
//   };
// };


