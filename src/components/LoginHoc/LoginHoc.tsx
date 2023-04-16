import React, { FC, ReactElement } from 'react';
import { handleLogin } from '../../redux/slicers/loginSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginAsync } from '../../redux/actions/loginActions';

export interface IHocProps {
    handleValues: (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    loginAsyncUI: (e: React.FormEvent<HTMLFormElement>) => void;
    loading: {
        login: boolean;
    };
    error: {
        login: string | undefined;
    };
    errors: {
        [key: string]: string[] | undefined;
    };
}

interface LoginHocProps {
    url: '/reg' | '/login';
    children: (props: IHocProps) => ReactElement;
}

const LoginHoc: FC<LoginHocProps> = ({ children, url }) => {

    const dispatch = useAppDispatch();
    const { login, errors } = useAppSelector((state) => state.loginSlice);
    const { loading, error } = useAppSelector((state) => state.extraSlice)

    const newLogin = url === '/reg' ? login : { email: login.email, password: login.password };

    const handleValues = (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(handleLogin({ ...newLogin, [prop]: e.target.value }));
    };


    const loginAsyncUI = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginAsync(url));
    };

    return children({ handleValues, loginAsyncUI, loading, error, errors });
};

export default LoginHoc;