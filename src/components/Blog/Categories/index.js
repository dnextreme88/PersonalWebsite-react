import { React, useEffect, useState } from 'react'
import Loading from '../../ui/Spinners/Loading'
import classes from './index.module.css'

function Categories(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setCategories(props.categories)
        setIsLoading(false)
    }, [props.categories])
    
    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <p>This blog contains the following categories:</p>
                <ul className={classes.categoryList}>
                {categories.map((category) =>
                        <li className={classes.category} key={category.id}>{category.name}</li>
                    )    
                }
                </ul>
        </div>
    )
}

export default Categories