import React, { FC } from 'react';
import LoginHoc from '../../components/LoginHoc/LoginHoc';
import { IHocProps } from '../../components/LoginHoc/LoginHoc';
import Form from '../../components/Form/Form';

const Auth: FC<IHocProps> = (props) => <Form formType="auth" {...props} />;

const WrappedAuth = () => (
    <LoginHoc url="/login">
        {(props: IHocProps) => <Auth {...props} />}
    </LoginHoc>
);

export default WrappedAuth;