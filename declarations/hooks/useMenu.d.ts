interface MenuItem {
    label: string;
    to: string;
    children?: MenuItem[];
}
interface MenuData {
    [key: string]: MenuItem[];
}
declare const useMenu: () => MenuData | null;
export { useMenu };
