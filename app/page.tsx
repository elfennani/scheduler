import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

type Props = {};

const Index = async (props: Props) => {
    const session = await unstable_getServerSession(authOptions);

    if (!session) redirect("/auth/signin");

    redirect("/dashboard");
};

export default Index;
