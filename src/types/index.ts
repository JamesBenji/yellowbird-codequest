/* eslint-disable linebreak-style */
export type Gender = 'male' | 'female' | 'unspecified';

export type Role = 'admin' | 'customer'

export type AppUser = {
    email: string,
    firstName: string,
    lastName: string,
    gender: Gender,
    role: Role,
    createdAt: Date,
    uid: string,
    purchasesRef?: string,
}
