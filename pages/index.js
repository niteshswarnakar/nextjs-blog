import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostData } from '../posts/utils';
import Link from 'next/link';

export async function getStaticProps(){
  const allPostData = getSortedPostData();
  return {
    props: {
      allPostData,
    },
  };
}

export default function Home({allPostData}) {
  
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>

        <p>I am Nitesh Swarnakar and this is my nextjs app</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
        <h2 className={`${utilStyles.headingXL}`}>Blogs</h2>
        <div>{allPostData.map((data,index)=>{
            return <ul key = {index}>
              <Link href = {`/posts/${data.fileId}`}>{data.title}</Link>
              <h4>{data.date}</h4>
            </ul>
        })}</div>
      </section>
    </Layout>
  );
}