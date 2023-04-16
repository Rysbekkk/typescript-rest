import React from 'react';
import moment from 'moment';
import s from './Date.module.scss'


interface Props {
    createdAt: string,
    updatedAt: string
}

const Date: React.FC<Props> = ({ createdAt, updatedAt }) => {

    const makeFormattedDate = (date: string) => {
        return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
    const formattedCreated = makeFormattedDate(createdAt)
    const formattedUpdated = makeFormattedDate(updatedAt)


    return (
        <div className={s.date}>
            <p>created date:{formattedCreated}</p>
            <p>updated date:{formattedUpdated}</p>
        </div>
    );
};

export default Date;