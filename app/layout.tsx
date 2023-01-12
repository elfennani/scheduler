import Providers from "@/features/common/components/Providers";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <head />
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
