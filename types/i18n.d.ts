import type messages from "@Locales/en.json";
import type { routing } from "@Shared/i18n";

declare module "next-intl" {
	interface AppConfig {
		Locale: (typeof routing.locales)[number];
		Messages: typeof messages;
	}
}
