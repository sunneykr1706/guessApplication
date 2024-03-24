const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";

const initialState = {
  age: null,
  gender: null,
  country: null,
  isLoading: false,
  countryList: null,
  error: null,
};

const guessFormReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_DATA_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        age: action.payload.age,
        gender: action.payload.gender,
        country: action.payload.country,
        countryList: action.payload.countryList,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default guessFormReducer;

// Actions
export const fetchDataRequest = (name) => ({
  type: FETCH_DATA_REQUEST,
  payload: name,
});
export const fetchDataSuccess = (
  age: any,
  gender: any,
  country: any,
  countryList: any
) => ({
  type: FETCH_DATA_SUCCESS,
  payload: { age, gender, country, countryList },
});
export const fetchDataFailure = (error: any) => ({
  type: FETCH_DATA_FAILURE,
  payload: { error },
});
export const fetchAllData = ({ guessFormReducer }: any) => {
  return guessFormReducer;
};

// in this component , i want simply that Enter a name input box and submit alligned in a same row , using row col like we did earlier

// "use client";
// import React, { useState } from "react";
// import { Input, Button, Spin, Card, Row, Col, Tooltip } from "antd";
// import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDataRequest } from "../dux/guessFormReducer";
// import { guessRuleGame } from "@/helpers/constants";
// import InputForm from "./InputForm";
// const GuessForm: React.FC = () => {
//   const [name, setName] = useState<string>("");
//   const isLoading = useSelector((state) => state.guess.isLoading);
//   const age = useSelector((state) => state.guess.age);
//   const gender = useSelector((state) => state.guess.gender);
//   const country = useSelector((state) => state.guess.country);
//   const dispatch = useDispatch();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(name);
//     dispatch(fetchDataRequest(name));
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "97vh",
//         backgroundColor: "black",
//       }}
//     >
//       <Card style={{ width: 700, height: 400 }}>
//         <div>
//           <Row align="middle" gutter={[16, 0]}>
//             <Col>
//               <h1>Guessing Game</h1>
//             </Col>
//             <Col>
//               <Tooltip title={guessRuleGame}>
//                 <InfoCircleOutlined />
//               </Tooltip>
//             </Col>
//           </Row>
//           <form onSubmit={handleSubmit} className="mb-4">
//             <label className="block mb-2">
//               Enter a name:
//               <Input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 prefix={<UserOutlined />}
//                 placeholder="Enter a name"
//               />
//             </label>
//             <Button
//               type="primary"
//               htmlType="submit"
//               disabled={isLoading}
//               className="mr-2"
//               onClick={handleSubmit}
//             >
//               {isLoading ? <Spin /> : "Submit"}
//             </Button>
//           </form>
//           {/* {age && <p>Guessed Age: {age}</p>}
//           {gender && <p>Guessed Gender: {gender}</p>}
//           {country && <p>Guessed Country: {country}</p>} */}
//           <InputForm />
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default GuessForm;
