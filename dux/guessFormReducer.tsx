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

