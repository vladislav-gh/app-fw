export const IS_DEV = process.env.NODE_ENV !== "production";

export const IS_CLIENT = typeof window !== "undefined";
export const IS_SERVER = !IS_CLIENT;
