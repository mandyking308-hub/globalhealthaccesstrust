import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to homepage since that's where the main content is
  return <Navigate to="/" replace />;
};

export default Index;
