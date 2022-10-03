import { configureStore} from "@reduxjs/toolkit";
import surveyReducer from "./survey/surveySlice";
import selectedQuestionIdReducer from "./selectedQuestionId/selectedQuestionIdSlice";
import thunk from "./middleware/thunk";

export default configureStore({
  reducer: {
    survey: surveyReducer,
    selectedQuestionId : selectedQuestionIdReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
