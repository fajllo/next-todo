import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>to do </title>
        <meta
          name="description"
          content="next js to-do list boilerplate with firebase backend"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}></main>

      <footer className={styles.footer}>created by filip sordyl 2022</footer>
    </div>
  );
}
