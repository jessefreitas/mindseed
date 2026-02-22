export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    role: string;
    subrole?: 'gestao' | 'comissao' | 'medico' | null;
    linked_athlete_id?: number | null;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
