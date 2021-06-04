import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../actions/user";
import { IRootState } from "../../reducers/index";
import { setError, setUser } from "../../reducers/userReducer";

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
  const error = useSelector((state: IRootState) => state.user.error);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogginForm, setisLogginForm] = useState<boolean>(true);
  const dispatch = useDispatch();

  const swtichForms = (e) => {
    e.preventDefault();
    dispatch(setError(""));
    setisLogginForm(!isLogginForm);
    setUsername("");
    setPassword("");
  };

  const signIn = (e) => {
    e.preventDefault();
    dispatch(setError(""));
    dispatch(login(username, password));
  };

  const signUp = (e) => {
    e.preventDefault();
    dispatch(setError(""));
    dispatch(register(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <>
      {isLogginForm ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Войти
            </Typography>
            <form className={classes.form} noValidate onSubmit={signIn}>
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
              {error && (
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              )}
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
              Войти
            </Typography>
            <form className={classes.form} noValidate onSubmit={signUp}>
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
              {error && error != "Аккаунт успешно зарегестрирован" && (
                <Alert variant="outlined" severity="error">
                  {error}
                </Alert>
              )}

              {error === "Аккаунт успешно зарегестрирован" && (
                <Alert variant="outlined" severity="success">
                  {error}
                </Alert>
              )}
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
