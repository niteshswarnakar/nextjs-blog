import fs from "fs"
import path from "path"
import matter from "gray-matter"

const directory = path.join(process.cwd(),"datafiles")
const filenames = fs.readdirSync(directory,"utf8")

// const result = filenames.map(filename =>{

//     const fileId = filename.replace(/\.md$/,"")

//     const fileContents = fs.readFileSync(path.join(directory,filename))
//     const matterResult = matter(fileContents)

//     return {
//         id:fileId,
//         content:matterResult
//     }
// })

const paths = filenames.map(filename =>{
    const fileId = filename.replace(/\.md/,"")
    return {
        params:{
            id:fileId
        }
    }
})

console.log(typeof paths)
console.log(paths)