import React from 'react';
import styles from "../Listing/Filter.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";

function CuisineFilter({ setCuisine }) {
    // Extracting 'mealId' from URL parameters
    const { mealId } = useParams();
    
    // Base URL for fetching filtered results
    let url = "http://localhost:4200/restaurant/filter";
    
    // Function to handle cuisine selection and fetch filtered results
    function handleCuisine(event) {
        let cuisineId = event.target.value;
        let cuisineUrl;

        // Constructing the URL with cuisine parameter
        if (cuisineUrl === "") {
            cuisineUrl = `${url}/${mealId}`;
        } else {
            cuisineUrl = `${url}/${mealId}?cuisineId=${cuisineId}`;
        }

        // Fetching data from the API based on the selected cuisine
        axios.get(cuisineUrl).then((res) => {
            setCuisine(res.data);
        });
    }

    // JSX for rendering the CuisineFilter component
    return (
        <>
            <div>
                {/* Dropdown for selecting cuisine */}
                <select className={styles.select} onChange={handleCuisine}>
                    <option>-- Cuisine --</option>
                    <option value="">All</option>
                    <option value="1">North Indian</option>
                    <option value="2">South Indian</option>
                    <option value="3">Chinese</option>
                    <option value="4">Fast Food</option>
                    <option value="5">Street Food</option>
                </select>
            </div>

            {/* Radio buttons for cuisine selection */}
            <div className={styles.cuisineInput}>
                <h6>Cuisine</h6>
                <div>
                    <input
                        type="radio"
                        name="cuisine"
                        id="all"
                        value=""
                        onChange={handleCuisine}
                    />
                    <label htmlFor="all">All</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="cuisine"
                        id="north indian"
                        value="1"
                        onChange={handleCuisine}
                    />
                    <label htmlFor="north indian">North Indian</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="cuisine"
                        id="south indian"
                        value="2"
                        onChange={handleCuisine}
                    />
                    <label htmlFor="south indian">South Indian</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="cuisine"
                        id="chinese"
                        value="3"
                        onChange={handleCuisine}
                    />
                    <label htmlFor="chinese">Chinese</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="cuisine"
                        id="fast food"
                        value="4"
                        onChange={handleCuisine}
                    />
                    <label htmlFor="fast food">Fast Food</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="cuisine"
                        id="street food"
                        value="5"
                        onChange={handleCuisine}
                    />
                    <label htmlFor="street food">Street Food</label>
                </div>
            </div>
        </>
    );
}

export default CuisineFilter;
