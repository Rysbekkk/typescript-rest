
import { useAppSelector } from '../../hooks/hooks';
import s from './Modal.module.scss'
import { handleToggle } from '../../redux/slicers/modalSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { handleEditValues } from '../../redux/slicers/editValuesSlice';
import { editTodoAsync } from '../../redux/actions/updateActions';


const Modal = () => {

    const dispatch = useAppDispatch()
    const { toggle } = useAppSelector(state => state.modalSlice)


    const { editValues } = useAppSelector(state => state.editValuesSlice)

    console.log(editValues)

    const handleValues = (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(handleEditValues({ ...editValues, [prop]: e.target.value }));
    };

    const editTodoUI = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(editTodoAsync())
        dispatch(handleToggle())
    }

    return (
        <div
            className={`${s.modalBackdrop} ${toggle ? s.modalBackdropActive : null}`}
            onClick={() => dispatch(handleToggle())}
        >
            <div onClick={e => e.stopPropagation()} className={`${s.modal} ${toggle ? s.modalActive : null}`}>
                <div className={s.modalHeader}>
                    <h2>title</h2>
                    <p onClick={() => dispatch(handleToggle())} className={s.modalCloseButton}>X</p>
                </div>
                <form onSubmit={editTodoUI} className={s.modalContent}>
                    <input value={editValues.title} onChange={handleValues('title')} type="text" />
                    <input value={editValues.description} onChange={handleValues('description')} type="text" />
                    <button type='submit' className={s.modalApplyButton}>Edit Todo</button>
                </form>

            </div>
        </div>

    );
};

export default Modal;