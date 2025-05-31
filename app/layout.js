import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserContextProvider } from "../contextApi/UserContext"

export const metadata = {
  title: "SnipStash",
  description: "SnipStash is a tool that helps you save and share your code snippets.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <UserContextProvider>
            {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
