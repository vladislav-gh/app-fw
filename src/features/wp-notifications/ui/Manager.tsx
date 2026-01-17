"use client";

import { useEffect, useState } from "react";

import { Button, Text } from "@Shared/ui";
import { urlBase64ToUint8Array } from "@Shared/utils";

import { sendNotification, subscribeUser, unsubscribeUser } from "../actions";
import { VAPID_PUBLIC_KEY } from "../config";

export function WPNotificationsManager() {
	const [isSupported, setIsSupported] = useState(false);
	const [subscription, setSubscription] = useState<PushSubscription | null>(null);
	const [message, setMessage] = useState("");

	useEffect(() => {
		if ("serviceWorker" in navigator && "PushManager" in window) {
			setIsSupported(true);
			registerServiceWorker();
		}
	}, []);

	async function registerServiceWorker() {
		const registration = await navigator.serviceWorker.register("/sw.js", {
			scope: "/",
			updateViaCache: "none",
		});

		const sub = await registration.pushManager.getSubscription();

		setSubscription(sub);
	}

	async function subscribeToPush() {
		const registration = await navigator.serviceWorker.ready;
		const sub = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
		});

		setSubscription(sub);

		const serializedSub = JSON.parse(JSON.stringify(sub));

		await subscribeUser(serializedSub);
	}

	async function unsubscribeFromPush() {
		await subscription?.unsubscribe();

		setSubscription(null);

		await unsubscribeUser();
	}

	async function sendTestNotification() {
		if (subscription) {
			await sendNotification(message);

			setMessage("");
		}
	}

	if (!isSupported) {
		return;
	}

	return (
		<div className="fixed top-4 right-4 rounded-2xl p-4 bg-white/10 backdrop-blur-lg z-30 flex flex-col gap-2">
			<Text variant="h4" weight={700} align="center">
				Push Notifications
			</Text>

			{subscription ? (
				<>
					<Text color="primary" align="center">
						You are subscribed to push notifications.
					</Text>

					<Button variant="secondary" onClick={unsubscribeFromPush}>
						Unsubscribe
					</Button>

					<input
						className="border border-white/25 rounded-lg py-1 px-3"
						type="text"
						placeholder="Enter notification message"
						value={message}
						onChange={e => setMessage(e.target.value)}
					/>

					<Button variant="secondary" onClick={sendTestNotification}>
						Send Test
					</Button>
				</>
			) : (
				<>
					<Text color="primary" align="center">
						You are not subscribed to push notifications.
					</Text>

					<Button variant="secondary" onClick={subscribeToPush}>
						Subscribe
					</Button>
				</>
			)}
		</div>
	);
}
