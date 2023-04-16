import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { handleTodoValues } from '../../redux/slicers/todoSlice';
import { createTodoAsync } from '../../redux/actions/todoActions';
import s from './TodoForm.module.scss'


const TodoForm = () => {

    const dispatch = useAppDispatch()
    const { values } = useAppSelector(state => state.todoSlice)
    const { loading } = useAppSelector(state => state.extraSlice)

    const handleValues = (prop: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(handleTodoValues({ ...values, [prop]: e.target.value }));
    };

    const createTodoUI = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createTodoAsync())
    }

    return (
        <section className={s.todoForm}>
            <form onSubmit={createTodoUI}>
                <h2>Typescript <span>CRUD</span> <span>TODO APP</span></h2>
                <input placeholder='title' type="text" onChange={handleValues('title')} />
                <input placeholder='description' type="text" onChange={handleValues('description')} />
                <button disabled={loading.createTodo} type='submit'>Create Todo</button>
            </form>
        </section>
    );
};

export default TodoForm;