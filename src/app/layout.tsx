import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Toast } from "@heroui/react";
import { getAuthenticatedSession } from "@/features/auth/session";
import { themePreferenceToUiThemePreference } from "@/features/theme/theme-preference";
import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  description: "Gym App dashboard for coaches and students.",
  title: "Gym App",
  icons: {
    icon: [
      { url: "/app-icon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/apple-icon",
    shortcut: "/app-icon.svg",
  },
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
