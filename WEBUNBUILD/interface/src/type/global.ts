declare global {
  interface Window {
    GetParentResourceName?: () => string;
    invokeNative?: () => unknown;
  }
}