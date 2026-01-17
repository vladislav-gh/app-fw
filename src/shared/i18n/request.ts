import type { AbstractIntlMessages } from "next-intl";

import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import deepmerge from "deepmerge";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

	const messagesFromLocales = (await import(`@Locales/${locale}.json`)).default;
	const messagesDefault = (await import(`@Locales/${routing.defaultLocale}.json`)).default;
	const messages: AbstractIntlMessages | undefined = deepmerge(messagesDefault, messagesFromLocales);

	return {
		locale,
		messages,
	};
});
