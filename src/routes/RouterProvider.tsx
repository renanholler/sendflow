import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AppLayout } from "../components/layout/AppLayout";
import { SignIn, SignUp } from "../modules/auth";
import { Connections } from "../modules/connections";
import { ConnectionMode } from "../modules/connections/ConnectionsModel";
import { Contacts } from "../modules/contacts";
import Dashboard from "../modules/dashboard/Dashboard";
import {
  ConnectionSelector,
  MessageManager,
  MessageSender,
} from "../modules/messages";
import { PrivateRoute } from "./PrivateRoute";

export const RouterProvider = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/connections/:id" element={<Contacts />} />
          <Route
            path="/send"
            element={<ConnectionSelector mode={ConnectionMode.SEND} />}
          />
          <Route path="/send/:id" element={<MessageSender />} />
          <Route
            path="/messages"
            element={<ConnectionSelector mode={ConnectionMode.LIST} />}
          />
          <Route path="/messages/:id" element={<MessageManager />} />
        </Route>
      </Routes>
    </Router>
  );
};
