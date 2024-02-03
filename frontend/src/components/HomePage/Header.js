import React from 'react';
import styles from "../HomePage/Header.module.css";
import Search from "../HomePage/Search";
import NavBar from "../HomePage/NavBar";

function Header() {
    // JSX for rendering the Header component
    return (
        <>
            {/* Header section with background image */}
            <header className={styles.bgImg}>
                {/* Navigation bar component */}
                <NavBar />
                {/* Centered container for logo, title, and search component */}
                <center className={styles.container}>
                    <div className="web-site logo">
                        {/* Logo with the text "e!" */}
                        <h1 className={styles.titleLogo}>e!</h1>
                    </div>
                    {/* Subtitle for the header */}
                    <h1 className={`text-white m-2 p-2`}>
                        Find the best Restaurants, cafes, and bars
                    </h1>
                    {/* Search component for restaurant search */}
                    <Search />
                </center>
            </header>
        </>
    );
}

export default Header;
