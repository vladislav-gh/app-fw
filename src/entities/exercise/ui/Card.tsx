import type { ElProps } from "@Shared/types";

import { cn } from "@Shared/utils";

export type CardExerciseProps = ElProps<"div">;

export function CardExercise({ className, ...restProps }: CardExerciseProps) {
	return (
		<div className={cn("", className)} {...restProps}>
			Card Exercise
		</div>
	);
}
