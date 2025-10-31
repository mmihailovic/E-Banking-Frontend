import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import federation from "@originjs/vite-plugin-federation"

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "banking",
      filename: "remoteEntry.js",
      exposes: {
        "./BankAccountDetailsPage": "./src/pages/BankAccountDetailsPage.tsx",
        "./BankAccountsPage": "./src/pages/BankAccountsPage.tsx",
        "./CardsPage": "./src/pages/CardsPage.tsx",
        "./CreditsPage": "./src/pages/CreditPage.tsx",
        "./ManageCardsPage": "/src/pages/ManageCardsPage.tsx",
        "./ManageBankAccountsPage": "/src/pages/ManageBankAccountsPage.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "@ui5/webcomponents-react",
        "react-redux",
        "redux",
      ],
    }),
  ],
  server: {
    port: 5001,
  },
  build: {
    target: "esnext",
  },
})
