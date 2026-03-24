"use client";

import type { ChangeEvent } from "react";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { NativeSelect, NativeSelectOption } from "@Shared/ui";

export function Theme() {
	const t = useTranslations("theme");
	const { theme, setTheme } = useTheme();

	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value);
	};

	return (
		<div className="flex items-center gap-2">
			Theme:
			<NativeSelect onChange={handleChange} value={theme}>
				<NativeSelectOption value="light">{t("light")}</NativeSelectOption>
				<NativeSelectOption value="dark">{t("dark")}</NativeSelectOption>
				<NativeSelectOption value="system">{t("system")}</NativeSelectOption>
			</NativeSelect>
		</div>
	);
}
