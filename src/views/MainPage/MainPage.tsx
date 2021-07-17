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
  const toiletState = useSelector((state: IRootState) => state.toilet);
  const modeState = useSelector((state: IRootState) => state.mode);

  return (
    <main className={toiletState.showAddForm ? "mainpage_blur" : "mainpage"}>
      <NavBar />
      <div className="mainpage_mode">
        <ModeButtons modeState={modeState} />
      </div>
      {modeState.mode == modeArray[0] && (
        <ToiletPage tz={props.tz} token={props.token} />
      )}
      {modeState.mode == modeArray[1] && <SleepPage />}
    </main>
  );
};

export default MainPage;
