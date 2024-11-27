import style from "./Navigation.module.css"

import { Link } from "react-router-dom"


import classNames from 'classnames'

function Navigation() {
  return (


    <>
    <nav className= {classNames(style.navigation, style.container)}>
        <div className={style.logo}>
            <img src="/images/LasLogo.png" alt="logo" />
        </div>
        <div className={style.navBar}>
            <ul>
                <li ><Link className={style.this_page} to="/">Home</Link></li>
                <li ><Link className={style.this_page} to="/cat">Categories</Link></li>
                <li ><Link className={style.this_page} to="/abt">About Us</Link></li>
                <li > <Link className={style.this_page} to="/contactUs">Contact Us</Link></li>
                <li>FAQs</li>
                </ul>
    </div>
        <div className={style.button}>
            <button className={style.login}>
            <Link className={style.loginPage} to="/login">Login</Link>
            </button>
            <button className={style.signup}>
            <Link className={style.loginPage} to="/register">Sign Up</Link>
            </button>
        </div>

       
    </nav>
    <hr />

    
    </>
   
  )
}

export default Navigation