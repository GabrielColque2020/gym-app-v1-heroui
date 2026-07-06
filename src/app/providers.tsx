"use client";

import type { ReactNode } from "react";

import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";
import { ThemeProvider } from "next-themes";

import {
	QUERY_PERSIST_BUSTER,
	QUERY_PERSIST_MAX_AGE_MS,
	QUERY_PERSIST_STORAGE_KEY,
	shouldPersistQuery,
} from "@/constants/query";
import { ThemeRouteSync } from "@/components/layout/theme-route-sync";
import { HEROUI_THEME_STORAGE_KEY } from "@/features/theme/theme-preference";

type ProvidersProps = {
	children: ReactNode;
	defaultTheme: "system" | "light" | "dark";
};

const queryPersistStorage = {
	getItem: async ( key: string ) => {
		if (typeof window === "undefined") return null;

		return window.localStorage.getItem( key );
	},
	removeItem: async ( key: string ) => {
		if (typeof window === "undefined") return;

		window.localStorage.removeItem( key );
	},
	setItem: async ( key: string, value: string ) => {
		if (typeof window === "undefined") return;

		window.localStorage.setItem( key, value );
	},
};

export function Providers( { children, defaultTheme }: ProvidersProps ) {
	const [ queryClient ] = useState(
		() => new QueryClient(),
	);
	const [ persister ] = useState( () =>
		createAsyncStoragePersister( {
			key: QUERY_PERSIST_STORAGE_KEY,
			storage: queryPersistStorage,
		} ),
	);

	return (
		<PersistQueryClientProvider
			client={ queryClient }
			persistOptions={ {
				buster: QUERY_PERSIST_BUSTER,
				dehydrateOptions: {
					shouldDehydrateQuery: shouldPersistQuery,
				},
				maxAge: QUERY_PERSIST_MAX_AGE_MS,
				persister,
			} }
		>
			<ThemeProvider
				attribute={ "class" }
				defaultTheme={ defaultTheme }
				disableTransitionOnChange
				enableSystem
				storageKey={ HEROUI_THEME_STORAGE_KEY }
			>
				<ThemeRouteSync/>
				{ children }
			</ThemeProvider>
		</PersistQueryClientProvider>
	);
}
