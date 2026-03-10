import type { ElProps } from "@Shared/types";

import { cn } from "@Shared/utils";

export type CardExerciseCategoryProps = ElProps<"div">;

export function CardExerciseCategory({ className, ...restProps }: CardExerciseCategoryProps) {
	return (
		<div className={cn("", className)} {...restProps}>
			Card Exercise Category
		</div>
	);
}
