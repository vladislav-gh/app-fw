import type { NextRequest } from "next/server";
import type { Database } from "./types";

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { PAGES } from "@Shared/config";

import { SUPABASE_KEY, SUPABASE_URL } from "./config";

const publicRoutes = [PAGES.signUp, PAGES.signIn, PAGES.forgotPassword];
const privateRoutes: "*" | string[] = "*";

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

	if (
		!user &&
		((privateRoutes === "*" && !publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) ||
			(Array.isArray(privateRoutes) && privateRoutes.some(route => request.nextUrl.pathname.startsWith(route))))
	) {
		console.log("tut");
		const url = request.nextUrl.clone();

		url.pathname = PAGES.signIn;

		return NextResponse.redirect(url);
	} else if (user && publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
		const url = request.nextUrl.clone();

		url.pathname = PAGES.profile;

		return NextResponse.redirect(url);
	}

	return response;
}
