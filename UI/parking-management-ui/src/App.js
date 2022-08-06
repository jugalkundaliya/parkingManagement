import "./App.css";
import Home from "./pages/home/index";
import { Container } from "react-bootstrap";
import Parking from "./pages/admin/parking";
import Login from "./pages/AuthPages/Login";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./pages/AuthPages/Logout";
import { Provider } from "react-redux";
import { createStore } from "./store/store";
import Report from "./pages/admin/report/index";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/plane.css";
import Bills from "./pages/bill/index";
import NotFound from "./components/NotFound";
import "font-awesome/css/font-awesome.min.css";
const store = createStore();
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container>
          <ToastContainer />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="logout" element={<Logout />} />
            <Route path="login" element={<Login />} />
            <Route path="bills" element={<Bills />} />
            <Route path="parking" element={<Parking />} />
            <Route
              path="report"
              element={<ProtectedRoute element={<Report />} />}
            />
            <Route path="not-found" element={<NotFound />} />
            <Route path="/" element={<Navigate to="home" replace />} />
            <Route path="*" element={<Navigate to="not-found" replace />} />
          </Routes>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
