interface MenuItem {
    label: string;
    to: string;
}
interface MenuData {
    [key: string]: MenuItem[];
}
declare const useMenu: () => MenuData | null;
export { useMenu };
