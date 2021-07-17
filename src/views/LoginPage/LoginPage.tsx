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
import { login, register } from "../../utils/Api/UserRequests";

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
    e.preventDefault();
    const res = await login(username, password);
    if (res.user) {
      dispatch(setUser(res.user));
      localStorage.setItem("token", res.user.token);
      console.log(localStorage.getItem("token"));
    }
  };

  const submitSignUp = async (e) => {
    e.preventDefault();
    const res = await register(username, password);
    if (res.user) {
      dispatch(setUser(res.user));
      localStorage.setItem("token", res.user.token);
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
