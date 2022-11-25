import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../posts/utils";
import Head from "next/head";
import Date from "../../components/date";

export default function Post({mypost}){
    console.log("my postData - ",mypost)
    return <>
        <Layout>
            <Head>
                <title>{mypost.title}</title>
            </Head>
            {mypost}
            {/* <div>
                <Date dateString={mypost.date} />
            </div> */}
            <div dangerouslySetInnerHTML={{__html:mypost.contentHtml}}></div>
        </Layout>
    </>
}

export async function getStaticPaths(){

    //Also i had to add await here since getAllPostIds is asynchronous function
    //don't just copy and paste from documentation , sometimes it won't work
    const paths = await getAllPostIds()
    return {
        paths:paths,
        fallback:false
    };
}

export async function getStaticProps({params}){

    //also add await here though it is not mentioned in the nodejs documentation
    const postData = await getPostData(params.id)

    //I had to add this line JSON.stringify otherwise it doesn't work
    const mypost = JSON.stringify(postData)


    return {
        props:{
            mypost
        }
    }
}