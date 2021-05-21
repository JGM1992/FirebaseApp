import React, { useState } from 'react'
import { Grid, TextField, Button, Paper } from '@material-ui/core'
import { useStyles } from '../assets/style'
import { auth } from '../firebaseconfig'
import { Alert } from '@material-ui/lab'
import { useHistory } from 'react-router'

export const Login = () => {
    const historial = useHistory()
    const classes = useStyles();
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [succes, setSucces] = useState(null)
    const [errorEmail, seterrorEmail] = useState(null)
    const [passwordError, setPasswordError] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const escribirPassword = (e) => {
        setPassword(e.target.value)
        setSucces(null)
        setPasswordError(null)
        setErrorMsg(null)
    }
    const escribirEmail = (e) => {
        setEmail(e.target.value)
        setSucces(null)
        seterrorEmail(null)
        setErrorMsg(null)
    }

    const registrar = () => {

        //#region Registrar
        if (!email.trim()) {
            seterrorEmail('El campo Correo Electrónico no puede estar vacio')
            return
        }
        if (!password.trim()) {
            setPasswordError('El campo Password no puede estar vacio')
            return
        }
        //#region //------------Validaciones

        var expreg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_;$@$¡!%*¿?&#+<>/])[-_;A-Za-z\d$@$¡!%*¿?&#+<>/]{8}/;
        if (!expreg.test(password)) {
            setPasswordError("La contraseña no tiene el formato correcto");
            return;
        }

        const regext = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
        if (!regext.exec(email)) {
            seterrorEmail("El formato del correo electrónico es incorrecto")
            return;
        }
        //#endregion
        auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                console.log(result)
                setSucces("Usuario Creado Correctamente")
                historial.push('/')
            })
            .catch(e => {
                console.log(e)
                if (e.code === 'auth/invalid-email') {
                    setErrorMsg('El formato del correo electrónico es incorrecto')
                    setEmail('')
                    setPassword('')
                }
                if (e.code === 'auth/weak-password') {
                    setErrorMsg('La contraseña no tiene el formato correcto')
                    setEmail('')
                    setPassword('')
                }
            })
        setPassword("")
        setEmail("")
        setSucces(null)
        //#endregion 

    }

    const loginUser = () => {
        auth.signInWithEmailAndPassword(email, password)
            .then(result => { historial.push('/') })
            .catch(e => {
                console.log(e)
                if (e.code === 'auth/wrong-password') {
                    setErrorMsg('contraseña incorrecta')
                    setEmail('')
                    setPassword('')
                }
            })
        setPassword("")
        setEmail("")
        setSucces(null)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Grid container>
                        <Paper elevation={20} className={classes.paper1}>
                            {
                                succes != null ? (
                                    <Alert severity="success">{succes}!</Alert>) : (<></>)
                            }
                            <TextField
                                required
                                id="email-input"
                                label="Correo Electrónico"
                                type="email"
                                autoComplete="current-email"
                                onChange={(e) => { escribirEmail(e) }}
                                value={email}
                                variant="outlined"
                                className={classes.root}
                            />
                            {
                                errorEmail != null ? (
                                    <Alert severity="error">{errorEmail}!</Alert>) : (<></>)
                            }
                            <TextField
                                required
                                id="password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={(e) => { escribirPassword(e) }}
                                value={password}
                                inputProps={{ maxLength: 8 }}
                                variant="outlined"
                                className={classes.root}
                                helperText="Debe contener mínimo 8 posiciones considerando al menos una mayúscula, un carácter especial y un número"
                            />
                            {
                                passwordError != null ?
                                    (<Alert severity="error">{passwordError}!</Alert>)
                                    : (<></>)
                            }
                            <div>
                                <Button style={{ backgroundColor: "#fc7700", color: '#ffffff' }}
                                    type="submit" variant="contained"
                                    className='btn btn-block btu-primary'
                                    onClick={() => { registrar() }} >
                                    Regístrate</Button>
                            </div>
                            <hr></hr>
                            <div>
                                <Button style={{ backgroundColor: "#bbce00", color: '#ffffff' }}
                                    type="submit" variant="contained"
                                    className='btn btn-block btu-primary'
                                    onClick={() => { loginUser() }} >
                                    Iniciar sesión</Button>
                            </div>
                            {
                                errorMsg != null ?
                                    (<Alert severity="error">{errorMsg}!</Alert>)
                                    : (<></>)
                            }
                        </Paper>
                    </Grid>
                </div>
                <div className='col'></div>
            </div>
        </div>
    )
}