import type { ElProps } from "@Shared/types";
import type { ComponentProps, FC } from "react";

import { Link as NextLink } from "@Shared/i18n";
import { twcx } from "@Shared/utils";

import { LinkSimple } from "./Simple";

export type LinkProps = ElProps<"a"> &
	Partial<ComponentProps<typeof NextLink>> & {
		simple?: boolean;
		email?: string;
	};

export const Link: FC<LinkProps> = ({ className, href, simple, email, children, ...restProps }) => {
	let to = href;
	let content = children;

	if (email) {
		to = `mailto:${email}`;
		content ??= email.replace(/\?.*$/, "");
	}

	const commonLinkProps = {
		className: twcx(
			{
				"text-nowrap": email,
			},
			className,
		),
		href: to ?? "",
		...restProps,
	};

	if (simple || email) {
		return <LinkSimple {...commonLinkProps}>{content}</LinkSimple>;
	}

	return <NextLink {...commonLinkProps}>{content}</NextLink>;
};
