import { FC, PropsWithChildren } from "react";
export declare const Link: FC<PropsWithChildren<JSX.IntrinsicElements["a"] & {
    callback?: () => Promise<void> | void;
}>>;
