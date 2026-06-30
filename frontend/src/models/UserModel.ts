export type UserModel = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone?: string;
    birthDate?: string;
    address?: string;
    city?: string;
    photo?: string;
    role: 'EMPLOYEE' | 'ADMIN';
    password?: string;
    rememberME?: boolean;
}