import ListPage from "./pages/ListPage";
import {Routes, Route } from 'react-router-dom'
import BuilderPage from "./pages/BuilderPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<ListPage/>}/>
        <Route path={"/list"} element={<ListPage/>}/>
        <Route path={"/builder/:surveyId"} element={<BuilderPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
