import { StrictMode, lazy } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./redux/store.ts"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage.tsx"
import { ProtectedRoute } from "./pages/ProtectedRoute.tsx"
import { ThemeProvider } from "@ui5/webcomponents-react"
import { Layout } from "./components/Layout.tsx"
import "@ui5/webcomponents/dist/Assets.js"
import SuspenseComponent from "./components/SuspenseComponent.tsx"

const BankAccountDetailsPage = lazy(
  () => import("banking/BankAccountDetailsPage"),
)
const CardsPage = lazy(() => import("banking/CardsPage"))
const CreditsPage = lazy(() => import("banking/CreditsPage"))
const BankAccountsPage = lazy(() => import("banking/BankAccountsPage"))
const ManageCardsPage = lazy(() => import("banking/ManageCardsPage"))
const ManageBankAccountsPage = lazy(
  () => import("banking/ManageBankAccountsPage"),
)

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route
                path="/bank-accounts"
                element={
                  <ProtectedRoute
                    roles={["ROLE_CLIENT"]}
                    children={
                      <SuspenseComponent children={<BankAccountsPage />} />
                    }
                  />
                }
              />
              <Route
                path="/bank-account"
                element={
                  <ProtectedRoute
                    roles={["ROLE_CLIENT"]}
                    children={
                      <SuspenseComponent
                        children={<BankAccountDetailsPage />}
                      />
                    }
                  />
                }
              />
              <Route
                path="/cards"
                element={
                  <ProtectedRoute
                    roles={["ROLE_CLIENT"]}
                    children={<SuspenseComponent children={<CardsPage />} />}
                  />
                }
              />
              <Route
                path="/credits"
                element={
                  <ProtectedRoute
                    roles={["ROLE_CLIENT"]}
                    children={<SuspenseComponent children={<CreditsPage />} />}
                  />
                }
              />
              <Route path="/manage">
                <Route
                  path="bank-accounts"
                  element={
                    <ProtectedRoute
                      roles={["ROLE_MANAGE_BANK_ACCOUNTS"]}
                      children={
                        <SuspenseComponent
                          children={<ManageBankAccountsPage />}
                        />
                      }
                    />
                  }
                />
                <Route
                  path="cards"
                  element={
                    <ProtectedRoute
                      roles={["ROLE_MANAGE_CARDS"]}
                      children={
                        <SuspenseComponent children={<ManageCardsPage />} />
                      }
                    />
                  }
                />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  </ThemeProvider>
)
