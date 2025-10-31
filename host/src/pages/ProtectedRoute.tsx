import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import { useAppDispatch } from "../hooks/hooks"
import { useEffect } from "react"
import { checkCredentials } from "../redux/features/auth/authSlice"
import { BusyIndicator } from "@ui5/webcomponents-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  roles: string[]
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  roles,
}) => {
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.auth,
  )
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      const result = dispatch(checkCredentials())
      if (
        checkCredentials.rejected.match(result) ||
        !user?.roles.some((role) => roles.includes(role))
      ) {
        navigate("/login")
      }
    }
  }, [dispatch, navigate, isAuthenticated])

  if (loading) {
    return <BusyIndicator active size="M" />
  }

  return children
}

export default ProtectedRoute
