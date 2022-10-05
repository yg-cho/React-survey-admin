import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Input, InputNumber, Switch} from "antd";
import {Fragment, useEffect} from "react";
import { setQuestion } from "../../stores/survey/surveySlice";

const {Item} = Form;

const groups = [
  {
    title: '공통 옵션',
    fields: [
      {
        label: '질문',
        name: 'title',
        rules: [{ required: true}],
        type: 'text'
      },
      {
        label: '설명',
        name: 'desc',
        rules: [{ required: true}],
        type: 'text',
      },
      {
        label: '필수여부',
        name: 'required',
        rules: [{}],
        type: 'switch',
        valuePropName: 'checked'
      },
    ]
  },
]

const detailFieldsMap =  {
  text: [
    {
      label: 'Placeholder',
      name: 'placeholder',
      rules: [{ required: false }],
      type: 'text'
    },
    {
      label: '최대 입력 길이',
      name: 'max',
      rules: [{ required: false }],
      type: 'number'
    },
  ],
  textarea: [
    {
      label: 'Placeholder',
      name: 'placeholder',
      rules: [{ required: false }],
      type: 'text'
    },
    {
      label: '최대 입력 길이',
      name: 'max',
      rules: [{ required: false }],
      type: 'number'
    },
  ],
  select: [
    {
      label: '답변',
      name: 'items',
      rules: [{ required: true }],
      type: 'text'
    },
    {
      label: '최대 선택 가능 개수',
      name: 'max',
      rules: [{ required: false }],
      type: 'number'
    },
  ]
}

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

    const type =questions.type;
    const detailFieldsValue = {};
    if(type === 'text' || type === 'textarea'){
      detailFieldsValue.max = questions.options.max;
      detailFieldsValue.placeholder = questions.options.placeholder
    }else if(type === 'select'){
      detailFieldsValue.max = questions.options.max;
      detailFieldsValue.items = questions.options.items.join(';');
    }

    form.setFieldsValue({
      title: questions.title,
      desc: questions.desc,
      required: questions.required,
      type: questions.type,
      ...detailFieldsValue
    })
    console.log("detailFieldsValue :",detailFieldsValue)
  },[form, questions])


  const getFieldInput = (type) => {
    if(type==='text') return <Input/>
    else if(type==='switch') return <Switch/>
    else if(type==='number') return <InputNumber/>
    else return null;
  }

  const mergedGroup = questions ? [
    ...groups,
    {
      title: '세부 옵션',
      fields: detailFieldsMap[questions.type]
    }
  ] : [];


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
          {mergedGroup.map((group, i) => (
            <Fragment key={i}>
              <SubTitle>{group.title}</SubTitle>
              {group.fields.map((field,i) => (
                <Item key={i} {...field}>
                  {getFieldInput(field.type)}
                </Item>
              ))}
            </Fragment>
          ))
          }

        <Item>
          <Button
            type={"primary"}
            onClick={() => {
              const {title, desc, required, ...options} = form.getFieldValue();
              const values = {
                title,
                desc,
                required,
                options,
                type: questions.type
              }
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
