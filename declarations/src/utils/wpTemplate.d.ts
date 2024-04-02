interface TemplateSectionArgs {
    id: string;
    html: string;
}
export declare const generateTemplate: (sections: TemplateSectionArgs[]) => string;
export {};
