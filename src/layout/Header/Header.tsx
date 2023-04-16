import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getInfoAsync } from '../../redux/actions/infoActions';
import s from './Header.module.scss'
import { useEffect } from 'react';
import { clearToken } from '../../redux/slicers/tokenSlice';

const Header = () => {

    const dispatch = useAppDispatch()
    const { name, email, verified } = useAppSelector(state => state.infoSlice.info)

    useEffect(() => {
        dispatch(getInfoAsync())
    }, [dispatch])

    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.header__nav}>
                    <ul>
                        <li><span>Username: </span>{`${name ? name : 'your name'}`}</li>
                        {verified
                            ? <li><span>Verification: </span>{`User ${email} verified`}</li>
                            : <li><span>Verify your email: </span>{`${email ? email : 'your email'}`}</li>
                        }
                    </ul>
                    <button onClick={() => dispatch(clearToken())}>Log Out</button>
                </div>
            </div>
        </header>
    );
};

export default Header;