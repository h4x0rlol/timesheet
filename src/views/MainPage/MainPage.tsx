import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../reducers/index";
import ModeButtons from "./components/ModeButtons";
import "../styles/MainPage.scss";
import NavBar from "../NavBar/Navbar";
import ToiletPage from "../ToiletPage/ToiletPage";

const MainPage = () => {
  const toiletState = useSelector((state: IRootState) => state.toilet);

  return (
    <main className={toiletState.showAddForm ? "mainpage_blur" : "mainpage"}>
      <NavBar />
      <div className="mainpage_mode">
        <ModeButtons />
      </div>
      <ToiletPage />
    </main>
  );
};

export default MainPage;
