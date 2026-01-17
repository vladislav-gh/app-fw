import type { Formats, MarkupTranslationValues, RichTranslationValues, TranslationValues } from "next-intl";

export type TFunction = {
	<TargetKey>(key: TargetKey, values?: TranslationValues, formats?: Formats): string;
	rich<TargetKey>(key: TargetKey, values?: RichTranslationValues, formats?: Formats): React.ReactNode;
	markup<TargetKey>(key: TargetKey, values?: MarkupTranslationValues, formats?: Formats): string;
	// biome-ignore lint/suspicious/noExplicitAny: false
	raw<TargetKey>(key: TargetKey): any;
	has<TargetKey>(key: TargetKey): boolean;
};
