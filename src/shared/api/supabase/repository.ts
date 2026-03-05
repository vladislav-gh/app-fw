import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

type Mapper<TRow, TEntity> = (row: TRow) => TEntity;

export function createSupabaseRepository<TRow, TEntity>(
	supabase: SupabaseClient,
	table: keyof Database["public"]["Tables"],
	mapper: Mapper<TRow, TEntity>,
) {
	return {
		async findAll(): Promise<TEntity[]> {
			const { data, error } = await supabase.from(table).select("*");

			if (error) throw error;

			return (data as TRow[]).map(mapper);
		},

		async findById(id: string): Promise<TEntity | null> {
			const { data, error } = await supabase.from(table).select("*").eq("id", id).single();

			if (error) throw error;

			return mapper(data as TRow);
		},

		async insert(payload: Partial<TRow>): Promise<TEntity> {
			const { data, error } = await supabase.from(table).insert(payload).select().single();

			if (error) throw error;

			return mapper(data as TRow);
		},

		async insertMany(payload: Partial<TRow>[]): Promise<TEntity[]> {
			const { data, error } = await supabase.from(table).insert(payload).select();

			if (error) throw error;

			return (data as TRow[]).map(mapper);
		},

		async update(id: string, payload: Partial<TRow>): Promise<TEntity> {
			const { data, error } = await supabase.from(table).update(payload).eq("id", id).select().single();

			if (error) throw error;

			return mapper(data as TRow);
		},

		async delete(id: string) {
			const { error } = await supabase.from(table).delete().eq("id", id);

			if (error) throw error;
		},
	};
}
