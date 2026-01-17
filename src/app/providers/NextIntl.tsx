import type { Locale } from "@Shared/i18n";
import type { FC, PropsWithChildren } from "react";

import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { routing } from "@Shared/i18n";

export type ProviderNextIntlProps = PropsWithChildren & {
	locale: Locale;
};

export const ProviderNextIntl: FC<ProviderNextIntlProps> = async ({ locale, children }) => {
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};
