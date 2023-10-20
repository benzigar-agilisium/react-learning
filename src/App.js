import React from "react";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";

import { Provider } from "react-redux";

import EmiCalculator from "./pages/emi";

import store from "./redux/store";
import Template from "./pages/template";
import Home from "./pages/home";
import ImageGallery from "./pages/images";
import Shopping from "./pages/shopping";
import Tasks from "./pages/tasks";
import Kanban from "./pages/kanban";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Template />}>
              <Route path="/" element={<Home />} />
              <Route path="/emi" element={<EmiCalculator />} />
              <Route path="/kanban" element={<Kanban />} />
              <Route path="/gallery" element={<ImageGallery />} />
              <Route path="/shopping" element={<Shopping />} />
              <Route path="/tasks" element={<Tasks />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}
