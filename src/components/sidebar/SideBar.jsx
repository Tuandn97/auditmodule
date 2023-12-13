import './sidebar.scss'
import {Link, useLocation} from "react-router-dom";
import logo from "../assets/logo.png"
import {useEffect, useState} from "react";


const sidebarNavItems = [
    {
        display: 'DashBoard',
        icon: <i className='bx bxs-dashboard'></i>,
        to: '/',
        section : 'DashBoard'
    },
    {
        display: 'My Note',
        icon: <i className='bx bx-edit'></i>,
        to: '/note',
        section : 'note'
    },
    {
        display: 'Audit',
        icon: <i className='bx bxs-spreadsheet'></i>,
        to: '/audit',
        section : 'audit'
    },
    {
        display: 'Member',
        icon: <i className='bx bxs-user'></i>,
        to: '/member',
        section : 'member'
    },

]

const SideBar = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState()
    useEffect(() => {
        const {pathname} = location;
        const matchingItem = sidebarNavItems.find((item) => item.to === pathname);
        if (matchingItem) {
            setActiveItem(matchingItem.section);
        } else {
            // Clear the active item if there's no matching item
            setActiveItem('');
        }
    }, [location]);
    return <div className='sidebar'>
        <div className="sidebar__logo">
            <img src={logo} alt='Logo'></img>
        </div>
        <div className="sidebar__menu">
            <div
                className="sidebar__menu__indicator">
            </div>
            {
                sidebarNavItems.map((item, index)=>(
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeItem === item.section? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon} 
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default SideBar;