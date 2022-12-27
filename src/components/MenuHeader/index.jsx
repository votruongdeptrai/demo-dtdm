import React, { useEffect, useState } from 'react'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../actions/index'

import { Link } from 'react-router-dom'

const MenuHeader = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [dispatch]);


    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {
                        category.parentId ? <Link
                            to={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                            {category.name}
                            {category.children.length > 0 ? <span><i style={{ marginLeft: 6, fontSize: 10, color: '#cecece' }} className="fa-solid fa-caret-right"></i></span> : null}
                        </Link> :
                            <span>
                                <span>{category.name}</span>
                                {category.children.length > 0 ? (<i style={{ marginLeft: 6, fontSize: 8, color: '#cecece' }} className="fa-solid fa-chevron-down"></i>) : null}
                            </span>
                    }
                    {category.children.length > 0 ? (<ul>
                        {renderCategories(category.children)}
                    </ul>) : null}
                </li>
            );
        }
        return myCategories;
    }
    return (
        <>
            <div className="menuHeader">
                <ul>
                    {category.categories.length > 0 ? renderCategories(category.categories) : null}
                </ul>
            </div>
        </>
    )
}

export default MenuHeader