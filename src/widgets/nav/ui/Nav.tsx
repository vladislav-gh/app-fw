"use client";

import { DumbbellIcon, HomeIcon, LogInIcon, UserIcon } from "lucide-react";

import { PAGES } from "@Shared/config";
import { Link } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { useUser } from "@Entities/user";

const ITEMS = [
	{
		href: PAGES.home,
		label: "Home",
		icon: HomeIcon,
	},
	{
		href: PAGES.workouts,
		label: "Workouts",
		icon: DumbbellIcon,
	},
	{
		href: PAGES.profile,
		label: "Profile",
		icon: UserIcon,
		isAuthenticated: true,
	},
	{
		href: PAGES.signIn,
		label: "Sign in",
		icon: LogInIcon,
		isAuthenticated: false,
	},
] as const;

export function Nav() {
	const user = useUser();

	return (
		<nav
			className={cn(
				"fixed inset-0 top-auto z-30 flex justify-center text-center p-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] font-bold",
			)}
		>
			<div className="flex items-center gap-2 w-full bg-accent rounded-4xl max-w-96">
				{ITEMS.filter(item =>
					"isAuthenticated" in item && typeof item.isAuthenticated === "boolean"
						? item.isAuthenticated === !!user
						: true,
				).map(item => (
					<Link key={item.href} className="flex-1 p-2 flex flex-col items-center gap-1 text-xs" href={item.href}>
						{item.icon && <item.icon className="size-[1em] text-lg" />}
						{item.label}
					</Link>
				))}
			</div>
		</nav>
	);
}
