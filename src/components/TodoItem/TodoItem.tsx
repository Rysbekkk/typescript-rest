import { ITodo } from '../../interfaces/interface';
import Date from '../Date/Date';
import Task from '../Task/Task';
import Update from '../Update/Update';
import { useAppDispatch } from '../../hooks/hooks';
import { deleteTodoAsync, doneTodoAsync } from '../../redux/actions/updateActions';
import s from './TodoItem.module.scss'
import { useAppSelector } from "../../hooks/hooks";
import { handleToggle } from '../../redux/slicers/modalSlice';
import { handleSaveId } from '../../redux/slicers/editValuesSlice';


interface Props {
    item: ITodo,
    index: number
}

export enum UpdateType {
    DELETE = 'delete',
    DONE = 'done',
    EDIT = 'edit',
}

const TodoItem: React.FC<Props> = ({ item, index }) => {
    const dispatch = useAppDispatch()
    const { loading } = useAppSelector((state) => state.dynamicSlice);

    const loadingDone = loading.doneTodo?.[item._id] ? 'disabled' : null
    const loadingDelete = loading.deleteTodo?.[item._id] ? 'disabled' : null


    const deleteTodoUI = () => {
        dispatch(deleteTodoAsync(item._id))
    }

    const doneTodoUI = () => {
        dispatch(doneTodoAsync(item._id))
    }


    const handleToggleUI = () => {
        dispatch(handleToggle())
        dispatch(handleSaveId(item._id))
    }


    return (

        <div className={`${s.todoItem} row`}>
            <div className="col-4">
                <div className={s.todo__box}>
                    <span>Todo #{index + 1}</span>
                    <Date
                        createdAt={item.createdAt}
                        updatedAt={item.updatedAt}
                    />
                </div>
            </div>

            <div className="col-4">
                <div className={s.todo__box}>
                    <Task
                        title={item.title}
                        description={item.description}
                    />
                    <h2 className={item.status ? s.success : s.danger}>
                        {item.status ? 'Completed' : 'In Process'}
                    </h2>

                </div>
            </div>

            <div className="col-4">
                <div className={`${s.todo__box} ${s.todo__third}`}>
                    <Update
                        updateTodo={doneTodoUI}
                        title={UpdateType.DONE}
                        loading={loadingDone}
                    />
                    <Update
                        updateTodo={deleteTodoUI}
                        title={UpdateType.DELETE}
                        loading={loadingDelete}
                    />

                    <Update
                        updateTodo={handleToggleUI}
                        title={UpdateType.EDIT}

                    />

                </div>
            </div>

        </div>


    );
};

export default TodoItem;