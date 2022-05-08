import { React, useEffect, useState } from 'react'
import DeleteCategoryModal from '../../ui/Modals/DeleteCategoryModal'
import EditCategoryModal from '../../ui/Modals/EditCategoryModal'
import Loading from '../../ui/Spinners/Loading'
import classes from './index.module.scss'

function Categories(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        setIsLoading(false)
        setCategories(props.categories)
    }, [props.categories])

    function handleEditCategory(categoryData) {
        props.onEditCategory(categoryData)
    }

    function handleDeleteCategory(categoryId) {
        props.onDeleteCategory(categoryId)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <p>This blog contains the following categories:</p>
                <ul className={classes.categoryList}>
                {categories.map((category) =>
                        <li className={classes.category} key={category.id}>
                            <div className={classes.name}>
                                {category.name}
                            </div>
                            <div className={classes.actions}>
                                <EditCategoryModal categoryId={category.id} name={category.name} onEditCategory={handleEditCategory} />
                                &nbsp;&nbsp;
                                <DeleteCategoryModal categoryId={category.id} onDeleteCategory={handleDeleteCategory} />
                            </div>
                        </li>
                    )
                }
                </ul>
        </div>
    )
}

export default Categories