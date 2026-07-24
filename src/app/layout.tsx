import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/next";
import { Toast } from "@heroui/react";
import { getAuthenticatedSession } from "@/features/auth/session";
import { themePreferenceToUiThemePreference } from "@/features/theme/theme-preference";
import { PwaServiceWorker } from "./pwa-service-worker";
import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Gym App",
  description: "Gym App dashboard for coaches and students.",
  manifest: "/manifest.webmanifest",
  title: "Gym App",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Gym App",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/app-icon.svg", type: "image/svg+xml" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/apple-icon",
    shortcut: "/app-icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#f1f4fb", media: "(prefers-color-scheme: light)" },
    { color: "#0f172b", media: "(prefers-color-scheme: dark)" },
  ],
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
          <PwaServiceWorker />
          { children }
          <Toast.Provider placement={ "top end" } />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
