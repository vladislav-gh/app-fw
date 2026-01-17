export const wait = (ms: number, deltaMs?: number) =>
	new Promise(resolve => setTimeout(resolve, deltaMs && deltaMs > 0 ? ms + Math.round(Math.random() * deltaMs) : ms));
