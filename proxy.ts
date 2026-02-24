import type { NextRequest } from "next/server";

import createMiddleware from "next-intl/middleware";

import { updateSession } from "@Shared/api/supabase";
import { routing } from "@Shared/i18n";

export async function proxy(request: NextRequest) {
	const nextIntlResponse = createMiddleware(routing)(request);

	return await updateSession(request, nextIntlResponse);
}

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
