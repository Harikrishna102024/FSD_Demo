//normal sql its just for Typescript
export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    age: number;
    location: string;
    status: string;
    created_at?: Date;
    email: any,
    password: any,
}