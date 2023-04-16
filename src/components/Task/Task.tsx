import React from 'react';
import s from './Task.module.scss'

interface Props {
    title: string
    description: string
}

const Task: React.FC<Props> = ({ title, description }) => {
    return (
        <div className={s.task}>
            <p>title: {title}</p>
            <p>description: {description} </p>
        </div>
    );
};

export default Task;