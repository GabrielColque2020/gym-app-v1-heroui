import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Toast } from "@heroui/react";
import { getAuthenticatedSession } from "@/features/auth/session";
import { themePreferenceToUiThemePreference } from "@/features/theme/theme-preference";
import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  description: "A multi-page dashboard starter built with HeroUI Pro.",
  title: "HeroUI Pro - Dashboard Template",
};

export default async function RootLayout( { children }: { children: ReactNode } ) {
  const session = await getAuthenticatedSession();
  const defaultTheme = themePreferenceToUiThemePreference( session?.themePreference ?? "SYSTEM" );

  return (
    <html
      suppressHydrationWarning
      className={ "bg-background text-foreground" }
      lang={ "en" }
    >
      <body className={ "font-sans antialiased" }>
        <Providers defaultTheme={ defaultTheme }>
          { children }
          <Toast.Provider placement={ "top end" } />
        </Providers>
      </body>
    </html>
  );
}
