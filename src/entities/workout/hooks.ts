import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getQueryOptionsWorkout } from "./api";

export function useWorkout() {
	const params = useParams<{ id: string }>();

	const { data, isLoading } = useQuery(getQueryOptionsWorkout(params?.id ?? ""));

	return {
		workout: data,
		isLoading,
	};
}
