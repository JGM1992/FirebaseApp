import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from '../firebaseconfig'

export const Menu = () => {
    const historial = useHistory()
    const [usuario, setUsuario] = useState(null)
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUsuario(user.email)
                console.log(user.email)
            }
        })
    }, [])

    const cerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
        historial.push('/login')
    }

    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#1946bb", color: "#ffffff" }}>
                <ul className="navbar-nav mr-auto">
                    <li>
                        <Link className="nav-link" style={{ color: "#ffffff" }} to="/">Home</Link>
                    </li>
                    <li>
                        {
                            usuario ?
                                (<span></span>)
                                :
                                (<Link className="nav-link" style={{ color: "#ffffff" }} to="/login">Login</Link>)
                        }

                    </li>
                    <li>
                        {
                            usuario ?
                                (<Link className="nav-link" style={{ color: "#ffffff" }} to="/admin">Admin</Link>)
                                :
                                (<span></span>)
                        }

                    </li>
                </ul>
                {
                    usuario ?
                        (<button className="btn btn-danger" style={{ color: "#ffffff" }} onClick={cerrarSesion} >Cerrar sesión</button>)
                        :
                        (<span></span>)
                }
            </nav>
        </React.Fragment>
    )
}
