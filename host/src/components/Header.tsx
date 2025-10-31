import { useNavigate } from "react-router-dom"
import { ShellBar, Button } from "@ui5/webcomponents-react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { logout } from "../redux/features/auth/authSlice"

export const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const hasRole = (role: string) => user?.roles.includes(role)

  return (
    <ShellBar
      primaryTitle="E-Banking"
      content={
        <>
          {hasRole("ROLE_CLIENT") && (
            <Button
              onClick={() => {
                navigate("/bank-accounts")
              }}
              design="Transparent"
            >
              Bank accounts
            </Button>
          )}
          {hasRole("ROLE_CLIENT") && (
            <Button
              onClick={() => {
                navigate("/cards")
              }}
              design="Transparent"
            >
              Cards
            </Button>
          )}
          {hasRole("ROLE_CLIENT") && (
            <Button
              onClick={() => {
                navigate("/credits")
              }}
              design="Transparent"
            >
              Credits
            </Button>
          )}
          {hasRole("ROLE_MANAGE_CARDS") && (
            <Button
              onClick={() => {
                navigate("/manage/cards")
              }}
              design="Transparent"
            >
              Manage Cards
            </Button>
          )}
          {hasRole("ROLE_MANAGE_BANK_ACCOUNTS") && (
            <Button
              onClick={() => {
                navigate("/manage/bank-accounts")
              }}
              design="Transparent"
            >
              Manage Bank accounts
            </Button>
          )}
          <Button
            onClick={() => {
              dispatch(logout())
            }}
            design="Transparent"
          >
            Logout
          </Button>
        </>
      }
    />
  )
}

export default Header
