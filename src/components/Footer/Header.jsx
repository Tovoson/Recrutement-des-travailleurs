import React from 'react'
import './header.scss'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="a-header">
            <div className="a-container">
                <div className="circle">
                    <span>PA</span>
                </div>
                <div className="links">
                    <Link className="link" to="./login">Admin</Link>
                </div>
            </div>
        </div>
    )
}

export default Header
