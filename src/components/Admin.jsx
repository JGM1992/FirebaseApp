import React, { useState, useEffect } from 'react'
import { Container, Grid, TextField, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useStyles } from '../assets/style'
import { data } from '../firebaseconfig'

export const Admin = () => {
    //#region useStates
    const classes = useStyles();
    const [idUsuario, setIdUsuario] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [telefono, setTelefono] = useState("")
    const [email, setEmail] = useState("")
    const [nombreError, setNombreError] = useState(null)
    const [apellidoError, setApellidoError] = useState(null)
    const [telefonoError, setTelefonoError] = useState(null)
    const [emailError, setEmailError] = useState(null)
    const [succes, setSucces] = useState(null)
    const [usuarioLista, setUsuarioLista] = useState([])
    const [modoEditar, setModoEditar] = useState(null)
    //#endregion

    useEffect(() => {
        const getUsuarios = async () => {
            const { docs } = await data.collection('usuario').get()
            const nvoArray = docs.map(item => ({ id: item.id, ...item.data() }))
            setUsuarioLista(nvoArray)
        }
        getUsuarios()
    }, [])

    const escribeNombre = (e) => {
        let name = e.target.value
        const expregUsr = /^[A-Z]+$/i;
        if (!expregUsr.test(name)) {
            setNombreError("El campo solo acepta letras [a-z-A-Z]")
            return;
        }
        setNombre(name)
        setNombreError(null)
    }
    const escribirApellido = (e) => {
        let apellidoP = e.target.value
        const expregApe = /^[A-Z]+$/i;
        if (!expregApe.test(apellidoP)) {
            setApellidoError("El campo solo acepta letras [a-z-A-Z]")
            return;
        }
        setApellido(apellidoP)
        setApellidoError(null)
    }
    const escribirTelefono = (e) => {
        setTelefono(e.target.value)
        if (telefono.replace(/\D+/g, "").length !== 10) {
            setTelefonoError("El campo telefono solo acepta 10 caracteres de tipo número")
            return
        }
        setTelefonoError(null)
    }
    const escribirEmail = (e) => {
        setEmail(e.target.value)
        console.log(email)
        const regext = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
        if (!regext.exec(email)) {
            setEmailError("El formato del correo electrónico es incorrecto")
            return;
        }
    }

    async function guardar() {

        const objUsuario = {
            nombre: nombre,
            apellidos: apellido,
            telefono: telefono,
            email: email
        }
        try {
            const datos = await data.collection('usuario').add(objUsuario)
            if (datos.id.trim()) {
                setSucces("Usuario agregada correctamente")
            }
            const { docs } = await data.collection('usuario').get()
            const nvoArray = docs.map(item => ({ id: item.id, ...item.data() }))
            setUsuarioLista(nvoArray)
        } catch (error) {
            console.log(error)
        }
        setNombre('')
        setApellido('')
        setTelefono('')
        setEmail('')
        setSucces(null)
    }
    async function eliminar(id) {
        try {
            await data.collection('usuario').doc(id).delete()
            const { docs } = await data.collection('usuario').get()
            const nvoArray = docs.map(item => ({ id: item.id, ...item.data() }))
            setUsuarioLista(nvoArray)
        } catch (error) {
            console.log(error)
        }
    }
    async function editar(id) {
        try {
            const datosActualizar = await data.collection('usuario').doc(id).get()
            const { nombre, apellidos, telefono, email } = datosActualizar.data()
            setNombre(nombre)
            setApellido(apellidos)
            setTelefono(telefono)
            setEmail(email)
            setIdUsuario(id)
            setModoEditar(true)
        } catch (error) {
            console.log(error)
        }
    }
    async function actualizar() {
        const objUsuario = {
            nombre: nombre,
            apellidos: apellido,
            telefono: telefono,
            email: email
        }
        try {
            await data.collection('usuario').doc(idUsuario).set(objUsuario)
            setSucces("Información actualizada correctamente")
            const { docs } = await data.collection('usuario').get()
            const nvoArray = docs.map(item => ({ id: item.id, ...item.data() }))
            setUsuarioLista(nvoArray)
        } catch (error) {
            console.log(error)
        }
        setNombre('')
        setApellido('')
        setTelefono('')
        setEmail('')
        setModoEditar(null)
    }

    return (
        <Container maxWidth="md">
            <Paper elevation={10} className={classes.paper}>
                <Grid
                    container
                    spacing={1}
                    direction="row"
                >
                    <Grid item xs={12} className={classes.grid}>
                        <h1>Agrega usuario</h1>
                    </Grid>
                    {
                        succes ?
                            (<Grid item xs={12}><Alert severity="success">{succes}!</Alert></Grid>)
                            :
                            (<span></span>)
                    }
                    <Grid item xs={6}>

                        <TextField
                            required
                            id="txtnombre"
                            label="Nombre"
                            onChange={(e) => { escribeNombre(e) }}
                            error={Boolean(nombreError)}
                            helperText={(nombreError)}
                            value={nombre}
                            className={classes.input} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="txtApelidos"
                            label="Apellidos"
                            onChange={(e) => { escribirApellido(e) }}
                            error={Boolean(apellidoError)}
                            helperText={(apellidoError)}
                            value={apellido}
                            className={classes.input} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="txtTelefono"
                            label="Teléfono"
                            type="text"
                            onChange={escribirTelefono}
                            value={telefono}
                            error={Boolean(telefonoError)}
                            helperText={(telefonoError)}
                            inputProps={{ maxLength: 10 }}
                            className={classes.input} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="TxtEmail"
                            label="Email"
                            type="text"
                            name="email"
                            onChange={escribirEmail}
                            value={email}
                            error={Boolean(emailError)}
                            helperText={(emailError)}
                            autoComplete="false"
                            className={classes.input} />
                    </Grid>
                    <Grid item xs={12}>
                        {
                            modoEditar ?
                                (
                                    <Button
                                        className='btn btn-block'
                                        onClick={() => { actualizar() }}
                                        style={{ backgroundColor: '#fc7700', color: '#ffffff' }}>Actualizar</Button>
                                )
                                :
                                (
                                    <Button
                                        className='btn btn-block'
                                        onClick={() => { guardar() }}
                                        style={{ backgroundColor: '#4b73f0', color: '#ffffff' }}>Guardar</Button>
                                )
                        }
                    </Grid>
                </Grid>
            </Paper>
            <Grid item xs={12} className={classes.grid}>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right"><b>Nombre</b></TableCell>
                                <TableCell align="right"><b>Apellidos</b></TableCell>
                                <TableCell align="right"><b>Teléfono</b></TableCell>
                                <TableCell align="right"><b>Email</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarioLista.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell align="right">{item.nombre}</TableCell>
                                    <TableCell align="right">{item.apellidos}</TableCell>
                                    <TableCell align="right">{item.telefono}</TableCell>
                                    <TableCell align="right">{item.email}</TableCell>
                                    <button
                                        className="btn btn-danger float-right"
                                        onClick={(id) => { eliminar(item.id) }}>Eliminar</button>
                                    <button
                                        className="btn btn-success mr-3 float-right"
                                        onClick={(id) => { editar(item.id) }}>Actualizar</button>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container >
    )
}