// Layout.tsx
import type { CSSProperties, FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ShellBar, FlexBox, Button } from "@ui5/webcomponents-react";

export const Layout: FC = () => {
    const navigate = useNavigate()
  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw"
  };

  const contentStyle: CSSProperties = {
    flex: 1,
    padding: "3rem",
    width:"100vw"
  };

  const footerStyle: CSSProperties = {
    backgroundColor: "#f0f0f0",
    padding: "1rem",
    textAlign: "center",
    height: "10vh"
  };

  return (
    <div style={containerStyle}>
      <ShellBar
        primaryTitle="E-Banking"
        content={<><Button onClick={()=>{navigate('/dashboard')}}design="Transparent">Dashboard</Button></>}
      />

      <FlexBox style={contentStyle}>
        <Outlet />
      </FlexBox>

      <div style={footerStyle}>
        © 2025 E-Banking
      </div>
    </div>
  );
};

export default Layout;