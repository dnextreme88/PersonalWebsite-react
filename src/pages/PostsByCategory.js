import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Unauthorized from '../components/ui/Alerts/Unauthorized'
import Loading from '../components/Spinners/Loading'
import Posts from '../components/Blog/Posts'
import { SendGetRequest } from '../helpers/SendApiRequest'
import classes from './PostsByCategory.module.css'

function PostsByCategoryPage(props) {
    const auth = useSelector((state) => state.auth.value)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState('')
    const [posts, setPosts] = useState([])

    const params = useParams()
    const categoryId = params.categoryId ? params.categoryId : props.categoryId

    useEffect(() => {
        (async function fetchData() {
            const responseA = await SendGetRequest(auth.bearerToken, `api/blog/categories/${categoryId}`)
            if (!responseA.error) setCategory(responseA)

            const responseB = await SendGetRequest(auth.bearerToken, `api/blog/posts/categories/${categoryId}`)
            if (!responseB.error) setPosts(responseB)

            setIsAuth(true)
            setIsLoading(false)
        })()
    }, [auth.bearerToken, categoryId])

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div>
            {posts.length > 0 ?
                <>
                <h1>Viewing all posts for category: {category.name}</h1>
                <Posts posts={posts} />
                </>
                :
                <div className={classes.noPosts}>There are no posts for category: <strong>{category.name}</strong></div>
            }
        </div>
    )
}

export default PostsByCategoryPage