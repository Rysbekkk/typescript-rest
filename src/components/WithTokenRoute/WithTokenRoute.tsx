import { Navigate } from "react-router-dom";
import { useAppSelector } from '../../hooks/hooks';
import Layout from "../../layout/Layout/Layout";

const WithTokenRoute = () => {
    const { token } = useAppSelector(state => state.tokenSlice);
    return token ? <Layout /> : <Navigate to='/auth' />

};

export default WithTokenRoute;