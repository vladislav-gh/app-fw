import type { Locale } from "@Shared/i18n";
import type { PropsWithChildren } from "react";

import { ProviderGlobalData } from "./GlobalData";
import { ProviderNextIntl } from "./NextIntl";
import { ProviderQuery } from "./Query";
import { ProviderTheme } from "./Theme";

export interface ProvidersProps extends PropsWithChildren {
	locale: Locale;
}

export function Providers({ locale, children }: ProvidersProps) {
	return (
		<ProviderTheme>
			<ProviderNextIntl locale={locale}>
				<ProviderQuery>
					<ProviderGlobalData>{children}</ProviderGlobalData>
				</ProviderQuery>
			</ProviderNextIntl>
		</ProviderTheme>
	);
}
