import type { Locale } from "next-intl";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { FormForgotPassword } from "@Features/auth";

export interface PageProps {
	params: Promise<{ locale: Locale }>;
}

export async function Page({ params }: PageProps) {
	const { locale } = await params;
	const t = await getTranslations("pageForgotPassword");

	setRequestLocale(locale);

	return (
		<main className="flex flex-col gap-25">
			{t("title")}
			<FormForgotPassword />
		</main>
	);
}
