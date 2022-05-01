import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "../App";
import { SetupMFA } from "../pages/users/SetupMFA";

// ルーティング
export const Router: React.FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/users/setup-mfa" element={<SetupMFA />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
