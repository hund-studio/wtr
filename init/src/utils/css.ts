type ClassName = string | boolean | null | undefined;

const css = (...classNames: ClassName[]) => classNames.flatMap((i) => (!!i ? [i] : [])).join(" ");

export { css };
