import type { ElProps } from "@Shared/types";

import { cn } from "@Shared/utils";

export type CardWorkoutProps = ElProps<"div">;

export function CardWorkout({ className, ...restProps }: CardWorkoutProps) {
	return (
		<div className={cn("", className)} {...restProps}>
			Card Workout
		</div>
	);
}
