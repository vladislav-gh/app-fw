import type { Locale } from "next-intl";

import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export interface PageProps {
	params: Promise<{ locale: Locale }>;
}

export function Page({ params }: PageProps) {
	const { locale } = use(params);
	const t = useTranslations("pageHome");

	setRequestLocale(locale);

	return <main>{t("title")}</main>;
}
