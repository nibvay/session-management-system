import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DialogProvider } from "./provider/DialogProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DialogProvider>
    <App />
  </DialogProvider>
);
