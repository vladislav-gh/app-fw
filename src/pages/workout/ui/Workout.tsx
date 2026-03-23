"use client";

import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getQueryOptionsWorkout } from "@Entities/workout";

export function Workout() {
	const params = useParams<{ id: string }>();

	const { data: workout, isLoading } = useQuery(getQueryOptionsWorkout(params?.id ?? ""));

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!workout) {
		notFound();
	}

	return (
		<div className="flex flex-col gap-3">
			Workout id: {workout.id}
			<div className="flex flex-col gap-2">
				<div>Date: {workout.date}</div>
				<div>Duration: {workout.duration}</div>
				<div>User weight: {workout.userWeight}</div>
				<div>Notes: {workout.notes}</div>
			</div>
		</div>
	);
}
