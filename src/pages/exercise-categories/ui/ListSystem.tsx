import { CardExerciseCategory, getExerciseCategoriesSystem } from "@Entities/exercise-category";

export async function ListSystem() {
	const exerciseCategoriesSystem = await getExerciseCategoriesSystem();

	return (
		<div className="flex flex-col gap-3">
			{exerciseCategoriesSystem.map(category => (
				<CardExerciseCategory key={category.id} category={category} />
			))}
		</div>
	);
}
