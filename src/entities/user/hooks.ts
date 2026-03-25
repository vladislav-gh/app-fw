"use client";

import { useQuery } from "@tanstack/react-query";

import { getQueryOptionsUser } from "./api";

export function useUser() {
	const { data } = useQuery({
		...getQueryOptionsUser(),
	});

	return data ?? null;
}
