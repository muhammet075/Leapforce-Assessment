import { useEffect } from "react";
import Head from "next/head";
import Adminpanel from "@/components/admin-panel";

export default function Home() {
  useEffect(() => {
  });

  return (
    <>
      <Head>
          <title>Admin panel</title>
          <meta name="description" content=""/>
          <meta name="og:description" content=""/>
          <meta name="keywords" content=""/>
          <meta property="og:url" content=""/>
          <meta property="og:title" content=""/>
      </Head>
      <Adminpanel/>
    </>
  );
}
