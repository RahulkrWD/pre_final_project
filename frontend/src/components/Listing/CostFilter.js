import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import styles from "../Listing/Filter.module.css";

function CostFilter({ setCost }) {
    // Extracting 'mealId' from URL parameters
    const { mealId } = useParams();
    
    // Base URL for fetching filtered results
    let url = "https://trails-6dwz.onrender.com/filter";

    // Function to filter results based on cost range
    function filterCost(event) {
        let cost = event.target.value.split("-");
        let lcost = cost[0];
        let hcost = cost[1];

        // Constructing the URL with cost parameters
        let costUrl = `${url}/${mealId}?lcost=${lcost}&hcost=${hcost}`;

        // Fetching data from the API based on the cost range
        axios.get(costUrl).then((res) => {
            setCost(res.data);
        });
    }

    // JSX for rendering the CostFilter component
    return (
        <>
            <div>
                {/* Dropdown for selecting cost range */}
                <div>
                    <select className={styles.select} onChange={filterCost}>
                        <option>-- Cost For Two --</option>
                        <option value="1-500">Less than 500</option>
                        <option value="501-1000">500 to 1000</option>
                        <option value="1001-1500">1000 to 1500</option>
                        <option value="1501-2000">1500 to 2000</option>
                        <option value="20001-3000">2000+</option>
                    </select>
                </div>

                {/* Radio buttons for cost range */}
                <div className={styles.costInput}>
                    <h6 className="pt-3">Cost For Two</h6>
                    <div>
                        <input
                            type="radio"
                            name="cost"
                            id="500"
                            value="1-500"
                            onChange={filterCost}
                        />
                        <label htmlFor="500">Less than 500</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="cost"
                            id="1000"
                            value="501-1000"
                            onChange={filterCost}
                        />
                        <label htmlFor="1000">500 to 1000</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="cost"
                            id="1500"
                            value="1001-1500"
                            onChange={filterCost}
                        />
                        <label htmlFor="1500">1000 to 1500</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="cost"
                            id="2000"
                            value="1501-2000"
                            onChange={filterCost}
                        />
                        <label htmlFor="2000">1500 to 2000</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="cost"
                            id="2000+"
                            value="2001-3000"
                            onChange={filterCost}
                        />
                        <label htmlFor="2000+">2000+</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CostFilter;
