import styled from "styled-components";
import {useSelector} from "react-redux";
import {Form, Input} from "antd";

const {Item} = Form;

const OptionSection = () => {
  const questions = useSelector((state) =>
    state.selectedQuestionId.data === null
      ? null
      : state.survey.data.questions[state.selectedQuestionId.data]
  )


  return (
    <OptionSectionWrapper>
      <Title>문항 옵션</Title>
      {/*{questions? <></> : "질문을 선택해주세요."}*/}
    <FormWrapper>
      <Form
        name={"option-form"}
        layout={"vertical"}
        >
        <SubTitle>공통옵션</SubTitle>
        <Item
          label={"질문"} name={"title"} rules={[{ required: true}]}>
          <Input/>
        </Item>
        <Item label={"설명"} name={"subtitle"} rules={[{ required: true}]}>
          <Input/>
        </Item>
      </Form>
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
