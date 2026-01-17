export enum Locale {
	EN = "en",
	RU = "ru",
}

export const DEFAULT_LOCALE: Locale = (process.env.NEXT_PUBLIC_LOCALE as Locale) ?? "en";

export const LOCALES = Object.values(Locale);
