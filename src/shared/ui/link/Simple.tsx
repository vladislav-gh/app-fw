import type { ElProps } from "@Shared/types";
import type { FC } from "react";

export type LinkSimpleProps = ElProps<"a">;

export const LinkSimple: FC<LinkSimpleProps> = props => (
	<a rel={props.target === "_blank" ? "noopener noreferrer nofollow" : undefined} {...props} />
);
