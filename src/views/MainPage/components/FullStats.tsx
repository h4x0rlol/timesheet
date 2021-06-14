import React from "react";
import "./styles/index.scss";
import Pepe from "../../../utils/images/pepe.gif";

const FullStats = () => {
  return (
    <div className="fullstats">
      <table className="rwd-table">
        <tr>
          <td>Количество походов:</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Среднее время в туалете:</td>
          <td>1ч 10м</td>
        </tr>
        <tr>
          <td>Успешных походов:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Безуспешных походов:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Нейтральных походов:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Процент успешных походов:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Пропущено дней:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Средняя оценка похода:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Количество поносов:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Количество запоров:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Количество нормальных походов::</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Походов с клизмой:</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Походов со слабительным:</td>
          <td>0</td>
        </tr>
      </table>
      <div className="fullstats_stats_center">
        <p>Просрано времени: 10ч 20м 30с</p>
        <img src={Pepe} alt="Pepe on toilet" />
      </div>
    </div>
  );
};

export default FullStats;
