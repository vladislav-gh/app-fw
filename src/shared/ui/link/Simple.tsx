import type { ElProps } from "@Shared/types";

export type LinkSimpleProps = ElProps<"a">;

export function LinkSimple(props: LinkSimpleProps) {
	return <a rel={props.target === "_blank" ? "noopener noreferrer nofollow" : undefined} {...props} />;
}
