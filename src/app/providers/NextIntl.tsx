import type { Locale } from "@Shared/i18n";
import type { PropsWithChildren } from "react";

import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { routing } from "@Shared/i18n";

export interface ProviderNextIntlProps extends PropsWithChildren {
	locale: Locale;
}

export function ProviderNextIntl({ locale, children }: ProviderNextIntlProps) {
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
