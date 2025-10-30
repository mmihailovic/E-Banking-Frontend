import type { FC } from "react"
import { useNavigate } from "react-router-dom"
import { ShellBar, Button } from "@ui5/webcomponents-react"

export const Header: FC = () => {
  const navigate = useNavigate()

  return (
    <ShellBar
      primaryTitle="E-Banking"
      content={
        <>
          <Button
            onClick={() => {
              navigate("/bank-accounts")
            }}
            design="Transparent"
          >
            Bank accounts
          </Button>
          <Button
            onClick={() => {
              navigate("/cards")
            }}
            design="Transparent"
          >
            Cards
          </Button>
          <Button
            onClick={() => {
              navigate("/credits")
            }}
            design="Transparent"
          >
            Credits
          </Button>
          <Button
            onClick={() => {
              navigate("/dashboard")
            }}
            design="Transparent"
          >
            Dashboard
          </Button>
        </>
      }
    />
  )
}

export default Header
