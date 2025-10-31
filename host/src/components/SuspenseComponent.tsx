import React, { Suspense } from "react"

interface SuspenseComponentProps {
  children: React.ReactNode
}

export const SuspenseComponent: React.FC<SuspenseComponentProps> = ({
  children,
}) => {
  return <Suspense>{children}</Suspense>
}

export default SuspenseComponent
