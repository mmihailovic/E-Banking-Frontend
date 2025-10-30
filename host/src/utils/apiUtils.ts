import { store } from "../redux/store"
import { logout } from "../redux/features/auth/authSlice"

export async function makePostRequest(
  endpoint: string,
  body?: any,
): Promise<Response> {
  const dispatch = store.dispatch
  const response = await fetch(`${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  })

  if (response.status == 401 || response.status == 403) {
    dispatch(logout())
    throw new Error("UNAUTHORIZED: Session expired!")
  }

  if (!response.ok) {
    const errorText = await response.text()

    throw new Error(errorText)
  }

  return response
}

export async function makeGetRequest(endpoint: string): Promise<Response> {
  const dispatch = store.dispatch
  const response = await fetch(`${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (response.status == 401) {
    dispatch(logout())
    throw new Error("UNAUTHORIZED: Session expired!")
  }

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || "POST request failed")
  }

  return response
}
