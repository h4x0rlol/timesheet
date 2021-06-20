import React from "react";
import "../../styles/index.scss";
import Pepe from "../../../utils/images/pepe.gif";

const ToiletFullStats = (props) => {
  return (
    <div className="fullstats">
      {!props.error ? (
        <>
          <table className="rwd-table">
            <tbody>
              <tr>
                <td>Количество походов:</td>
                <td>{props.goings}</td>
              </tr>
              <tr>
                <td>Всего дней с походами:</td>
                <td>НАПИСАТЬ</td>
              </tr>
              <tr>
                <td>Среднее время в туалете:</td>
                <td>{props.averageToiletTime}</td>
              </tr>
              <tr>
                <td>Успешных походов:</td>
                <td>{props.successfull}</td>
              </tr>
              <tr>
                <td>Безуспешных походов:</td>
                <td>{props.notSuccessfull}</td>
              </tr>
              <tr>
                <td>Нейтральных походов:</td>
                <td>{props.neutral}</td>
              </tr>
              <tr>
                <td>Процент успешных походов:</td>
                <td>{props.successfullPercent}</td>
              </tr>
              <tr>
                <td>Пропущено дней:</td>
                <td>{props.daysSkiped}</td>
              </tr>
              <tr>
                <td>Средняя оценка похода:</td>
                <td>{props.averageRating}</td>
              </tr>
              <tr>
                <td>Количество поносов:</td>
                <td>{props.diarrheas}</td>
              </tr>
              <tr>
                <td>Количество запоров:</td>
                <td>{props.constipations}</td>
              </tr>
              <tr>
                <td>Количество нормальных походов::</td>
                <td>{props.normals}</td>
              </tr>
              <tr>
                <td>Походов с клизмой:</td>
                <td>{props.enemas}</td>
              </tr>
              <tr>
                <td>Походов со слабительным:</td>
                <td>{props.laxatives}</td>
              </tr>
            </tbody>
          </table>
          <div className="fullstats_stats_center">
            <p>Просрано времени за месяц: {props.monthTime}</p>
            <img src={Pepe} alt="Pepe on toilet" />
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
