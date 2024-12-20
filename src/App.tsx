import store from "./Kanbas/store";
import { Provider } from "react-redux";
import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Kanbas from "./Kanbas";
export default function App() {
 return (
  <HashRouter>
    <Provider store={store}>
      <div>
        <Routes>
        <Route path="/" element={<Navigate to="Kanbas"/>}/>
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
    </Provider>
  </HashRouter>
);}
