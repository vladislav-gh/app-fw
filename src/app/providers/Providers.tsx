import type { Locale } from "@Shared/i18n";
import type { FC, PropsWithChildren } from "react";

import { ProviderNextIntl } from "./NextIntl";

export type ProvidersProps = PropsWithChildren & {
	locale: Locale;
};

export const Providers: FC<ProvidersProps> = ({ locale, children }) => {
	return <ProviderNextIntl locale={locale}>{children}</ProviderNextIntl>;
};
