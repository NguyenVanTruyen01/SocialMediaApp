import { React, useEffect } from 'react'
import './ListPost.scss'
import Post from "./Post/Post"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import * as PostApi from '../../../api/PostRequest.js'
import { useParams } from 'react-router-dom'

const Posts = () => {

    const params = useParams();

    const { user } = useSelector((state) => state.authReducer.authData)
    const [listPost, setListPost] = useState([])

    const getListPosts = async (id) => {
        const posts = await PostApi.getTimeLinePosts(id)
        setListPost(posts.data)
    };

    useEffect(() => {
        getListPosts(user._id);
    }, []);

    return (
        <div className='ListPost'>
            {
                !listPost ? "Fetching data ..." :

                    !params.id ?
                        listPost.map((post, id) => {
                            return <Post post={post}
                                key={id}
                            />
                        }) :

                        listPost.filter((post) => post.userId === params.id).map((post, id) => {
                            return <Post post={post}
                                key={id}
                            />
                        })
            }
        </div>
    )
}
export default Posts










// import { React, useEffect } from 'react'
// import './ListPost.scss'
// import { PostsData } from "../../../data/PostData"
// import Post from "./Post/Post"
// import { useDispatch, useSelector } from 'react-redux'
// import { getTimeLinePosts } from '../../../actions/PostAction'
// import { useState } from 'react'

// const Posts = () => {
//     const dispatch = useDispatch();
//     let { posts, loading } = useSelector((state) => state.postReducer)
//     const { user } = useSelector((state) => state.authReducer.authData)

//     useEffect(() => {
//         dispatch(getTimeLinePosts(user._id))
//     }, []);

//     return (
//         <div className='ListPost'>
//             {
//                 loading ? "Fetching data ..." :
//                     posts.map((post, id) => {
//                         return <Post post={post} key={id} />
//                     })}
//         </div>
//     )
// }

// export default Posts
