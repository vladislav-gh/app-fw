import type { Locale } from "@Shared/i18n";
import type { PropsWithChildren } from "react";

import { Nunito } from "next/font/google";

import { twcx } from "@Shared/utils";
import { Providers } from "@App/providers";

import "@App/styles";

import { WPNotificationsInstallPrompt, WPNotificationsManager } from "@Features/wp-notifications";

const fontPrimary = Nunito({
	subsets: ["latin"],
	variable: "--font-primary",
	display: "swap",
	weight: ["400", "500", "600", "700"],
	style: ["normal"],
});

export interface LayoutRootProps extends PropsWithChildren {
	params: Promise<{ locale: string }>;
}

export async function LayoutRoot({ params, children }: LayoutRootProps) {
	const { locale } = await params;

	return (
		<html
			className={twcx("box-border w-full overflow-x-clip overscroll-none", fontPrimary.variable)}
			lang={locale}
			suppressHydrationWarning
		>
			<body
				id="__next"
				className={twcx(
					"font-primary bg-background text-text text-body-d flex min-h-dvh w-full flex-col overflow-x-clip overscroll-none scroll-smooth antialiased",
					"lg:text-body",
				)}
			>
				<Providers locale={locale as Locale}>
					{children}

					<WPNotificationsManager />
					<WPNotificationsInstallPrompt />
				</Providers>
			</body>
		</html>
	);
}
