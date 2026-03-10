import type { ElProps } from "@Shared/types";

import { cn } from "@Shared/utils";

export type BadgeExerciseCategoryProps = ElProps<"div">;

export function BadgeExerciseCategory({ className, ...restProps }: BadgeExerciseCategoryProps) {
	return (
		<div className={cn("", className)} {...restProps}>
			Badge Exercise Category
		</div>
	);
}
