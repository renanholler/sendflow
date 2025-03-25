import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { SignIn, SignUp } from "./modules/auth";
import { Connections } from "./modules/connections";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />{" "}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/connections" element={<Connections />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
