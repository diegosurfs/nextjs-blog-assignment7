// Imports the Head component for page metadata.
import Head from "next/head";

// Imports the Link component for navigation between pages.
import Link from "next/link";

// Imports the function that reads all Markdown post information.
import { getSortedPostsData } from "../lib/posts-json";

// Imports the CSS module used to style the homepage.
import styles from "../styles/Home.module.css";

// Defines the homepage component and receives the post data as a prop.
export default function Home({ allPostsData }) {
  // Returns the HTML structure for the homepage.
  return (
    <div>
      <Head>
        <title>Diego's Next.js Blog</title>
        <meta
          name="description"
          content="A simple blog created with Next.js."
        />
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>NEXT.JS BLOG</p>
          <h1>Welcome to My Next.js Blog</h1>
          <p className={styles.description}>
            This is my blog created while learning Next.js, React, and
            JavaScript.
          </p>
        </section>

        <section className={styles.about}>
          <h2>Blog Posts</h2>

          <ul>
            {allPostsData.map(({ id, title, date }) => (
              <li key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small>{date}</small>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

// Gets the Markdown post information at build time.
export async function getStaticProps() {
  // Reads and sorts all Markdown posts from the posts directory.
  const allPostsData = getSortedPostsData();

  // Sends the post information to the homepage component as props.
  return {
    props: {
      allPostsData,
    },
  };
}