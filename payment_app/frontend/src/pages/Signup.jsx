// import { useState } from "react"
// import { BottomWarning } from "../component/BottomWarning"
// import { Button } from "../component/Button"
// import { Heading } from "../component/Heading"
// import { InputBox } from "../component/InputBox"
// import { SubHeading } from "../component/SubHeading"
// import axios from "axios";
// import { useNavigate } from "react-router-dom"

// export const Signup = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   return <div className="bg-slate-300 h-screen flex justify-center">
//     <div className="flex flex-col justify-center">
//       <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//         <Heading label={"Sign up"} />
//         <SubHeading label={"Enter your credentials to create an account"} />

//         <InputBox onChange={e => {
//           setFirstName(e.target.value);
//         }} placeholder="John" label={"First Name"} />
//         <InputBox onChange={(e) => {
//           setLastName(e.target.value);
//         }} placeholder="Doe" label={"Last Name"} />
//         <InputBox onChange={e => {
//           setUsername(e.target.value);
//         }} placeholder="john123@gmail.com" label={"Email"} />
//         <InputBox onChange={(e) => {
//           setPassword(e.target.value)
//         }} placeholder="123456" label={"Password"} />

//         <div className="pt-4">
//           <Button onClick={async () => {
//             try {
//               const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
//                 username,
//                 firstName,
//                 lastName,
//                 password
//               });
//               localStorage.setItem("token", response.data.token)
//               navigate("/dashboard");
//             } catch (error) {
//               alert("Invalid inputs or server error");
//             }
//           }} label={"Sign up"} />
//         </div>
//         <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
//       </div>
//     </div>
//   </div>
// }

import { useRef, useState } from "react";
import { BottomWarning } from "../component/BottomWarning";
import { Button } from "../component/Button";
import { Heading } from "../component/Heading";
import { InputBox } from "../component/InputBox";
import { SubHeading } from "../component/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Refs for each input
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your credentials to create an account"} />

          <InputBox
            ref={firstNameRef}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label="First Name"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") lastNameRef.current?.focus();
            }}
          />
          <InputBox
            ref={lastNameRef}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label="Last Name"
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") firstNameRef.current?.focus();
              else if (e.key === "ArrowDown") emailRef.current?.focus();
            }}
          />
          <InputBox
            ref={emailRef}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john123@gmail.com"
            label="Email"
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") lastNameRef.current?.focus();
              else if (e.key === "ArrowDown") passwordRef.current?.focus();
            }}
          />
          <InputBox
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label="Password"
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") emailRef.current?.focus();
            }}
          />

          <div className="pt-4">
            <Button
              onClick={async () => {
                try {
                  const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                    username,
                    firstName,
                    lastName,
                    password,
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  alert("Invalid inputs or server error");
                }
              }}
              label={"Sign up"}
            />
          </div>

          <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  );
};
