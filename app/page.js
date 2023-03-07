import Link from "next/link";
import Date from "@/components/date";
import Layout, { siteTitle } from "./layout";
import utilStyles from "./utils.module.css";
import { getSortedPostsData } from "../lib/posts";

export default async function Home() {
  const allPostsData = await getStaticProps();
  return (
    <>
      {" "}
      <section className={utilStyles.headingMd}>
        <p>made with beta version of app router.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();

  return allPostsData;
}
