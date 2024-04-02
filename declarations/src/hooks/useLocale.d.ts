interface LocaleData {
    current: string;
    available: string[];
}
declare const useLocale: () => LocaleData | null;
export { useLocale };
