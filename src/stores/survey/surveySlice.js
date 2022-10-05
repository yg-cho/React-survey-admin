import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null
};


export const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.data.title = action.payload;
    },
    addQuestions:  (state,action) => {
      const type = action.payload;

      let options = {};
      if(type === 'text' || type === 'textarea'){
        options = {
          max: 20,
          placeholder: ''}
      } else if ( type === 'select'){
        options = {
          max: 1,
          items: ["가","나","다"]
        }
      }
      state.data.questions.push( {
        title:'Untitled',
        desc:'',
        type: type,
        required: false,
        options
      })
    },
    moveUpQuestion: (state,action) => {
      const index = action.payload;
      if(index === 0) {
        return
      }
        const temp = state.data.questions[index];
        state.data.questions[index] = state.data.questions[index-1];
        state.data.questions[index-1] = temp;
    },
    moveDownQuestion: (state,action) => {
      const index = action.payload;
      if(index === state.data.questions.length-1) {
        return
      }
      const temp = state.data.questions[index];
      state.data.questions[index] = state.data.questions[index+1];
      state.data.questions[index+1] = temp;
    },
    deleteQuestion: (state,action) => {
      state.data.questions.splice(action.payload,1)
    },
    setSurvey: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setQuestion: (state, action) => {
      const index = action.payload.index;
      state.data.questions[index] = action.payload.data;

      /* action ex
        action.payload = {
          index: 2,
          data: {
            ...
          }
        }
       */
    }
  }
})

export const { setTitle, addQuestions, moveUpQuestion, moveDownQuestion, deleteQuestion, setSurvey, setLoading, setError, setQuestion } = surveySlice.actions;
export default surveySlice.reducer;