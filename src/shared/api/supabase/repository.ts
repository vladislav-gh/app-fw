import type { SupabaseClient } from "@supabase/supabase-js";
import type {
	Database,
	RepositoryDeleteOptions,
	RepositoryGetAllOptions,
	RepositoryGetByIdOptions,
	RepositoryInsertOptions,
	RepositoryMapper,
	RepositoryUpdateOptions,
} from "./types";

export function createSupabaseRepository<TRow, TEntity>(
	supabase: SupabaseClient,
	table: keyof Database["public"]["Tables"],
	mapper: RepositoryMapper<TRow, TEntity>,
) {
	return {
		async getAll({ selectQuery }: RepositoryGetAllOptions = {}): Promise<TEntity[]> {
			const { data, error } = await supabase.from(table).select(selectQuery ?? "*");

			if (error) throw error;

			return (data as TRow[]).map(mapper);
		},

		async getById({ id, selectQuery }: RepositoryGetByIdOptions): Promise<TEntity | null> {
			const { data, error } = await supabase
				.from(table)
				.select(selectQuery ?? "*")
				.eq("id", id)
				.single();

			if (error) throw error;

			return mapper(data as TRow);
		},

		async insert({ payload }: RepositoryInsertOptions<Partial<TRow>>): Promise<TEntity> {
			const { data, error } = await supabase.from(table).insert(payload).select().single();

			if (error) throw error;

			return mapper(data as TRow);
		},

		async update({ id, payload }: RepositoryUpdateOptions<Partial<TRow>>): Promise<TEntity> {
			const { data, error } = await supabase.from(table).update(payload).eq("id", id).select().single();

			if (error) throw error;

			return mapper(data as TRow);
		},

		async delete({ id }: RepositoryDeleteOptions) {
			const { error } = await supabase.from(table).delete().eq("id", id);

			if (error) throw error;
		},
	};
}
