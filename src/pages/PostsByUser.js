import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Unauthorized from '../components/ui/Alerts/Unauthorized'
import Loading from '../components/Spinners/Loading'
import Posts from '../components/Blog/Posts'
import { SendGetRequest } from '../helpers/SendApiRequest'
import classes from './PostsByUser.module.css'

function PostsByUserPage(props) {
    const auth = useSelector((state) => state.auth.value)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState('')
    const [posts, setPosts] = useState([])

    const params = useParams()
    const userId = params.userId ? params.userId : props.userId

    useEffect(() => {
        (async function fetchData() {
            const responseA = await SendGetRequest(auth.bearerToken, `api/users/${userId}`)
            if (!responseA.error) setUser(responseA)

            const responseB = await SendGetRequest(auth.bearerToken, `api/blog/posts/users/${userId}`)
            if (!responseA.error) setPosts(responseB)

            setIsAuth(true)
            setIsLoading(false)
        })()
    }, [auth.bearerToken, userId])

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div>
            {posts.length > 0 ?
                <>
                <h1>Viewing all posts of: {user.username} ({user.email})</h1>
                <Posts posts={posts} />
                </>
                :
                <div className={classes.noPosts}><strong>{user.username}</strong> currently has no posts!</div>
            }
        </div>
    )
}

export default PostsByUserPage