import { Skeleton } from "@heroui/react";

type SkeletonBlockProps = {
	className: string;
};

export function SkeletonBlock( { className }: SkeletonBlockProps ) {
	return <Skeleton aria-hidden={ true } className={ className } />;
}
