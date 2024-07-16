import ReactDOM from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"
import { Toaster } from "react-hot-toast"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <App />
  </HelmetProvider>
)
