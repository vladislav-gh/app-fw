import { CardExercise, getExercisesUser } from "@Entities/exercise";
import { getUser } from "@Entities/user";

export async function ListUser() {
	const user = await getUser();

	if (!user) {
		return null;
	}

	const exercisesUser = await getExercisesUser({ userId: user.id });

	return (
		<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
			{exercisesUser.map(exercise => (
				<CardExercise
					key={exercise.id}
					exerciseId={exercise.id}
					exerciseName={String(exercise.name)}
					exerciseDescription={exercise.description ?? undefined}
					isEditable
					isRemovable
				/>
			))}
		</div>
	);
}
