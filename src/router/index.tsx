import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "../App";

// ルーティング
export const Router: React.FC = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
