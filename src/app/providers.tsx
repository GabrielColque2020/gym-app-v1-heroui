"use client";

import type { ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type ProvidersProps = {
	children: ReactNode;
};

export function Providers( { children }: ProvidersProps ) {
	const [ queryClient ] = useState(
		() =>
			new QueryClient( {
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: true,
					},
				},
			} ),
	);

	return <QueryClientProvider client={ queryClient }>{ children }</QueryClientProvider>;
}
