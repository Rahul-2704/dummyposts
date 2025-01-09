import React from 'react'
import {useState,useLayoutEffect} from 'react'
import { useParams } from 'react-router-dom'
import usePostDetails from '../hooks/usePostDetails.ts';
import { useNavigate } from 'react-router-dom';

export const PostDetails=()=>{
    const navigate=useNavigate()
    const [found,setFound]=useState<Boolean>(false);
    let {id}=useParams();
   
    let title=`Post ${id}`
    const {comments,loading,user,post}=usePostDetails(id);

    // to validate the id
    useLayoutEffect(()=>{
        console.log("calling from postDetails page")
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            if (response.status===404) {
                setFound(false)
                navigate('/error',{replace:true})
            }
            else{
                setFound(true)
                console.log("Inside else")
            }
        })
        .catch(error => {
            // Handle errors, including network errors and HTTP errors
            console.error('Error:', error.message);
        });
    },[id,navigate])

    if(post!==undefined) {
        title=post.title
        document.title=title
        document.querySelector('meta[name="description"]')?.setAttribute('content',`Post"s information for post id:${id}`)
    }

    console.log("After some time",loading)
    return(
        <>
        {found&&!loading&&<main>  
            {<header className='p-4 ml-4 border-b-2 border-black-800'>
                <a href='\posts' className="text-gray-900"><button className='mr-2'>{'\u2190 '}</button>Go Back To All Posts</a>
            </header>
            }
            {/* add post desc (suggetion) */}
            <div>
            {post&&<div className='border-b-2 border-black-500 p-2 ml-4'>
                <h1 className='text-bold text-4xl mb-2'>{post.title}</h1>
                <h1 className='text-1xl text-gray-500'>{post.body}</h1>
            </div>
            }
            </div>
            
            {/* comments section will be here */}
            {<div className='p-2 ml-4'>
                <h2 className="text-2xl font-semibold mb-2 ">Comments</h2>
                {/* {comments.length === 0 && <p>No comments available.</p>} */}

                <ul className="space-y-4">
                    {comments.map((comment) => (
                        <li key={comment.id} className="p-4 border border-gray-300 rounded-lg shadow-sm">
                        <p className="font-semibold">{comment.name}</p>
                        <p className="italic text-gray-600">{comment.email}</p>
                        <p>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
            }
            {/* user section here */}
            {/* user details of post creator */}
        
            {user&&
                <div className="mb-4 p-4 border-t-2 border-black-400 ml-4">
                <h2 className="text-2xl font-semibold">Uploaded By</h2>
                <div className='flex space-x-4 p-2'>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
                </div>
            </div>}
        </main>
        }
        </>
    )
}