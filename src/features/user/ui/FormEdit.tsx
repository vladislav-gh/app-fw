"use client";

import type { ElProps } from "@Shared/types";

import { useActionState, useEffect, useEffectEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button, Input } from "@Shared/ui";
import { cn } from "@Shared/utils";
import { QUERY_KEYS_USER, useUser } from "@Entities/user";

import { updateUserAction } from "../api";

export interface FormUserEditProps extends ElProps<"form"> {
	onSuccess?: () => void;
}

export function FormUserEdit({ className, onSuccess, ...restProps }: FormUserEditProps) {
	const [state, dispatchAction] = useActionState(updateUserAction, null);
	const queryClient = useQueryClient();
	const user = useUser();

	const handleSuccess = useEffectEvent(() => {
		if (user && state?.success && state.data) {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS_USER.me });

			onSuccess?.();
		}
	});

	useEffect(() => {
		handleSuccess();
	}, [state]);

	if (!user) {
		return null;
	}

	return (
		<form className={cn("flex flex-col gap-4", className)} action={dispatchAction} {...restProps}>
			<Input name="name" placeholder="Enter your name" defaultValue={user.name ?? undefined} />
			<Input name="nickname" placeholder="Enter your nickname" defaultValue={user.nickname ?? undefined} />
			<Input
				type="date"
				name="birthDate"
				placeholder="Enter your birthday"
				defaultValue={user.birthDate ?? undefined}
			/>
			<Input type="number" name="weight" placeholder="Enter your weight" defaultValue={user.weight ?? undefined} />

			<Button type="submit">Save</Button>
		</form>
	);
}
