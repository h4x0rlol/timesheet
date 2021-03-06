import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../reducers";
import ModeButtons from "./components/ModeButtons";
import "../styles/MainPage.scss";
import NavBar from "../NavBar/Navbar";
import ToiletPage from "../ToiletPage/ToiletPage";
import { modeArray } from "../../utils/constants";
import SleepPage from "../SleepPage/SleepPage";

const MainPage = (props) => {
  const stats = useSelector((state: IRootState) => state.stats);
  const modeState = useSelector((state: IRootState) => state.mode);

  return (
    <main className={stats.showAddForm ? "mainpage_blur" : "mainpage"}>
      <NavBar />
      <div className="mainpage_mode">
        <ModeButtons modeState={modeState} />
      </div>
      {modeState.mode == modeArray[0] && <ToiletPage tz={props.tz} />}
      {modeState.mode == modeArray[1] && <SleepPage />}
    </main>
  );
};

export default MainPage;
