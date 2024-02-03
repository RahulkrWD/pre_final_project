import React from 'react';
import { Link } from "react-router-dom";
import styles from "../HomePage/Footer.module.css";

function Footer() {
    // JSX for rendering the Footer component
    return (
        <>
            {/* Footer container */}
            <div className={`${styles.container}`}>
                {/* Copyright information */}
                <center>
                    <h3>Copyright Developer 2023. All Rights Reserved</h3>
                </center>
                {/* Links section with flex layout */}
                <div className={`d-flex justify-content-evenly ${styles.links}`}>
                    {/* Home and Orders links */}
                    <div>
                        <Link className={`${styles.links}`}>Home</Link>
                        <br />
                        <Link className={`${styles.links}`}>Orders</Link>
                    </div>
                    {/* About Us and Contact Us links */}
                    <div>
                        <Link className={`${styles.links}`}>About Us</Link>
                        <br />
                        <Link className={`${styles.links}`}>Contact Us</Link>
                    </div>
                    {/* Visit our Website and Links links */}
                    <div>
                        <Link className={`${styles.links}`}>Visit our WebSite</Link>
                        <br />
                        <Link className={`${styles.links}`}>Links</Link>
                    </div>
                </div>
                {/* Social media icons section */}
                <center>
                    <Link>
                        <i className={`fa-brands fa-linkedin-in ${styles.iconsLinkedin}`}></i>
                    </Link>
                    <Link>
                        <i className={`fa-brands fa-github ${styles.iconsGithub}`}></i>
                    </Link>
                    <Link>
                        <i className={`fa-brands fa-instagram ${styles.iconsInsta}`}></i>
                    </Link>
                </center>
            </div>
        </>
    );
}

export default Footer;
