import * as React from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../Details/MenuList.module.css";
function MenuList({ heading }) {
  // State to store menu data
  const [menu, setMenu] = React.useState("");
  // Get the restaurant ID from the URL
  const { search } = useLocation();
  const menuId = search.split("=")[1];
  const navigate = useNavigate();

  // State to store selected menu items and total price
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  // Function to fetch menu data from the server
  async function fetchMenuData() {
    try {
      const response = await axios.get(
        `https://trails-6dwz.onrender.com/restaurant/menu/${menuId}`
      );
      setMenu(response.data);
      sessionStorage.setItem("restaurant", heading.restaurant_name);
    } catch (err) {
      console.log("server error", err);
    }
  }
  // Function to add an item to the selected items list
  function placeOrder(item) {
    const updatedItems = [...selectedItems, item];
    const updatedTotalPrice = calculateTotalPrice(updatedItems);
    setSelectedItems(updatedItems);
    setTotalPrice(updatedTotalPrice);
  }

  // Function to remove an item from the selected items list
  function removeOrder(item) {
    const itemIndex = selectedItems.indexOf(item);
    if (itemIndex !== -1) {
      const updatedItems = [...selectedItems];
      updatedItems.splice(itemIndex, 1);
      const updatedTotalPrice = calculateTotalPrice(updatedItems);
      setSelectedItems(updatedItems);
      setTotalPrice(updatedTotalPrice);
    }
  }
  // Function to proceed to payment
  function proceed() {
    sessionStorage.setItem("menu", JSON.stringify(selectedItems));
    sessionStorage.setItem("totalPrice", totalPrice);
    // console.log(selectedItems)

    // navigate the next page
    localStorage.getItem("authtoken")
      ? navigate(`/placeOrder/${heading.restaurant_name}`)
      : navigate("/login");
  }

  // Function to calculate the total price of selected items
  function calculateTotalPrice(items) {
    return items.reduce((total, item) => {
      const menuItem = menu.find((menuItem) => menuItem.menu_name === item);
      return total + (menuItem ? parseFloat(menuItem.menu_price) : 0);
    }, 0);
  }
  // Fetch menu data when the component mounts
  React.useEffect(() => {
    fetchMenuData();
  });

  // State for the modal
  const [open, setOpen] = React.useState(false);

  // Render the component
  return (
    <>
      <React.Fragment>
        {/* Button to open the modal */}
        <Button
          className="btn text-bg-danger fs-5"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          Menu
        </Button>
        {/* Modal component */}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Modal content */}
          <Sheet
            variant="outlined"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            {/* Modal title */}
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              {/* Restaurant heading */}
              <div className="heading">
                <h3>{heading.restaurant_name}</h3>
              </div>
            </Typography>
            {/* Modal content */}
            <Typography id="modal-desc" textColor="text.tertiary">
              {/* Menu items */}
              <div className={styles.container}>
                {menu ? (
                  <>
                    {menu.map((items) => (
                      <div className={styles.menuItems} key={items.menu_name}>
                        {/* Menu item details */}
                        <div className={styles.list}>
                          <i
                            className={`fa-solid fa-seedling ${styles.pureVegIcons}`}
                          ></i>
                          <h6>{items.menu_name}</h6>
                          <p className="fw-bold">&#x20B9; {items.menu_price}</p>
                          <span className={styles.descriptions}>
                            {items.description}
                          </span>
                        </div>
                        {/* Menu item image and controls */}
                        <div className={styles.Image}>
                          <div>
                            <img
                              className={styles.menuImg}
                              src={items.menu_image}
                              alt=""
                            />
                          </div>
                          <div className={styles.addRemove}>
                            {/* Button to add an item */}
                            <button
                              onClick={() => {
                                placeOrder(items.menu_name);
                              }}
                              className="btn text-bg-success fw-bold"
                            >
                              +
                            </button>
                            {/* Display the count of selected items */}
                            <h6>
                              {
                                selectedItems.filter(
                                  (item) => item === items.menu_name
                                ).length
                              }
                            </h6>
                            {/* Button to remove an item */}
                            <button
                              onClick={() => {
                                removeOrder(items.menu_name);
                              }}
                              className="btn text-bg-warning fw-bold"
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </div>
              {/* Order summary and payment button */}
              <div className={styles.order}>
                {/* Display total price */}
                <div className={styles.price}>
                  <h4>Total: &#x20B9; {totalPrice.toFixed(2)}</h4>
                </div>
                {/* Button to proceed to payment */}
                <div className={styles.payBtn}>
                  <button
                    onClick={proceed}
                    className="btn text-bg-danger p-2 fw-bold"
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </Typography>
          </Sheet>
        </Modal>
      </React.Fragment>
    </>
  );
}

export default MenuList;
