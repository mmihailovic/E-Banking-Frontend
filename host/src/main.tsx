import { StrictMode, lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage.tsx"
import { HomePage } from "./pages/HomePage.tsx"
import { ProtectedRoute } from "./pages/ProtectedRoute.tsx"
import { ThemeProvider } from "@ui5/webcomponents-react"
import { Layout } from "./components/Layout.tsx"
import "@ui5/webcomponents/dist/Assets.js"

const BankAccountDetailsPage = lazy(
  () => import("banking/BankAccountDetailsPage"),
)
const CardsPage = lazy(() => import("banking/CardsPage"))
const CreditsPage = lazy(() => import("banking/CreditsPage"))

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bank-account"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                      <BankAccountDetailsPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cards"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                      <CardsPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/credits"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<div>Loading...</div>}>
                      <CreditsPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  </ThemeProvider>,
)
