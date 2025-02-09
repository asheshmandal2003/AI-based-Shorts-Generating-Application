import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Provider children={children}></Provider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
