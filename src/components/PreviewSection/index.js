import Card from "../Card";
import Body from "../Body";
import AddButton from "../AddButton";
import {useDispatch, useSelector} from "react-redux";
import {moveDownQuestion, moveUpQuestion, deleteQuestion, addQuestions} from "../../stores/survey/surveySlice";

const PreviewSection = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.survey.data?.questions || [])

  const handleAddQuestion = (type) => {
    dispatch(addQuestions(type));
  }

  const handleMoveUp= (index) => {
    if(index === 0) return;
    dispatch(moveUpQuestion(index))
  }

  const handleMoveDown=(index) => {
    if(index === 0) return;
    dispatch(moveDownQuestion(index))
  }

  const handleDeleteQuestion = (index) => {
    dispatch(deleteQuestion(index));
  }

  return (
  <div>
        {questions.map((question, i) => (
          <Card
            key={i}
            title={question.title}
            desc={question.desc}
            onUpButton={() => {handleMoveUp(i)}}
            onDownButton={() => {handleMoveDown(i)}}
            onDeleteButton={() => {handleDeleteQuestion(i)}}
          >
            <Body type={question.type} options={question.options}/>
          </Card>
        ))
    }
    <AddButton addQuestion={handleAddQuestion}/>
  </div>
  )
};

export default PreviewSection;
