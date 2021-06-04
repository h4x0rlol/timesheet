import React from "react";
import "./index.scss";
import Pepe from "../../../utils/images/pepe.gif";

const FullStats = () => {
  return (
    <div className="fullstats">
      <table className="table">
        <tbody>
          <tr>
            <td>Количество походов:</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Всего потрачено времени:</td>
            <td>5ч 10м 10с</td>
          </tr>
          <tr>
            <td>Среднее время в туалете:</td>
            <td>1ч 10м 5с</td>
          </tr>
          <tr>
            <td>Среднее время начала:</td>
            <td>17ч</td>
          </tr>
          <tr>
            <td>Успешных походов:</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Безуспешных походов:</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Нейтральных походов:</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Процент успешных походов:</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>Пропущено дней:</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Средняя оценка похода:</td>
            <td>4.5</td>
          </tr>
          <tr>
            <td>Количество поносов:</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Количество запоров:</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Количество нормальных походов:</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Походов с клизмой:</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Походов со слабительным:</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
      <div className="fullstats_text">
        <h3>Просрано времени: 10ч 20м 30с</h3>
        <img src={Pepe} alt="Pepe on toilet" />
      </div>
    </div>
  );
};

export default FullStats;
