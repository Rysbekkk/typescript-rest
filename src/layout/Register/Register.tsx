import React, { FC } from 'react';
import LoginHoc from '../../components/LoginHoc/LoginHoc';
import { IHocProps } from '../../components/LoginHoc/LoginHoc';
import Form from '../../components/Form/Form';

const Register: FC<IHocProps> = (props) => <Form formType="register" {...props} />;

const WrappedRegister = () => (
    <LoginHoc url="/reg">
        {(props: IHocProps) => <Register {...props} />}
    </LoginHoc>
);

export default WrappedRegister;