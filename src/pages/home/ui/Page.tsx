import type { Locale } from "next-intl";
import type { FC } from "react";

import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export type PageProps = {
	params: Promise<{ locale: Locale }>;
};

export const Page: FC<PageProps> = ({ params }) => {
	const { locale } = use(params);
	const t = useTranslations("pageHome");

	setRequestLocale(locale);

	return <main>{t("title")}</main>;
};
