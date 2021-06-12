import React from "react";
import "./styles/index.scss";
import Pepe from "../../../utils/images/pepe.gif";

const FullStats = () => {
  return (
    <div className="fullstats">
      <div className="fullstats_stats">
        <div className="fullstats_stats_left">
          <p>Количество походов: 10</p>
          <p>Всего потрачено времени: 5ч 10м 10с</p>
          <p>Среднее время в туалете: 1ч 10м 5с</p>
          <p>Среднее время начала: 17ч</p>
          <p>Успешных походов: 0</p>
          <p>Безуспешных походов: 1</p>
          <p>Нейтральных походов: 10</p>
          <p>Процент успешных походов: 10%</p>
        </div>
        <div className="fullstats_stats_center">
          <p>Просрано времени: 10ч 20м 30с</p>
          <img src={Pepe} alt="Pepe on toilet" />
        </div>
        <div className="fullstats_stats_right">
          <p>Пропущено дней: 10</p>
          <p>Средняя оценка похода: 4.5</p>
          <p>Количество поносов: 5</p>
          <p>Количество запоров: 5</p>
          <p>Количество нормальных походов: 5</p>
          <p>Походов с клизмой: 5</p>
          <p>Походов со слабительным: 5</p>
        </div>
      </div>
    </div>
  );
};

export default FullStats;
