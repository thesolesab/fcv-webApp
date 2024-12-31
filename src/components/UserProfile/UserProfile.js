import React, { useEffect, useState } from 'react'
import UserStat from './UserStat';
import { useShowPopup } from '@vkruglikov/react-telegram-web-app';
import Spinner from '../Spinner/Spinner';
import useMainService from '../../services/MainService.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.js';
import { NavLink } from 'react-router';


function UserProfile({ user }) {
    const showPopup = useShowPopup();
    const [userData, setUserData] = useState(null);

    const { getUserById, changeUser, loading, error, } = useMainService()

    useEffect(() => {
        getUserById(user.id)
            .then(user => {
                setUserData(user)
            })
    }, [user.id]);

    const handleChangeName = (e) => {
        setUserData(prevData => ({
            ...prevData,
            name: e.target.value
        }));
    }

    const handleBlur = async () => {
        changeUser(user.id, JSON.stringify(userData))
            .then(
                () => {
                    showPopup({ message: 'Имя успешно сохранено' }).then(buttonId => console.log(buttonId));
                }
            )
    };

    function renderUser() {
        if (userData) {
            const { name, stat, gameDays } = userData

            return (
                <>
                    <div className="userName">
                        <input
                            type="text"
                            value={name}
                            name='name'
                            onChange={handleChangeName}
                            onBlur={handleBlur}
                        />
                        <img src={user.photo_url} alt="prof_img" />
                    </div>
                    <UserStat stat={stat} />
                    <div className="lastGames">
                        {gameDays.map(
                            (el, index) => (
                                <NavLink
                                    key={index}
                                    to={`/gameDay/${el._id}`}
                                >
                                    {el.date}
                                </NavLink>
                            )
                        )}
                    </div>
                </>
            )
        } else {

            if (!loading) return (
                `такого пользователя не найдено`
            )
        }
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = renderUser()

    return (
        <div className='container'>
            {spinner || errorMessage || content}
        </div>
    )
}

export default UserProfile