
import { Link } from "react-router-dom"
export function BlogCard({postItem}){

    let date=new Date(postItem.dateCreated)
    let stringDate=date.toString()
    return (

        
        <Link to={`/ReadBlog/${postItem._id}`} className="m-4 p-4 border-radius-10 ">
         <h1>{postItem.title}</h1>
        <h2>{postItem.Description}</h2>
        <h3>{stringDate.slice(4,15)}</h3>
        </Link>
       
    )
}