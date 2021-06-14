import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { showAddForm } from "../../../reducers/toiletReducer";
import Box from "@material-ui/core/Box";
import Rating, { IconContainerProps } from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import "./styles/index.scss";
import axios from "axios";
import { store } from "react-notifications-component";
import { IRootState } from "../../../reducers/index";

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

const customIcons: {
  [index: string]: { icon: React.ReactElement; label: string };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const AddForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [enema, setEnema] = useState(false);
  const [laxative, setLaxative] = useState(false);
  const [diarrhea, setDiarrhea] = useState(false);
  const [constipation, setConstipation] = useState(false);
  const [normal, setNormal] = useState(false);
  const [commentary, setCommentary] = useState("");
  const [rating, setRating] = useState(1);

  const token = localStorage.getItem("token");

  const handleShow = () => {
    dispatch(showAddForm());
  };

  const handleStart = (e) => {
    e.preventDefault();
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let fullTime = new Date().toLocaleString("ru-Ru", {
      timeZone: tz,
    });
    setStart(fullTime);
  };

  const handleEnd = (e) => {
    e.preventDefault();
    let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let fullTime = new Date().toLocaleString("ru-Ru", {
      timeZone: tz,
    });
    setEnd(fullTime);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("send");
      let res = await axios
        .post(`${process.env.BACKEND_URL}/api/sendToiletData`, {
          token: token,
          start: start,
          end: end,
          enema: +enema,
          laxative: +laxative,
          diarrhea: +diarrhea,
          constipation: +constipation,
          normal: +normal,
          commentary: commentary,
          rating: rating,
        })
        .then(function (res) {
          // handle success
          if (res.status == 200) {
            console.log(res);
            store.addNotification({
              title: "Успешно!",
              message: "Данные отправлены",
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
            handleShow();
          }
        })
        .catch(function (error) {
          store.addNotification({
            title: "Произошла ошибка!",
            message: error.response.data.message,
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
    <div className="add_form">
      <a className="close" onClick={handleShow} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" color="inherit" align="left">
            Добавить данные
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <div className="time">
              <div className="time_inputs">
                <div className="time_inputs_input">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    disabled={true}
                    label="Время начала"
                    value={start}
                  />
                </div>
                <div className="time_inputs_label">
                  <Grid container>
                    <Grid item>
                      <Link
                        // href="#"
                        variant="body2"
                        style={{
                          cursor: "pointer",
                          // textDecoration: "none",
                          fontSize: "20px",
                          color: "#f5f6f7",
                        }}
                        onClick={handleStart}
                      >
                        {"Задать"}
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </div>
              <div className="time_inputs">
                <div className="time_inputs_input">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    disabled={true}
                    label="Время окончания"
                    value={end}
                  />
                </div>
                <div className="time_inputs_label">
                  <Grid container>
                    <Grid item>
                      <Link
                        // href="#"
                        variant="body2"
                        style={{
                          cursor: "pointer",
                          // textDecoration: "none",
                          fontSize: "20px",
                          color: "#f5f6f7",
                        }}
                        onClick={handleEnd}
                      >
                        {"Задать"}
                      </Link>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>

            <FormControlLabel
              control={
                <Checkbox
                  checked={enema}
                  onChange={(e) => setEnema(e.target.checked)}
                  // style={{
                  //   color: "#f5f6f7",
                  // }}
                />
              }
              label="Клизма"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={laxative}
                  onChange={(e) => setLaxative(e.target.checked)}
                  // style={{
                  //   color: "#f5f6f7",
                  // }}
                />
              }
              label="Слабительное"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={diarrhea}
                  onChange={(e) => setDiarrhea(e.target.checked)}
                  // style={{
                  //   color: "#f5f6f7",
                  // }}
                />
              }
              label="Понос"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={constipation}
                  onChange={(e) => setConstipation(e.target.checked)}
                  // style={{
                  //   color: "#f5f6f7",
                  // }}
                />
              }
              label="Запор"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={normal}
                  onChange={(e) => setNormal(e.target.checked)}
                  // style={{
                  //   color: "#f5f6f7",
                  // }}
                />
              }
              label="Нормальный стул"
            />

            <Box component="fieldset" mt={2} borderColor="transparent">
              <Typography component="legend" variant="h6">
                Оценка похода
              </Typography>
              <Rating
                name="customized-icons"
                defaultValue={1}
                getLabelText={(value: number) => customIcons[value].label}
                IconContainerComponent={IconContainer}
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Box>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Комментарий"
              value={commentary}
              onChange={(e) => setCommentary(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Отправить
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default AddForm;
