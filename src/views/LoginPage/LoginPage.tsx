import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/userReducer";
import axios from "axios";
import { store } from "react-notifications-component";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogginForm, setisLogginForm] = useState<boolean>(true);
  const dispatch = useDispatch();

  const erase = () => {
    setUsername("");
    setPassword("");
  };

  const swtichForms = (e) => {
    e.preventDefault();
    setisLogginForm(!isLogginForm);
    erase();
  };

  const submitSignIn = async (e) => {
    try {
      e.preventDefault();
      let res = await axios
        .post(`https://timeis-backend.herokuapp.com/api/authenticate`, {
          username: username,
          password: password,
        })
        .then(function (res) {
          if (res.status == 200) {
            dispatch(setUser(res.data));
            localStorage.setItem("token", res.data.token);
            console.log(res);
          }
        })
        .catch(function (error) {
          store.addNotification({
            title: "Произошла ошибка!",
            message: error.response
              ? error.response.data.message
              : error.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  const submitSignUp = async (e) => {
    try {
      e.preventDefault();
      let res = await axios
        .post(`https://timeis-backend.herokuapp.com/api/register`, {
          username: username,
          password: password,
        })
        .then(function (res) {
          if (res.status == 200) {
            console.log(res);
            store.addNotification({
              title: "Успешно!",
              message: "Аккаунт зарегестрирован",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 3000,
                onScreen: true,
              },
            });
            setisLogginForm(!isLogginForm);
            erase();
          }
        })
        .catch(function (error) {
          // handle error
          store.addNotification({
            title: "Произошла ошибка!",
            message: error.response
              ? error.response.data.message
              : error.message,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              onScreen: true,
            },
          });
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isLogginForm ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Вход
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitSignIn}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Имя пользователя"
                name="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Войти
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={swtichForms}>
                    {"Нет аккаунта? Зарегестрироваться"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Регистрация
            </Typography>
            <form className={classes.form} noValidate onSubmit={submitSignUp}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Имя пользователя"
                name="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Зарегестрироваться
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2" onClick={swtichForms}>
                    {"Есть аккаунт? Войти"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};

export default LoginPage;
