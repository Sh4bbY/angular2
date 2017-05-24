export interface IUser {
    id: string;
    name: string;
    email: string;
    isAuthenticated: boolean;
    isVerified: boolean;
    createdAt: Date;
    roles: string[];
    isAuthPending: boolean;
}
