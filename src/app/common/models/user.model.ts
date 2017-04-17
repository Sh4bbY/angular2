export interface User {
    name: string;
    email: string;
    isLoggedIn: boolean;
    roles: Array<Role>;
}

export interface Role {
    name: string;
    rights: Array<Right>;
}

export enum Right {
    VIEW_BLOG
}
