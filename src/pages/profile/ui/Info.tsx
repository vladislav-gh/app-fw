"use client";

import { useState } from "react";

import { Button } from "@Shared/ui";
import { useUser } from "@Entities/user";
import { FormUserEdit } from "@Features/user";

export function Info() {
	const [isEditing, setIsEditing] = useState(false);

	const user = useUser();

	if (!user) {
		return;
	}

	return (
		<div className="flex flex-col gap-3">
			<div>id: {user.id}</div>

			{isEditing ? (
				<>
					<FormUserEdit onSuccess={() => setIsEditing(false)} />

					<Button onClick={() => setIsEditing(false)}>Cancel</Button>
				</>
			) : (
				<>
					{user.name && <div>Name: {user.name}</div>}
					{user.nickname && <div>Nickname: {user.nickname}</div>}
					{user.birthDate && <div>Birthday: {user.birthDate}</div>}
					{user.weight && <div>Weight: {user.weight}</div>}

					<Button onClick={() => setIsEditing(true)}>Edit</Button>
				</>
			)}
		</div>
	);
}
