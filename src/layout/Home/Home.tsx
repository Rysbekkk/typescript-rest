import TodoForm from '../../components/TodoForm/TodoForm';
import TodoItem from '../../components/TodoItem/TodoItem';
import List from '../../components/List/List';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { useEffect } from 'react'
import { getTodosAsync } from '../../redux/actions/todoActions';
import { ITodo } from '../../interfaces/interface';
import Modal from '../../components/Modal/Modal';


const Home = () => {

    const { todos } = useAppSelector(state => state.todoSlice)
    const { getTodo } = useAppSelector(state => state.extraSlice.loading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])

    return (
        <>
            <section>
                <div className="container">
                    {getTodo && <h2>Loading...</h2>}
                    <TodoForm />
                    <List
                        items={todos ?? []}
                        renderItem={
                            (item: ITodo, index: number) => <TodoItem index={index} item={item} key={item._id} />
                        }
                    />
                </div>
            </section>
            <Modal />
        </>
    );
};

export default Home;    