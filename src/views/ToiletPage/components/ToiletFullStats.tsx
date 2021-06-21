import React from "react";
import "../../styles/index.scss";
import Pepe from "../../../utils/images/pepe.gif";
import ToiletTimeButtons from "./ToiletTimeButtons";

const ToiletFullStats = (props) => {
  return (
    <div className="fullstats">
      {!props.error ? (
        <>
          <table className="rwd-table">
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
          </table>
          <div className="fullstats_stats_center">
            <div className="fullstats_stats_center_time_arrows">
              <ToiletTimeButtons
                isLoading={props.isLoading}
                date={props.date}
                handlePreviousMonth={props.handlePreviousMonth}
                handleNextMonth={props.handleNextMonth}
              />
            </div>
            <div className="fullstats_stats_center_fulltime">
              <p>Просрано времени за месяц: {props.monthData.monthTime}</p>
              <img src={Pepe} alt="Pepe on toilet" />
            </div>
          </div>
        </>
      ) : (
        <div className="no_stats">
          <p>{props.error}</p>
        </div>
      )}
    </div>
  );
};

export default ToiletFullStats;
