import Head from "next/head";
import Sidebar from "../componets/Sidebar";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Whatsapp 2.0</title>
            </Head>
            <Sidebar />
        </div>
    );
}