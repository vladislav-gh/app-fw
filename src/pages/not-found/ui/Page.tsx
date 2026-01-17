import { useTranslations } from "next-intl";

import { PAGES } from "@Shared/config";
import { Link, Text } from "@Shared/ui";
import { twcx } from "@Shared/utils";

export function Page() {
	const t = useTranslations("pageNotFound");

	return (
		<main
			className={twcx(
				"flex min-h-full flex-col items-center justify-center gap-2 px-3 py-20 text-center",
				"lg:gap-4 lg:px-10",
			)}
		>
			<Text as="h1" variant="h1" weight={700} color="secondary">
				{t("title")}
			</Text>

			<Text as="h2" variant="h2" weight={600}>
				{t("subtitle")}
			</Text>

			<Text className="py-4" as="p" weight={500} color="accent">
				{t("text")}
			</Text>

			<Link
				className={twcx(
					"bg-secondary rounded-xl px-4 py-2 font-bold",
					"lg:hover:bg-accent lg:px-5 lg:py-3 lg:transition-colors",
				)}
				href={PAGES.home}
			>
				{t("buttons.home")}
			</Link>
		</main>
	);
}
