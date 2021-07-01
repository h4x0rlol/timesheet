import React from "react";
import "../../styles/index.scss";
import Pepe from "../../../utils/images/pepe.gif";
import ToiletTimeButtons from "./ToiletTimeButtons";
import { CircularProgress } from "@material-ui/core";
import { timeModeArray } from "../../../utils/constants";

const ToiletFullStats = (props) => {
  return (
    <>
      <div className="fullstats">
        {props.isLoading ? (
          <div className="fullstats_loader">
            <CircularProgress style={{ color: "#67e6dc" }} />
          </div>
        ) : (
          <>
            {!props.error ? (
              props.timeMode == timeModeArray[0] && (
                <table className="rwd-table">
                  <tbody>
                    <tr>
                      <td>Количество походов:</td>
                      <td>{props.dayData.goings}</td>
                    </tr>
                    <tr>
                      <td>Средняя оценка похода:</td>
                      <td>{props.dayData.averageRating}</td>
                    </tr>
                    <tr>
                      <td>Количество поносов:</td>
                      <td>{props.dayData.diarrheas}</td>
                    </tr>
                    <tr>
                      <td>Количество запоров:</td>
                      <td>{props.dayData.constipations}</td>
                    </tr>
                    <tr>
                      <td>Количество нормальных походов::</td>
                      <td>{props.dayData.normals}</td>
                    </tr>
                    <tr>
                      <td>Походов с клизмой:</td>
                      <td>{props.dayData.enemas}</td>
                    </tr>
                    <tr>
                      <td>Походов со слабительным:</td>
                      <td>{props.dayData.laxatives}</td>
                    </tr>
                    <tr>
                      <td>Комментарии:</td>
                      <td>{props.dayData.comments}</td>
                    </tr>
                  </tbody>
                </table>
              )
            ) : (
              <div className="fullstats_no_stats">
                <p>{props.error}</p>
              </div>
            )}
          </>
        )}

        <div className="fullstats_stats_center">
          {!props.error && !props.isLoading && (
            <div className="fullstats_stats_center_fulltime">
              {props.timeMode == timeModeArray[0] && (
                <p>Просрано времени за день: {props.dayData.dayTime}</p>
              )}
              {/* <p>Просрано времени за месяц: {props.monthData.monthTime}</p> */}
              <img src={Pepe} alt="Pepe on toilet" />
            </div>
          )}
        </div>
      </div>
      <div className="toilet_time_arrows">
        <ToiletTimeButtons
          isLoading={props.isLoading}
          date={props.date}
          timeMode={props.timeMode}
          handleNextYear={props.handleNextYear}
          handlePreviousYear={props.handlePreviousYear}
          handleNextMonth={props.handleNextMonth}
          handlePreviousMonth={props.handlePreviousMonth}
          handleNextTimeMode={props.handleNextTimeMode}
          handlePreviousTimeMode={props.handlePreviousTimeMode}
        />
      </div>
    </>
  );
};

export default ToiletFullStats;

{
  /* <table className="rwd-table">
                <tbody>
                  <tr>
                    <td>Количество походов:</td>
                    <td>{props.monthData.goings}</td>
                  </tr>
                  <tr>
                    <td>Всего дней с походами:</td>
                    <td>{props.monthData.days}</td>
                  </tr>
                  <tr>
                    <td>Среднее кол-во походов в день:</td>
                    <td>{props.monthData.averageGoings}</td>
                  </tr>
                  <tr>
                    <td>Среднее время в туалете:</td>
                    <td>{props.monthData.averageToiletTime}</td>
                  </tr>
                  <tr>
                    <td>Успешных походов:</td>
                    <td>{props.monthData.successfull}</td>
                  </tr>
                  <tr>
                    <td>Безуспешных походов:</td>
                    <td>{props.monthData.notSuccessfull}</td>
                  </tr>
                  <tr>
                    <td>Нейтральных походов:</td>
                    <td>{props.monthData.neutral}</td>
                  </tr>
                  <tr>
                    <td>Процент успешных походов:</td>
                    <td>{props.monthData.successfullPercent}</td>
                  </tr>
                  <tr>
                    <td>Пропущено дней:</td>
                    <td>{props.monthData.daysSkiped}</td>
                  </tr>
                  <tr>
                    <td>Средняя оценка похода:</td>
                    <td>{props.monthData.averageRating}</td>
                  </tr>
                  <tr>
                    <td>Количество поносов:</td>
                    <td>{props.monthData.diarrheas}</td>
                  </tr>
                  <tr>
                    <td>Количество запоров:</td>
                    <td>{props.monthData.constipations}</td>
                  </tr>
                  <tr>
                    <td>Количество нормальных походов::</td>
                    <td>{props.monthData.normals}</td>
                  </tr>
                  <tr>
                    <td>Походов с клизмой:</td>
                    <td>{props.monthData.enemas}</td>
                  </tr>
                  <tr>
                    <td>Походов со слабительным:</td>
                    <td>{props.monthData.laxatives}</td>
                  </tr>
                </tbody>
              </table> */
}
