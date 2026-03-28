export type ActionResultSuccess<T> = {
	success: true;
	data?: T;
};

export type ActionResultError = {
	success: false;
	error: string;
	fields?: Record<string, string>;
};

export type ActionResult<T = unknown> = ActionResultSuccess<T> | ActionResultError | null;
