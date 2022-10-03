import { configureStore} from "@reduxjs/toolkit";
import surveySlice from "./survey/surveySlice";
import thunk from "./middleware/thunk";

export default configureStore({
  reducer: {
    survey: surveySlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
