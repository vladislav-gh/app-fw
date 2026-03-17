import { queryOptions } from "@tanstack/react-query";

import { getUser } from "./actions";
import { QUERY_KEYS_USER } from "./query-keys";

export const getQueryOptionsUser = () =>
	queryOptions({
		queryKey: QUERY_KEYS_USER.me,
		queryFn: getUser,
	});
