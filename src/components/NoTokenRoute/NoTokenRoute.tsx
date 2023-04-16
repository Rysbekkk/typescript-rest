import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

interface Props {
    component: React.ComponentType;
}

const NoTokenRoute: React.FC<Props> = ({ component: Component }) => {
    const { token } = useAppSelector(state => state.tokenSlice);
    return token ? <Navigate to='/' /> : <Component />
};

export default NoTokenRoute;