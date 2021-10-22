import React from "react"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { push } from "connected-react-router"
import { TextField, makeStyles, Button, IconButton, CardContent } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { PhotoCamera, AccountCircle } from "@material-ui/icons";
import Card from '@material-ui/core/Card';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import "../../css/Register.css"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {orange} from '@material-ui/core/colors';
import { Link } from 'react-router-dom'

interface FormData {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    profileImage: FileList
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: 400,
        borderRadius: "3%",
        marginBottom: "5%",
    },
    multilineColor: {
        color: '#F26202',
        backgroundColor: 'white'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    label: {
        fontWeight: 700,
        justify: "center",
        backgroundColor: "#F26202",
        color:'white'
    },
});
const orangeTheme = createMuiTheme({ palette: { primary: orange } })


const Register = () => {
    const classes = useStyles();
    const searchParams = new URLSearchParams(window.location.search);
    const errMessage = searchParams.get("error");
    const { REACT_APP_API_SERVER } = process.env;
    const [submitting, setSubmitting] = useState<boolean>(false)
    const [serverErrors, setServerErrors] = useState<Array<string>>([])
    let [showPassword, setShowPassword] = useState<boolean>(false);
    const dispatch = useDispatch()
    const { register, handleSubmit, errors, watch } = useForm<FormData>({
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })
    
    const onSubmit = async (data: any) => {
        setSubmitting(true)
        setServerErrors([])

        if (data.password === data.confirmPassword) {
            const formData = new FormData()
            formData.append("username", data.username)
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("confirmPassword", data.confirmPassword)
            formData.append("profileImage", data.profileImage[0])
            const response = await fetch(`${REACT_APP_API_SERVER}/register`, {
                method: "POST",
                body: formData
            })
            const fetchData = await response.json()
            if (fetchData.errors) {
                setServerErrors(fetchData.errors)
            } else if (fetchData.success) {
                dispatch(push('/login?message=Registered+successfully'))
            }
        }
        // setServerErrors(["password and confirm-password must be matched"])
        setSubmitting(false)
    }
    
    return (
            <div className="reg-container">
                <Card elevation={10} className={classes.root}>
                    <CardContent>
                        <h4 style={{ marginTop: "5%" }} className={classes.multilineColor}>
                            Sign up for ChitChat
        </h4>
                        <form onSubmit={handleSubmit(onSubmit)} >
                            {serverErrors && <p>{serverErrors}</p>}
                            {errMessage && <p>{errMessage}</p>}
                            <div>
                                <TextField
                                    name="username"
                                    label="username"
                                    fullWidth={true}
                                    id="filled-full-width"
                                    variant="outlined"
                                    margin="normal"
                                    inputRef={register({
                                        required: "username cannot be empty",
                                        maxLength: {
                                            value: 20,
                                            message: "username input exceed 20 index",
                                        },
                                    })}
                                    placeholder="Input your username"
                                    error={Boolean(errors?.username)}
                                    helperText={
                                        errors.username ? errors.username.message : ""
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                            </div>
                            <div>
                                <TextField
                                    name="email"
                                    label="email"
                                    id="filled-full-width"
                                    fullWidth={true}
                                    variant="outlined"
                                    margin="normal"
                                    inputRef={register({
                                        required: "email must be filled",
                                        pattern: {
                                            // eslint-disable-next-line no-useless-escape
                                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "invalid email address",
                                        }
                                    })}
                                    placeholder="Input your email address"
                                    error={Boolean(errors?.email)}
                                    helperText={
                                        errors.email ? errors.email.message : ""
                                    }
                                />

                            </div>
                            <div>
                                <TextField
                                    id="filled-full-width"
                                    fullWidth={true}
                                    inputRef={register({
                                        required: "password must be filled",
                                        minLength: {
                                            value: 6,
                                            message: "At least 6-digit password code is required"
                                        }
                                    })}
                                    label="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    margin="normal"
                                    autoComplete="off"
                                    variant="outlined"
                                    error={Boolean(errors?.password)}
                                    helperText={
                                        errors.password ? errors.password.message : ""
                                    }
                                />

                            </div>
                            <div>
                                <TextField
                                    id="filled-full-width"
                                    fullWidth={true}
                                    inputRef={register({
                                        required: true,
                                        validate: (value) => value === watch('password') || "Confirm password has to be identical to your new password",
                                        minLength: {
                                            value: 6,
                                            message: "6-digit password code is required"
                                        }
                                    })}
                                    label="confirm password"
                                    margin="normal"
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    autoComplete="off"
                                    variant="outlined"
                                    error={Boolean(errors?.confirmPassword)}
                                    helperText={
                                        errors.confirmPassword ? errors.confirmPassword.message : ""
                                    }
                                />

                            </div>
                            <div className="show-hide-password">
                                {!showPassword && <span className="password-icons" onClick={() => {
                                    setShowPassword(showPassword = true)
                                }}><VisibilityIcon /></span>}
                                {showPassword && <span className="password-icons" onClick={() => {
                                    setShowPassword(showPassword = false)
                                }}><VisibilityOffIcon /></span>}
                                {!showPassword && <span>Show Password</span>}
                                {showPassword && <span>Hide Password</span>}
                            </div>
                            <div>
                                <label htmlFor="file-button">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                        className={classes.multilineColor}
                                    >
                                        <PhotoCamera />
                                    </IconButton>
                                    <Button color="primary" component="span" className={classes.multilineColor}>
                                        Upload Profile Picture
                    </Button>
                                </label>
                                <input
                                    className="uploadBtn"
                                    id="file-button"
                                    type="file"
                                    name="profileImage"
                                    ref={register}
                                />
                            </div>
                            <div>
                            <ThemeProvider theme={orangeTheme}>
                                <Button
                                    fullWidth={true}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={submitting}
                                    size="large"
                                    className={classes.label}>
                                    Register
                            
                </Button>
                </ThemeProvider>
                </div>
                
                        </form>
                        <h4>
                            Already have an account?
                            <Link to="/login/">
                                <div>Sign in</div>
                            </Link>
                        </h4>
                    </CardContent>
                </Card>
            </div>
        
    )
}

export default Register