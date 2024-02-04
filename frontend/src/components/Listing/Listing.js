import React, { useState, useEffect } from 'react';
import NavBar from "../HomePage/NavBar";
import CuisineFilter from "../Listing/CuisineFilter";
import CostFilter from "../Listing/CostFilter";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import MealFilter from "../Listing/MealFilter";
import styles from "../Listing/Listing.module.css";
import SortFilter from "../Listing/SortFilter";

function Listing() {
  // State for storing restaurant data
  const [meal, setMeal] = useState([]);
  
  // Get the 'mealId' from URL params
  const { mealId } = useParams();
  
  // State for managing current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Function to fetch restaurant data based on 'mealId'
  const fetchMeal = async () => {
    try {
      const response = await axios.get(
        `https://trails-6dwz.onrender.com/restaurants?mealId=${mealId}`
      );
      setMeal(response.data);
    } catch (err) {
      console.log("Invalid mealId", err);
      setMeal([]); // Set meal to an empty array if there's an error or no results
    }
  };

  // Function to set filtered data from child components (CuisineFilter, CostFilter, SortFilter)
  function setDataFilter(data) {
    setMeal(data);
  }

  // Fetch restaurant data on component mount or when 'mealId' changes
  useEffect(() => {
    fetchMeal();
  }, [mealId]);

  // Pagination logic
  const itemsPerPage = 2;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = meal.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change in pagination
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {/* Navbar with dark background */}
      <div className="bg-dark">
        <NavBar />
      </div>
     
      {/* Main container */}
      <div className="container">
        <div className={`${styles.listing}`}>
          {/* Filter Area */}
          <div className={`${styles.filterArea}`}>
            <h5 className={styles.filterHeading}>Filters</h5>
            <div className={styles.filter}>
              {/* Child component to filter by cuisine */}
              <CuisineFilter setCuisine={setDataFilter} />
              
              {/* Child component to filter by cost */}
              <CostFilter setCost={setDataFilter} />
              
              {/* Child component to filter by sorting */}
              <SortFilter setSort={setDataFilter} />
            </div>
          </div>
          
          {/* Display Meal Items */}
          <center>
            <div className={styles.mealItems}>
              {/* Check if there are no results */}
              {currentItems.length === 0 ? (
                <h1 className='text-danger'>No result found</h1>
              ) : (
                // Map through currentItems and render MealFilter component
                currentItems.map((items, index) => (
                  <MealFilter key={index} listData={items} />
                ))
              )}
              
              {/* Display pagination if total items are greater than itemsPerPage */}
              {meal.length > itemsPerPage && (
                <Pagination
                  count={Math.ceil(meal.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                  className={styles.pagination}
                />
              )}
            </div>
          </center>
        </div>
      </div>
    </>
  );
}

export default Listing;
