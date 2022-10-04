import MainLayout from "../layouts/MainLayout";
import { Row, Col } from 'antd';
import PreviewSection from "../components/PreviewSection";
import OptionSection from "../components/OptionSection";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import fetchSurvey from "../service/fetchSurvey";
import BuilderTitleInput from "../components/BuilderTitleInput";

const BuilderPage = () => {
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
    <MainLayout selectedKeys={"builder"} padding={0}>
      <Row style={{height: '100%'}}>
        <Col flex={"auto"} style={{padding: 30}}>
          <BuilderTitleInput/>
          <PreviewSection/>
        </Col>
        <Col flex={"350px"}><OptionSection/></Col>
      </Row>
    </MainLayout>
  )
};


export default BuilderPage;
