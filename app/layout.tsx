// import Providers from "@/features/common/components/Providers";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { Outfit } from "@next/font/google";
// import GlobalStyle from "@/features/common/components/GlobalStyle";
import StyledComponentsRegistry from "./registry";
import Providers from "@/common/components/Providers";

const outfit = Outfit({ weight: ["400", "500"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html>
            <head />
            <body className={`${outfit.className} bg-slate-50`}>
                <StyledComponentsRegistry>
                    <>
                        <Providers>{children}</Providers>
                    </>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
