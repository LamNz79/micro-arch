import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import "./globals.css";
import Provider from '@/providers/Provider';
import { AppShellLayout } from '@/shared/components/AppShellLayout';
import { ColorSchemeScript } from '@mantine/core';


export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Provider>
          <AppShellLayout>{children}</AppShellLayout>
        </Provider>
      </body>
    </html>
  );
}
