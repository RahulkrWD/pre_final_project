import React, { useEffect, useState } from 'react';
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import styles from "../HomePage/Search.module.css";

function Search() {
    // State to store the list of states
    const [states, setStates] = useState([]);
    
    // State to store the selected state
    const [selectedState, setSelectedState] = useState("");
    
    // State to store the list of restaurants based on the selected state
    const [restaurants, setRestaurants] = useState([]);

    // Fetch states from the API
    async function fetchStates() {
        try {
            const response = await axios.get("https://trails-6dwz.onrender.com/location");
            setStates(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    // Fetch restaurants based on the selected state
    async function fetchRestaurants() {
        try {
            const response = await axios.get(
                `https://trails-6dwz.onrender.com/restaurant/restaurants?stateId=${selectedState}`
            );
            setRestaurants(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    // useEffect to fetch states on component mount
    useEffect(() => {
        fetchStates();
    }, []);

    // useEffect to fetch restaurants when the selectedState changes
    useEffect(() => {
        if (selectedState) {
            fetchRestaurants();
        }
    }, [selectedState]);

    // Map state data to options for Select component
    const stateOptions = states.map((data) => ({
        value: data.state_id,
        label: data.state,
    }));

    // Map restaurant data to options for Select component
    const restaurantOptions = restaurants.map((data) => ({
        value: data.restaurant_id,
        label: (
            <Link
                to={`/details?restId=${data.restaurant_id}`}
                className={styles.link}
            >
                <img className={styles.searchImg} src={data.restaurant_thumb} alt="" />
                <h6 className={styles.restaurantName}>{data.restaurant_name}</h6>
                <p className={styles.restaurantAddress}>{data.address}</p>
            </Link>
        ),
    }));

    // JSX for rendering the component
    return (
        <>
            <div className={styles.dropdownContainer}>
                {/* Select dropdown for locations (states) */}
                <div className="locations">
                    <Select
                        className={styles.select}
                        options={stateOptions}
                        placeholder="-- Select your location --"
                        onChange={(selectedOption) =>
                            setSelectedState(selectedOption.value)
                        }
                    />
                </div>
                {/* Select dropdown for restaurants */}
                <div className="restaurants">
                    <Select
                        className={styles.select}
                        options={restaurantOptions}
                        placeholder="-- Select restaurants --"
                    />
                </div>
            </div>
        </>
    );
}

export default Search;
