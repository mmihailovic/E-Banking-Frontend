import { Outlet } from "react-router-dom"
import { FlexBox } from "@ui5/webcomponents-react"
import Header from "./Header"

export const Layout: React.FC = () => {
  return (
    <div className="container">
      <Header />

      <FlexBox className="content">
        <Outlet />
      </FlexBox>

      <div className="footer">© 2025 E-Banking</div>
    </div>
  )
}

export default Layout
