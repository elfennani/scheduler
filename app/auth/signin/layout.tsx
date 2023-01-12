import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "pages/api/auth/[...nextauth]";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await unstable_getServerSession(authOptions);
    if (session) redirect("/dashboard");
    return children;
}
