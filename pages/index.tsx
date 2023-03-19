import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
      </Head>
      <Header label='Home' />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  )
}
