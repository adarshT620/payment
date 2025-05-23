// import { useState } from "react";
// import { BottomWarning } from "../component/BottomWarning";
// import { Button } from "../component/Button";
// import { Heading } from "../component/Heading";
// import { InputBox } from "../component/InputBox";
// import { SubHeading } from "../component/SubHeading";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const Signin = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   return (
//     <div className="bg-slate-300 h-screen flex justify-center">
//       <div className="flex flex-col justify-center">
//         <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//           <Heading label={"Sign in"} />
//           <SubHeading label={"Enter your credentials to access your account"} />

//           <InputBox
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="john123@gmail.com"
//             label={"Email"}
//           />
//           <InputBox
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="123456"
//             label={"Password"}
//           />
          
//           <div className="pt-4">
//             <Button
//               label={"Sign in"}
//               onClick={async () => {
//                 try {
//                   const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
//                     username,
//                     password
//                   });
//                   localStorage.setItem("token", response.data.token);
//                   navigate("/dashboard");
//                 } catch (error) {
//                   alert("Invalid credentials or server error");
//                 }
//               }}
//             />
//           </div>

//           <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useRef } from "react";
import { BottomWarning } from "../component/BottomWarning";
import { Button } from "../component/Button";
import { Heading } from "../component/Heading";
import { InputBox } from "../component/InputBox";
import { SubHeading } from "../component/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          <InputBox
            ref={emailRef}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") passwordRef.current?.focus();
            }}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john123@gmail.com"
            label={"Email"}
          />
          <InputBox
            ref={passwordRef}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") emailRef.current?.focus();
            }}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />

          <div className="pt-4">
            <Button
              label={"Sign in"}
              onClick={async () => {
                try {
                  const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                    username,
                    password
                  });
                  localStorage.setItem("token", response.data.token);
                  navigate("/dashboard");
                } catch (error) {
                  alert("Invalid credentials or server error");
                }
              }}
            />
          </div>

          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>
  );
};


