// Imports the Head component so we can set the browser page title and metadata.
import Head from "next/head";

// Imports the Link component so users can navigate back to the homepage.
import Link from "next/link";

// Imports the functions that find post IDs and read individual Markdown posts.
import { getAllPostIds, getPostData } from "../../lib/posts-json";

// Imports the CSS module used to style the post page.
import styles from "../../styles/Home.module.css";

// Creates the page for an individual blog post.
export default function Post({ postData }) {
  // Creates a readable date from the date stored in the Markdown file.
  const publishedDate = new Date(`${postData.date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Returns the HTML structure for the individual blog post.
  return (
    <div className={styles.postContainer}>
      <Head>
        <title>{postData.title} | Diego's Next.js Blog</title>
        <meta
          name="description"
          content={`Read ${postData.title} on Diego's Next.js Blog.`}
        />
      </Head>

      <article className={styles.post}>
        <p className={styles.eyebrow}>BLOG POST</p>

        <h1>{postData.title}</h1>

        <p className={styles.postText}>
          Published: {publishedDate}
        </p>

        <div
          className={styles.postText}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />

        <Link className={styles.button} href="/">
          ← Back to Home
        </Link>
      </article>
    </div>
  );
}

// Creates the list of possible post URLs when the site is built.
export async function getStaticPaths() {
  // Gets the IDs of all Markdown posts.
  const paths = getAllPostIds();

  // Tells Next.js to generate a page for every Markdown post.
  return {
    paths,
    fallback: false,
  };
}

// Gets the data for a specific post when the page is generated.
export async function getStaticProps({ params }) {
  // Reads and converts the requested Markdown post into HTML.
  const postData = await getPostData(params.id);

  // Sends the post data to the Post component.
  return {
    props: {
      postData,
    },
  };
}