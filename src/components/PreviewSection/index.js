import Card from "../Card";
import Body from "../Body";
import AddButton from "../AddButton";

const PreviewSection = ({questions, addQuestion, moveUp, moveDown, deleteQuestion}) => {
  return (
  <div>
        {questions.map((question, i) => (
          <Card
            key={i}
            title={question.title}
            desc={question.desc}
            onUpButton={() => {moveUp(i)}}
            onDownButton={() => {moveDown(i)}}
            onDeleteButton={() => {deleteQuestion(i)}}
          >
            <Body type={question.type} options={question.options}/>
          </Card>
        ))
    }
    <AddButton onClick={addQuestion}/>
  </div>
  )
};

export default PreviewSection;
