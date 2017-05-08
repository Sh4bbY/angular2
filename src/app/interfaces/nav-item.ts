export interface INavItem {
    icon: string;
    name: string;
    route?: string;
    children?: INavItem[];
}
