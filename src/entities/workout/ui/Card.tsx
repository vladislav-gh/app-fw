import type { ElProps } from "@Shared/types";
import type { Workout } from "../model";

import { PAGES } from "@Shared/config";
import { Badge, Button, Card, CardFooter, CardTitle, Link } from "@Shared/ui";
import { cn } from "@Shared/utils";

export interface CardWorkoutProps extends ElProps<"div"> {
	workout: Workout;
}

export function CardWorkout({ className, workout, ...restProps }: CardWorkoutProps) {
	return (
		<Card className={cn("p-4 gap-2", className)} {...restProps}>
			<CardTitle className="font-bold">{workout.id}</CardTitle>

			<div>Date: {workout.date}</div>
			<div>Duration: {workout.duration}</div>
			<div>Notes: {workout.notes}</div>
			<div>Weight: {workout.userWeight}</div>

			{!!workout.categories.length && (
				<div className="flex items-center flex-wrap gap-1">
					{workout.categories.map(category => (
						<Badge key={category} variant="secondary">
							{category}
						</Badge>
					))}
				</div>
			)}

			<CardFooter className="px-0">
				<Button asChild>
					<Link href={PAGES.workout(workout.id)}>View</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
