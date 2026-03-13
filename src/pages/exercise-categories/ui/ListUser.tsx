import { CardExerciseCategory, getExerciseCategoriesUser } from "@Entities/exercise-category";
import { getUser } from "@Entities/user";

export async function ListUser() {
	const user = await getUser();

	if (!user) {
		return null;
	}

	const exerciseCategoriesUser = await getExerciseCategoriesUser({ userId: user.id });

	return (
		<div className="flex flex-col gap-3">
			{exerciseCategoriesUser.map(category => (
				<CardExerciseCategory
					key={category.id}
					categoryId={category.id}
					categoryName={String(category.name)}
					isEditable
					isRemovable
				/>
			))}
		</div>
	);
}
