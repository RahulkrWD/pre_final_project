import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [phone, setPhone] = React.useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchUpdate() {
    try {
      if (!phone.trim()) {
        console.log("Phone number cannot be empty.");
        return;
      }

      const response = await axios.put(
        `http://localhost:4200/createUser/profile/update/${id}`,
        {
          phone,
        }
      );
     // console.log(response.data);
      console.log("Update successful");
      navigate("/");
    } catch (err) {
      console.error("Profile update failed", err);
    }
  }

  return (
    <div>
      <button className="btn text-bg-success m-2 fw-bold" onClick={handleOpen}>Edit Profile</button>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="outlined-name-input"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br/>
          <button className="btn text-bg-info fw-bold mt-2" onClick={fetchUpdate}>Update</button>
        </Box>
      </Modal>
    </div>
  );
}

