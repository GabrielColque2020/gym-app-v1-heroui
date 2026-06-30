"use client";

import type { ReactNode } from "react";

import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useState } from "react";

import {
	QUERY_PERSIST_BUSTER,
	QUERY_PERSIST_MAX_AGE_MS,
	QUERY_PERSIST_STORAGE_KEY,
	shouldPersistQuery,
} from "@/constants/query";

type ProvidersProps = {
	children: ReactNode;
};

const queryPersistStorage = {
	getItem: ( key: string ) => {
		if (typeof window === "undefined") return null;

		return window.localStorage.getItem( key );
	},
	removeItem: ( key: string ) => {
		if (typeof window === "undefined") return;

		window.localStorage.removeItem( key );
	},
	setItem: ( key: string, value: string ) => {
		if (typeof window === "undefined") return;

		window.localStorage.setItem( key, value );
	},
};

export function Providers( { children }: ProvidersProps ) {
	const [ queryClient ] = useState(
		() => new QueryClient(),
	);
	const [ persister ] = useState( () =>
		createSyncStoragePersister( {
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
			{ children }
		</PersistQueryClientProvider>
	);
}
