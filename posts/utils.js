import axios from "axios"
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from "remark";
import html from "remark-html"

const myPostDirectory = path.join(process.cwd(),"posts","datafiles");
console.log(process.cwd())

export function getSortedPostData(){
    const fileNames = fs.readdirSync(myPostDirectory)
    console.log("filenames hereko - ",fileNames);

    const postData = fileNames.map((filename) =>{
        let fileId = filename.replace(/\.md$/,"")
        
        let fullpath = path.join(myPostDirectory,filename)

        let fileContents = fs.readFileSync(fullpath,"utf8");
        const matterresult = matter(fileContents)
        return {
            fileId,
            ...matterresult.data
        }
    })
    
    return postData.sort(({date:a},{date:b})=>{
        if(a<b){
            return 1;
        } else if(a>b){
            return -1;
        } else
            return 0
    })
}


export async function getAllPostIds(){
    const directory = path.join(process.cwd(),"posts","datafiles")
    const filenames = fs.readdirSync(directory,"utf8")


    const paths = filenames.map(filename =>{
        const fileId = filename.replace(/\.md/,"")
        return {
            params:{
                id:fileId
            }
        }
    })

    return  paths
}

export async function getPostData(id){
    const fullpath = path.join(myPostDirectory,`${id}.md`);
    const fileContents = fs.readFileSync(fullpath,'utf8');

    const matterResult = matter(fileContents)

    const processedContent = await remark()
    .use(html) 
    .process(matterResult.content)

    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}

