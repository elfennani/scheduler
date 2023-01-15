// import Providers from "@/features/common/components/Providers";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { Outfit } from "@next/font/google";
// import GlobalStyle from "@/features/common/components/GlobalStyle";
import StyledComponentsRegistry from "./registry";
import Providers from "@/common/components/Providers";

const outfit = Outfit({
    weight: ["400", "500"],
    subsets: ["latin"],
    display: "block",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <head />
            <body
                className={`${outfit.className} bg-slate-50 dark:bg-slate-900 dark:text-white`}
            >
                <StyledComponentsRegistry>
                    <>
                        <Providers>{children}</Providers>
                    </>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
