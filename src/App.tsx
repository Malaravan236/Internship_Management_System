import { BrowserRouter, Route, Routes } from "react-router-dom";
import authRoutes from "./routes/auth.routes";
import SuspenseLayout from "./layouts/SuspenseLayout";
import MainLayout from "./layouts/MainLayout";
import { RefreshProvider } from "./pages/RefreshContext";

import InternshipListings from "./pages/AvailableInterns"; // ✅ correct path

function App() {
  return (
    <RefreshProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SuspenseLayout />}>
            <Route element={<MainLayout />}>
              {/* Existing routes */}
              {authRoutes.navigationRouts.map((data: any) => (
                <Route
                  key={data.name}
                  path={data.path}
                  element={data.component}
                />
              ))}

              {/* ✅ Force add this route */}
              <Route path="/availableinterns" element={<InternshipListings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RefreshProvider>
  );
}

export default App;
