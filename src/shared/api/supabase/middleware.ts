import type { NextRequest, NextResponse } from "next/server";
import type { Database } from "./types";

import { createServerClient } from "@supabase/ssr";

import { SUPABASE_KEY, SUPABASE_URL } from "./config";

export async function updateSession(request: NextRequest, response: NextResponse) {
	const supabase = createServerClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) => void request.cookies.set(name, value));
				cookiesToSet.forEach(({ name, value, options }) => void response.cookies.set(name, value, options));
			},
		},
	});

	const { data } = await supabase.auth.getClaims();
	const user = data?.claims;

	if (!user && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/auth")) {
		// 	const url = request.nextUrl.clone();
		// 	url.pathname = "/login";
		// 	return NextResponse.redirect(url);
	}

	return response;
}
