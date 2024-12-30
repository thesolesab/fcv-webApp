import { NavLink, useLocation } from 'react-router'
import headerMenu from '../../services/pathMenu.js'
const USER_DATA_JSON = { "id": 258454798, "first_name": "R&L", "last_name": "", "username": "R_and_L", "language_code": "ru", "is_premium": true, "allows_write_to_pm": true, "photo_url": "https://t.me/i/userpic/320/e1p_384j0Ahn2zGDxXqVB0I2YNt-uSdviJwvV_8oT4I.svg" }

function Header({ user }) {
    if (!user) {
        user = USER_DATA_JSON
    }


    let { pathname } = useLocation()


    return (
        <header className="header">
            <div className="content">
                <ul>
                    {headerMenu.map(
                        (menu, id) => {
                            return (
                                <li key={id}>
                                    <NavLink
                                        to={menu.path}
                                    >
                                        {menu.name.toUpperCase()}
                                    </NavLink>
                                </li>

                            )
                        }
                    )}
                </ul>
            </div>
            {pathname === '/' ?

                null
                :
                <div className="userSection">
                    <NavLink
                        to={'/'}
                    >
                        <img src={user.photo_url} alt="userLogo" className='userLogo' />
                    </NavLink>
                </div>
            }

        </header>
    )
}

export default Header