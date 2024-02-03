import React from 'react';
import styles from "../Listing/Filter.module.css"

function SortFilter() {
    // JSX for rendering the SortFilter component
    return (
        <>
            <div>
                {/* Dropdown for selecting sorting option */}
                <div>
                    <select className={styles.select}>
                        <option>-- Sort --</option>
                        <option value="1">Price low to high</option>
                        <option value="-1">Price high to low</option>
                    </select>
                </div>
                {/* Radio buttons for sorting options */}
                <div className={styles.sortInput}>
                    <h6 className='pt-3'>Sort</h6>
                    {/* Option: Price low to high */}
                    <div>
                        <input type="radio" name="sort" id='lowToHigh' />
                        <label htmlFor='lowToHigh'>Price low to high</label>
                    </div>
                    {/* Option: Price high to low */}
                    <div>
                        <input type="radio" name="sort" id='highToLow' />
                        <label htmlFor='highToLow'>Price high to low</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SortFilter;
