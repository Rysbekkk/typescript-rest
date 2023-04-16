import { useAppDispatch } from '../../hooks/hooks';
import { IHocProps } from '../LoginHoc/LoginHoc';
import s from './Form.module.scss';
import { useNavigate } from 'react-router-dom';
import { clearErrors } from '../../redux/slicers/loginSlice';
import { useId } from 'react'

// extend
interface FormProps extends IHocProps {
    // union type
    formType: 'register' | 'auth';
    errors: {
        [key: string]: string[] | undefined;
    };
}
// extend

const Form: React.FC<FormProps> = ({ formType, handleValues, loginAsyncUI, loading, errors }) => {
    const isRegister = formType === 'register';
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const redirect = () => {
        dispatch(clearErrors())
        navigate(isRegister ? '/auth' : '/reg')
    }

    const emailId = useId();
    const passwordId = useId();
    const nameId = useId();

    return (
        <form className={s.form} onSubmit={loginAsyncUI}>
            <h2>{isRegister ? 'REGISTRATION' : 'AUTHORIZATION'}</h2>
            {isRegister && (
                <>
                    <div>
                        {errors.name && <label htmlFor={nameId}>{errors.name.join(', ')}</label>}
                        <input id={nameId} type="text" placeholder="username" onChange={handleValues('name')} />
                    </div>
                </>
            )}
            <div>
                {errors.email && <label htmlFor={emailId}>{errors.email.join(', ')}</label>}
                <input id={emailId} type="text" placeholder="email" onChange={handleValues('email')} />
            </div>
            <div>
                {errors.password && <label htmlFor={passwordId}>{errors.password.join(', ')}</label>}
                <input id={passwordId} type="text" placeholder="password" onChange={handleValues('password')} />
            </div>

            <button type='submit' disabled={loading.login}>{isRegister ? 'Register' : 'Authorize'}</button>
            <button type='button' onClick={redirect}>{isRegister ? 'AUTHORIZATION PAGE' : 'REGISTRATION PAGE'}</button>
        </form>
    );
};

export default Form