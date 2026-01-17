import type { Locale } from "@Shared/i18n";
import type { PropsWithChildren } from "react";

import { ProviderNextIntl } from "./NextIntl";

export interface ProvidersProps extends PropsWithChildren {
	locale: Locale;
}

export function Providers({ locale, children }: ProvidersProps) {
	return <ProviderNextIntl locale={locale}>{children}</ProviderNextIntl>;
}
