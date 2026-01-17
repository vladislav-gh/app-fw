import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { SUPABASE_KEY, SUPABASE_URL } from "./config";

export const createClientMiddleware = (request: NextRequest) => {
	// Create an unmodified response
	let supabaseResponse = NextResponse.next({
		request: {
			headers: request.headers,
		},
	});

	// biome-ignore lint/correctness/noUnusedVariables: false
	const supabase = createServerClient(SUPABASE_URL, SUPABASE_KEY, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) => void request.cookies.set(name, value));
				supabaseResponse = NextResponse.next({
					request,
				});
				cookiesToSet.forEach(({ name, value, options }) => void supabaseResponse.cookies.set(name, value, options));
			},
		},
	});

	return supabaseResponse;
};
