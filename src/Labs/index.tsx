import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import Lab5 from "./Lab5";
import store from "./store";
import { Provider } from "react-redux";
export default function Labs() {
  return (
    <Provider store={store}>
      <div className="container-fluid">
        <h1>Shengmin Chen</h1>
        <h2>Section 01</h2>
        <h5>Github Repository ( kanbas-react-web-app ) :</h5>
        <a id="wd-github-client" href="https://github.com/1tou/kanbas-react-web-app.git"><h5>https://github.com/1tou/kanbas-react-web-app.git</h5></a><br/>
        <h5>Github Repository ( kanbas-node-server-app ) :</h5>
        <a id="wd-github-server" href="https://github.com/1tou/kanbas-node-server-app.git"><h5>https://github.com/1tou/kanbas-node-server-app.git</h5></a><br/>
        <h5> Remote Server Url :</h5>
        <a id="wd-remote-server" href="https://kanbas-node-server-app-po9w.onrender.com"><h5>https://kanbas-node-server-app-po9w.onrender.com</h5></a><br/>
        <h1>Labs</h1>
        <TOC />
        <Routes>
          <Route path="/" element={<Navigate to="Lab5" />} />
          <Route path="Lab1" element={<Lab1 />} />
          <Route path="Lab2" element={<Lab2 />} />
          <Route path="Lab3/*" element={<Lab3 />} />
          <Route path="Lab4/*" element={<Lab4 />} />
          <Route path="Lab5/*" element={<Lab5 />} />
        </Routes>
      </div>
    </Provider>
  );
}
