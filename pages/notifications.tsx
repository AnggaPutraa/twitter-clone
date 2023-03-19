import Header from "@/components/Header";
import NotificationFeed from "@/components/notifications/notificationfeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return {
        props: {
            session
        }
    }
}

const Notifications = () => {

    return (
        <>
            <Head>
                <title>Notifications</title>
            </Head>
            <Header label="Notifications" showBackArrow />
            <NotificationFeed />
        </>
    );
}

export default Notifications;