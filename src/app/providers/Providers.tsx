import type { Locale } from "@Shared/i18n";
import type { PropsWithChildren } from "react";

import { ProviderNextIntl } from "./NextIntl";
import { ProviderQuery } from "./Query";

export interface ProvidersProps extends PropsWithChildren {
	locale: Locale;
}

export function Providers({ locale, children }: ProvidersProps) {
	return (
		<ProviderNextIntl locale={locale}>
			<ProviderQuery>{children}</ProviderQuery>
		</ProviderNextIntl>
	);
}
