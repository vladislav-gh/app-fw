export type RepositoryMapper<TRow, TEntity> = (row: TRow) => TEntity;

export interface RepositoryGetAllOptions {
	selectQuery?: string;
}

export interface RepositoryGetByIdOptions {
	id: string;
	selectQuery?: string;
}

export interface RepositoryInsertOptions<T> {
	payload: T;
}

export interface RepositoryUpdateOptions<T> {
	id: string;
	payload: T;
}

export interface RepositoryDeleteOptions {
	id: string;
}
