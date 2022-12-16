import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    // user is not authenticated
    return <Navigate to="/admin/login" />;
  }
  return children;
};

export default ProtectedRoute;
