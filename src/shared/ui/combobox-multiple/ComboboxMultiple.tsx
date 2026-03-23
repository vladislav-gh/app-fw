"use client";

import type { ComponentProps, ReactNode } from "react";

import { Fragment } from "react";

import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@Shared/ui";

interface Item {
	label: string;
	value: string;
	isSelected?: boolean;
}

export interface ComboboxMultipleProps extends Omit<ComponentProps<typeof Combobox>, "items" | "defaultValue"> {
	className?: string;
	items: Item[];
	emptyMessage?: ReactNode;
	placeholder?: string;
}

export function ComboboxMultiple({
	className,
	items,
	emptyMessage = "No items found.",
	placeholder,
	...restProps
}: ComboboxMultipleProps) {
	const anchor = useComboboxAnchor();

	const selectedItems = items.filter(item => item.isSelected);

	return (
		<Combobox multiple items={items} defaultValue={selectedItems} {...restProps}>
			<ComboboxChips ref={anchor} className={className}>
				<ComboboxValue>
					{(values: Item[]) => (
						<Fragment>
							{values.map(item => (
								<ComboboxChip key={item.value}>{item.label}</ComboboxChip>
							))}

							<ComboboxChipsInput placeholder={placeholder} />
						</Fragment>
					)}
				</ComboboxValue>
			</ComboboxChips>

			<ComboboxContent anchor={anchor}>
				{emptyMessage && <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>}

				<ComboboxList>
					{(item: Item) => (
						<ComboboxItem key={item.value} value={item}>
							{item.label}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
