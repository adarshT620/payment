import { useEffect, useState } from "react";
import { Appbar } from "../component/Appbar";
import { Balance } from "../component/Balance";
import { Users } from "../component/Users";
import axios from "axios";

export const Dashboard = () => {
  const [balance, setBalance] = useState("Loading...");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setBalance(response.data.balance.toFixed(2)); // format to 2 decimal places
      } catch (err) {
        console.error("Failed to fetch balance:", err);
        setBalance("Error");
      }
    };

    fetchBalance();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  

  return <div>
    <Appbar user={user}></Appbar>
    <div className="m-8">
      <Balance value={balance}></Balance>
      <Users></Users>
    </div>
  </div>
}


// import { useEffect, useState } from "react";
// import { Appbar } from "../component/Appbar";
// import { Balance } from "../component/Balance";
// import { Users } from "../component/Users";
// import axios from "axios";

// export const Dashboard = () => {
//   const [balance, setBalance] = useState("Loading...");

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         });
//         setBalance(response.data.balance.toFixed(2)); // format to 2 decimal places
//       } catch (err) {
//         console.error("Failed to fetch balance:", err);
//         setBalance("Error");
//       }
//     };

//     fetchBalance();
//   }, []);

  

//   return <div>
//     <Appbar></Appbar>
//     <div className="m-8">
//       <Balance value={balance}></Balance>
//       <Users></Users>
//     </div>
//   </div>
// }