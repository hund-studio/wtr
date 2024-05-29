import { FC, PropsWithChildren } from "react";
import { RouteArgs } from "../compiler";
interface WpDataState {
    history: {
        data: any;
        error: any;
        key: string;
        pathname: string;
        template: string | null;
    }[];
    loading: boolean;
    current?: {
        data: any;
        error: any;
        key: string | false;
        pathname: string;
        template: string | null;
    };
}
type WpDataContext = WpDataState & {
    fetch: (pathname: string, key: string | false, callback: undefined | (() => Promise<void> | void)) => void;
};
export declare const wpDataContext: import("react").Context<WpDataContext>;
export declare const WpDataWrapper: FC<PropsWithChildren<{
    routes: RouteArgs;
}>>;
export {};
