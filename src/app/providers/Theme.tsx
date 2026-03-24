import type { PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";

export function ProviderTheme(props: PropsWithChildren) {
	return <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props} />;
}
