"use client";

import { useEffect, useState } from "react";

import { Button, Text } from "@Shared/ui";

export function WPNotificationsInstallPrompt() {
	const [isIOS, setIsIOS] = useState(false);
	const [isStandalone, setIsStandalone] = useState(false);

	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: false
		setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

		setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
	}, []);

	if (isStandalone) {
		return null; // Don't show install button if already installed
	}

	return (
		<div className="fixed bottom-4 right-4 rounded-2xl p-4 bg-white/10 backdrop-blur-lg z-30 flex flex-col gap-2">
			<Text variant="h4" weight={700} align="center">
				Install App
			</Text>

			<Button variant="secondary">Add to Home Screen</Button>

			{isIOS && (
				<p>
					To install this app on your iOS device, tap the share button
					<span role="img" aria-label="share icon">
						{" "}
						⎋{" "}
					</span>
					and then "Add to Home Screen"
					<span role="img" aria-label="plus icon">
						{" "}
						➕{" "}
					</span>
					.
				</p>
			)}
		</div>
	);
}
