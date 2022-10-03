import MainLayout from "../layouts/MainLayout";
import { Row, Col, Input } from 'antd';
import PreviewSection from "../components/PreviewSection";
import OptionSection from "../components/OptionSection";
import {
  setTitle,
  addQuestions,
  moveUpQuestion,
  moveDownQuestion,
  deleteQuestion,

} from "../stores/survey/surveySlice";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import fetchSurvey from "../service/fetchSurvey";
import BuilderTitleInput from "../BuilderTitleInput";

const BuilderPage = () => {
  const survey = useSelector((state) => state.survey.data)
  const error = useSelector((state) => state.survey.error)
  const loading = useSelector((state) => state.survey.loading)
  const dispatch = useDispatch();
  const params = useParams()

  useEffect(() => {
    dispatch(fetchSurvey(params.surveyId));
    },[dispatch, params.surveyId])

  if(error){
    return 'error';
  }
  if(loading) {
    return 'loading...'
  }

  return (
    <MainLayout selectedKeys={"builder"}>
      <Row>
        <Col flex={"auto"}>
          <BuilderTitleInput/>
          {/*<Input*/}
          {/*  placeholder={"설문 제목을 입력해주세요."}*/}
          {/*  value={survey.title}*/}
          {/*  onChange={(e) => {*/}
          {/*   dispatch(setTitle(e.target.value));*/}
          {/*  }}*/}
          {/*/>*/}
          <PreviewSection
          />
        </Col>
        <Col flex={"350px"}><OptionSection/></Col>
      </Row>
    </MainLayout>
  )
};

export default BuilderPage;
