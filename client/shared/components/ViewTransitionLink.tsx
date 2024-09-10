"use client";

import { useViewTransitionsRouter } from "../hooks/useViewTransitionsRouter";
import type { ComponentProps, FC } from "react";
import Link from "next/link";

type Props = ComponentProps<typeof Link>;

export const ViewTransitionsLink: FC<Props> = ({ ...nextLinkProps }) => {
	const router = useViewTransitionsRouter();

	const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		router.push(e.currentTarget.href.toString());
	};

	return <Link {...nextLinkProps} onClick={handleLinkClick} />;
};
