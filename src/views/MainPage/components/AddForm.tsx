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
import { showAddForm } from "../../../reducers/toiletReducer";

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

const AddForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showAddForm());
  };

  return (
    <div className="add_form">
      <a className="close" onClick={handleShow} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Добавить данные
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              style={{
                backgroundColor: "#f5f6f7",
              }}
              InputProps={{
                style: {
                  color: "#f5f6f7",
                },
              }}
              InputLabelProps={{
                style: { color: "black", fontSize: "20px" },
              }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              name="username"
              autoFocus
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
            />

            <Button
              style={{
                backgroundColor: "#f5f6f7",
                color: "black",
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Войти
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddForm;
