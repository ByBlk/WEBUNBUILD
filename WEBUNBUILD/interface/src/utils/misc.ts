export const isEnvBrowser = (): boolean => !window.invokeNative;
export const noop = (): void => { };
export const capitalize = (val: string) => String(val).charAt(0).toUpperCase() + String(val).slice(1);
export const getCdnUrl = (path: string, name: string) => `https://cdn.eltrane.cloud/3838384859/${path}/${name}`;
export const getCdnUrl2 = (path: string | undefined) => `https://cdn.eltrane.cloud/3838384859/${path}`;