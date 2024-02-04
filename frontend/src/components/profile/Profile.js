// import React, { useEffect, useState } from 'react';
// import NavBar from "../HomePage/NavBar";
// import { useParams} from 'react-router-dom';
// import axios from "axios"
// import styles from "./profile.module.css"

// function Profile() {
// const [profile, setProfile] = useState()
//   const id = useParams()
//  // console.log(id)

//   async function fetchProfile(){
//     try{
//       const response = await axios.get(`http://localhost:4200/createUser/profile/${id}`);

//       setProfile(response.data)
//    //   console.log(response.data);

//     }catch(err){
//       console.log('invalid', err)
//     }
//   }
// useEffect(()=>{
// fetchProfile()
// },)

//   return (
//     <>
//      <div className='bg-dark'>
//     <NavBar/>
//     </div>
//     <center className='mt-4'>
//     <div className={`${styles.profileCard}`}>
//     {profile ? (
//       profile.map((data)=>(
//         <h5>{data.name}</h5>
//       ))

//     ) : ("")}
//       <div className={`${styles.cardHeader}`}>
//         <div className={`${styles.pic}`}>
//           <img className={styles.picImg}
//             src=""
//             alt=""
//           />
//         </div>
//         <div className="">{}</div>
//         <div className="">Frontend Developer</div>
//         <div className="">
//           <i className="fas fa-map-marker-alt"></i> Dublin
//         </div>

//       </div>
//     </div>
//     </center>

//     </>
//   )
// }

// export default Profile
import React, { useEffect, useState } from "react";
import NavBar from "../HomePage/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./profile.module.css";

function Profile() {
  const [profiles, setProfile] = useState(null);
  const { id } = useParams();

  async function fetchProfile() {
    try {
      const response = await axios.get(
        `http://localhost:4200/createUser/profile/${id}`
      );
      setProfile(response.data);
      // console.log(response.data);
    } catch (err) {
      console.log("Invalid", err);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [id]); // Add id to the dependency array

  return (
    <>
      <div className="bg-dark">
        <NavBar />
      </div>
      <center className="mt-4">
        <div className={`${styles.profileCard}`}>
          {profiles ? (
            <div>
              <h5>{profiles.name}</h5>
              <div className={`${styles.cardHeader}`}>
                <div className={`${styles.pic}`}>
                  <img className={styles.picImg} src="" alt="" />
                </div>
                <div className="text-white mt-2">{profiles.email}</div>

                {profiles.phone ? (
                  <p className="text-white">
                    <i class={`fa-solid fa-phone m-2`}></i>
                    {profiles.phone}
                  </p>
                ) : null}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </center>
    </>
  );
}

export default Profile;
