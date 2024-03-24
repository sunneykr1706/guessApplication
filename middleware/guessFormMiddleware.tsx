// middleware/guessMiddleware.js
import { fetchDataSuccess, fetchDataFailure } from "../dux/guessFormReducer";
import {
  urlAgify,
  urlGenderize,
  urlNationalize,
} from "@/helpers/apiEndpointHelper";
import { guessFormHelper } from "@/helpers/guessFormHelper";
import { Middleware } from "redux";

const guessFormMiddleware: Middleware =
  (store) => (next) => async (action: any) => {
    if (action.type !== "FETCH_DATA_REQUEST") {
      // Pass non-request actions down the middleware chain
      console.log("inside middleware");
      return next(action);
    }

    console.log("action.payload", action);
    const name = action.payload;
    console.log("name", name);

    try {
      // Fetch data from APIs
      const agifyResponse = await fetch(`https://api.agify.io?name=${name}`);
      const agifyData = await agifyResponse.json();

      const genderizeResponse = await fetch(
        `https://api.genderize.io?name=${name}`
      );
      const genderizeData = await genderizeResponse.json();

      const nationalizeResponse = await fetch(
        `https://api.nationalize.io?name=${name}`
      );
      const nationalizeData = await nationalizeResponse.json();
      console.log("inside nationalize", nationalizeData);
      const nationalizeDataFinal = guessFormHelper(nationalizeData);
      console.log("nationalizeDataFinal", nationalizeDataFinal);
      next(
        fetchDataSuccess(
          agifyData.age,
          genderizeData.gender,
          nationalizeDataFinal,
          nationalizeData.country
        )
      );
    } catch (error: any) {
      console.log("error in", error.message);
      next(fetchDataFailure(error.message));
    }
  };

export default guessFormMiddleware;
