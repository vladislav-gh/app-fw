import { CardExercise, getExercisesSystem } from "@Entities/exercise";

export async function ListSystem() {
	const exercisesSystem = await getExercisesSystem();

	return (
		<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
			{exercisesSystem.map(exercise => (
				<CardExercise key={exercise.id} exercise={exercise} />
			))}
		</div>
	);
}
