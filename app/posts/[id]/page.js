import { getAllPostIds, getPostData } from "@/lib/posts";
import Date from "@/components/date";
import utilStyles from "../../utils.module.css";

export const dynamicParams = false;

export default async function Post({ params }) {
  const { id } = params;
  const postData = await getPost(id);
  return (
    <>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}

export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths;
}

export async function getPost(id) {
  const postData = await getPostData(id);
  return postData;
}

export async function generateMetadata({ params, searchParams }) {
  const postData = await getPost(params.id);
  return { title: postData.title };
}
