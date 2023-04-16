import { Routes, Route } from 'react-router-dom'
import NoTokenRoute from './components/NoTokenRoute/NoTokenRoute';
import WithTokenRoute from './components/WithTokenRoute/WithTokenRoute';
import Auth from './layout/Auth/Auth';
import Register from './layout/Register/Register';
import Home from './layout/Home/Home';

const Views = () => {
    return (
        <Routes>
            <Route path='/' element={<WithTokenRoute />}>
                <Route index element={<Home />} />
            </Route>
            <Route path="/auth" element={<NoTokenRoute component={Auth} />} />
            <Route path="/reg" element={<NoTokenRoute component={Register} />} />
        </Routes>
    );
};

export default Views;