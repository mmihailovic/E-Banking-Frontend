import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"
import { useAppDispatch } from "../hooks/hooks"
import { useEffect } from "react"
import { checkCredentials } from "../redux/features/auth/authSlice"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isAuthenticated) dispatch(checkCredentials())
  }, [dispatch, isAuthenticated])

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (loading) {
    return <div>Loading..</div>
  }

  return children
}

export default ProtectedRoute
