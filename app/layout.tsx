import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Dinka - To Be Social",
  description: "Dinka is a social media app",
};
import  SessionProvider from "@/app/Providers/SessionProvider";
export default function RootLayout({
  children,
}: any) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
            <SessionProvider>
              {children}
            </SessionProvider>
      </body>
    </html>
  );
}
