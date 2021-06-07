import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextMonth, previousMonth } from "../../reducers/dateReducer";
import { IRootState } from "../../reducers/index";
import FullStats from "./components/FullStats";
import MainPageButtons from "./components/MainPageButtons";
import ModeButtons from "./components/ModeButtons";
import "./MainPage.scss";
import NavBar from "./components/Navbar";
import Modal from "@material-ui/core/Modal";
import LoginPage from "../LoginPage/LoginPage";
import AddForm from "./components/AddForm";
import { showAddForm } from "../../reducers/toiletReducer";

const MainPage = () => {
  // const isFullStats = useSelector(
  //   (state: IRootState) => state.toilet.showFullStats
  // );
  const isFullStats = true;
  const date = useSelector((state: IRootState) => state.date);
  const toiletState = useSelector((state: IRootState) => state.toilet);

  const handleShow = () => {
    dispatch(showAddForm());
  };

  const dispatch = useDispatch();

  return (
    <main className={toiletState.showAddForm ? "mainpage_blur" : "mainpage"}>
      <NavBar />
      <div className="mainpage_mode">
        <ModeButtons />
      </div>
      <div className="mainpage_buttons">
        <p className="mainpage_buttons_all_time">
          Всего времени за месяц: 10ч 25м 10с
        </p>
        <div className="mainpage_buttons_month">
          <i
            className="arrow left"
            onClick={() => dispatch(previousMonth())}
          ></i>
          <p className="month_name">
            {date.month} ({date.year})
          </p>
          <i className="arrow right" onClick={() => dispatch(nextMonth())}></i>
        </div>
        <MainPageButtons isFullStats={isFullStats} />
      </div>
      <div className="mainpage_graph">
        {!isFullStats ? <div>graph </div> : <FullStats />}
      </div>
      <Modal
        open={toiletState.showAddForm}
        onClose={handleShow}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <AddForm />
      </Modal>
    </main>
  );
};

export default MainPage;
