import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input} from "antd";
import {useEffect} from "react";
import { setQuestion } from "../../stores/survey/surveySlice";

const {Item} = Form;

const OptionSection = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) =>
    state.selectedQuestionId.data === null
      ? null
      : state.survey.data.questions[state.selectedQuestionId.data]
  )
  const [form] = Form.useForm();
  console.log(questions)

  const selectedQuestionId = useSelector(
    (state) => state.selectedQuestionId.data,
    );

  useEffect(() => {
    if(!questions) return;
    form.setFieldsValue({
      title: questions.title,
      desc: questions.desc
    })
  },[form, questions])


  return (
    <OptionSectionWrapper>
      <Title>문항 옵션</Title>
      <FormWrapper>
      {questions ?
        <Form
          form={form}
          name={"option-form"}
          layout={"vertical"}
        >
        <SubTitle>공통옵션</SubTitle>
        <Item
          label={"질문"} name={"title"} rules={[{ required: true}]}>
          <Input/>
        </Item>
        <Item
          label={"설명"} name={"desc"} rules={[{ required: true}]}>
          <Input/>
        </Item>
        <Item>
          <Button
            type={"primary"}
            onClick={() => {
              const values = form.getFieldValue();
              console.log("vaL :",values);
              dispatch(setQuestion({index: selectedQuestionId, data: values}))
            }
          }
          >적용
          </Button>
        </Item>
      </Form>
        : "질문을 선택해주세요."
      }


    </FormWrapper>
    </OptionSectionWrapper>
  );
};

const OptionSectionWrapper = styled.div`
  height: 100%;
  background: #ffffff;
  border-left: 1px solid #dddddd;
`;

const Title = styled.div`
  font-weight: 500;
  background: #f0f0f0;
  border-bottom: 1px solid #dddddd;
  padding: 10px 0;
  text-align: center;
`;

const FormWrapper = styled.div`
  padding: 20px;
`;

const SubTitle = styled.div`
  font-size: 1.03rem;
  font-weight: 600;
  margin: 10px 0;
`;


export default OptionSection;
