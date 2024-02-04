import React, { useEffect, useState } from 'react';
import styles from "../HomePage/Quicksearch.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function QuickSearch() {
    // State to store the quick search data
    const [quickSearch, setQuickSearch] = useState([]);

    // Function to fetch quick search data from the server
    async function fetchQuickSearch() {
        try {
            const res = await axios.get("http://localhost:4200/restaurant/quicksearch");
            setQuickSearch(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    // useEffect to fetch quick search data on component mount
    useEffect(() => {
        fetchQuickSearch();
    }, []); // Empty dependency array ensures it runs only once on mount

    // JSX for rendering the component
    return (
        <>
            <div className={`container mt-5`}>
                <h1 className={`${styles.heading}`}>Quick Searches</h1>
                <p className={`${styles.tag} mt-3`}>
                    Discover restaurants by type of meal
                </p>
                <div className={`${styles.cardFlex}`}>
                    {quickSearch.map((data) => (
                        // Link to the individual mealtype page
                        <Link key={data.mealtype_id} className={`card ${styles.card}`} to={`/${data.mealtype}/${data.mealtype_id}`}>
                            <div>
                                {/* Display the mealtype image */}
                                <img
                                    src={data.meal_image}
                                    className={`card-img-top ${styles.image}`}
                                    alt=""
                                />
                            </div>

                            <div className={`card-body`}>
                                {/* Display the mealtype name */}
                                <h5 className={`card-title ${styles.mealType}`}>
                                    {data.mealtype}
                                </h5>
                                {/* Display the mealtype description */}
                                <p className={`card-text ${styles.description}`}>
                                    {data.content}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default QuickSearch;
