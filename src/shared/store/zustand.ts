import type { StoreApi, UseBoundStore } from "zustand";

// biome-ignore lint/suspicious/noExplicitAny: reason
type GenericState = Record<string, any>;

export const createSelectors = <T extends GenericState>(
	store: UseBoundStore<StoreApi<T>>,
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => {
	const useStore: <K extends keyof T>(keys: K[]) => Pick<T, K> = <K extends keyof T>(keys: K[]) => {
		return keys.reduce((acc, cur) => {
			// biome-ignore lint/suspicious/noExplicitAny: reason
			(acc as any)[cur] = store(s => s[cur as keyof typeof s]);

			return acc;
		}, {} as T);
	};

	return useStore;
};
