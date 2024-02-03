import React from 'react';
import { Link } from "react-router-dom";
import styles from "../Listing/MealFilter.module.css"

function MealFilter({ listData }) {
    // JSX for rendering the MealFilter component
    return (
        <>
            <div className={`${styles.mealFilter} container`}>
                {/* Restaurant image */}
                <div className={styles.img}>
                    <img className={styles.img} src={listData.restaurant_thumb} alt="" />
                </div>

                {/* Restaurant details */}
                <div className={styles.titles}>
                    {/* Link to restaurant details page */}
                    <Link
                        to={`/details?restId=${listData.restaurant_id}`}
                        className={styles.restaurantName}>
                        {listData.restaurant_name}
                    </Link>
                    <p>{listData.address}</p>
                    <span className={styles.rating}>{listData.rating_text} </span>
                    <p>{`Price:- Rs ${listData.cost}`}</p>

                    {/* Displaying meal types */}
                    <div className="mealTypes">
                        <span className={`badge text-bg-primary ${styles.mealName}`}>
                            {listData.mealTypes[0].mealtype_name}
                        </span>
                        <span className={` badge text-bg-info ${styles.mealname}`}>
                            {listData.mealTypes[1].mealtype_name}
                        </span>
                    </div>

                    {/* Displaying cuisines */}
                    <div className="cuisines">
                        <span className={`badge text-bg-danger ${styles.cuisines}`}>
                            {listData.cuisines[0].cuisine_name}
                        </span>
                        <span className={`badge text-bg-warning ${styles.cuisines}`}>
                            {listData.cuisines[1].cuisine_name}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MealFilter;
