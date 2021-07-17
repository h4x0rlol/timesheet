import React from "react";
import "../../styles/ToiletFullStats.scss";
import Pepe from "../../../utils/images/pepe.gif";
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
              props.timeMode == timeModeArray[0] ? (
                <div className="table">
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
                        {props.dayData.comments.map((comment, index) => (
                          <tr key={index}>
                            <td>
                              {index + 1} - {comment}
                              <br />
                            </td>
                          </tr>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : props.timeMode == timeModeArray[1] ? (
                <div className="table">
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <td>Количество походов:</td>
                        <td>{props.weekData.goings}</td>
                      </tr>
                      <tr>
                        <td>Всего дней с походами:</td>
                        <td>{props.weekData.days}</td>
                      </tr>
                      <tr>
                        <td>Среднее кол-во походов в день:</td>
                        <td>{props.weekData.averageGoings}</td>
                      </tr>
                      <tr>
                        <td>Среднее время в туалете:</td>
                        <td>{props.weekData.averageToiletTime}</td>
                      </tr>
                      <tr>
                        <td>Успешных походов:</td>
                        <td>{props.weekData.successfull}</td>
                      </tr>
                      <tr>
                        <td>Безуспешных походов:</td>
                        <td>{props.weekData.notSuccessfull}</td>
                      </tr>
                      <tr>
                        <td>Нейтральных походов:</td>
                        <td>{props.weekData.neutral}</td>
                      </tr>
                      <tr>
                        <td>Процент успешных походов:</td>
                        <td>{props.weekData.successfullPercent}</td>
                      </tr>
                      <tr>
                        <td>Пропущено дней:</td>
                        <td>{props.weekData.daysSkiped}</td>
                      </tr>
                      <tr>
                        <td>Средняя оценка похода:</td>
                        <td>{props.weekData.averageRating}</td>
                      </tr>
                      <tr>
                        <td>Количество поносов:</td>
                        <td>{props.weekData.diarrheas}</td>
                      </tr>
                      <tr>
                        <td>Количество запоров:</td>
                        <td>{props.weekData.constipations}</td>
                      </tr>
                      <tr>
                        <td>Количество нормальных походов::</td>
                        <td>{props.weekData.normals}</td>
                      </tr>
                      <tr>
                        <td>Походов с клизмой:</td>
                        <td>{props.weekData.enemas}</td>
                      </tr>
                      <tr>
                        <td>Походов со слабительным:</td>
                        <td>{props.weekData.laxatives}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : props.timeMode == timeModeArray[2] ? (
                <div className="table">
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
                </div>
              ) : props.timeMode == timeModeArray[3] ? (
                <div className="table">
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <td>Количество походов:</td>
                        <td>{props.yearData.goings}</td>
                      </tr>
                      <tr>
                        <td>Всего дней с походами:</td>
                        <td>{props.yearData.days}</td>
                      </tr>
                      <tr>
                        <td>Среднее кол-во походов в день:</td>
                        <td>{props.yearData.averageGoings}</td>
                      </tr>
                      <tr>
                        <td>Среднее время в туалете:</td>
                        <td>{props.yearData.averageToiletTime}</td>
                      </tr>
                      <tr>
                        <td>Успешных походов:</td>
                        <td>{props.yearData.successfull}</td>
                      </tr>
                      <tr>
                        <td>Безуспешных походов:</td>
                        <td>{props.yearData.notSuccessfull}</td>
                      </tr>
                      <tr>
                        <td>Нейтральных походов:</td>
                        <td>{props.yearData.neutral}</td>
                      </tr>
                      <tr>
                        <td>Процент успешных походов:</td>
                        <td>{props.yearData.successfullPercent}</td>
                      </tr>
                      <tr>
                        <td>Пропущено дней:</td>
                        <td>{props.yearData.daysSkiped}</td>
                      </tr>
                      <tr>
                        <td>Средняя оценка похода:</td>
                        <td>{props.yearData.averageRating}</td>
                      </tr>
                      <tr>
                        <td>Количество поносов:</td>
                        <td>{props.yearData.diarrheas}</td>
                      </tr>
                      <tr>
                        <td>Количество запоров:</td>
                        <td>{props.yearData.constipations}</td>
                      </tr>
                      <tr>
                        <td>Количество нормальных походов::</td>
                        <td>{props.yearData.normals}</td>
                      </tr>
                      <tr>
                        <td>Походов с клизмой:</td>
                        <td>{props.yearData.enemas}</td>
                      </tr>
                      <tr>
                        <td>Походов со слабительным:</td>
                        <td>{props.yearData.laxatives}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : props.timeMode == timeModeArray[4] ? (
                <div className="table">
                  <table className="rwd-table">
                    <tbody>
                      <tr>
                        <td>Количество походов:</td>
                        <td>{props.allTimeData.goings}</td>
                      </tr>
                      <tr>
                        <td>Всего дней с походами:</td>
                        <td>{props.allTimeData.days}</td>
                      </tr>
                      <tr>
                        <td>Среднее кол-во походов в день:</td>
                        <td>{props.allTimeData.averageGoings}</td>
                      </tr>
                      <tr>
                        <td>Среднее время в туалете:</td>
                        <td>{props.allTimeData.averageToiletTime}</td>
                      </tr>
                      <tr>
                        <td>Успешных походов:</td>
                        <td>{props.allTimeData.successfull}</td>
                      </tr>
                      <tr>
                        <td>Безуспешных походов:</td>
                        <td>{props.allTimeData.notSuccessfull}</td>
                      </tr>
                      <tr>
                        <td>Нейтральных походов:</td>
                        <td>{props.allTimeData.neutral}</td>
                      </tr>
                      <tr>
                        <td>Процент успешных походов:</td>
                        <td>{props.allTimeData.successfullPercent}</td>
                      </tr>
                      <tr>
                        <td>Средняя оценка похода:</td>
                        <td>{props.allTimeData.averageRating}</td>
                      </tr>
                      <tr>
                        <td>Количество поносов:</td>
                        <td>{props.allTimeData.diarrheas}</td>
                      </tr>
                      <tr>
                        <td>Количество запоров:</td>
                        <td>{props.allTimeData.constipations}</td>
                      </tr>
                      <tr>
                        <td>Количество нормальных походов::</td>
                        <td>{props.allTimeData.normals}</td>
                      </tr>
                      <tr>
                        <td>Походов с клизмой:</td>
                        <td>{props.allTimeData.enemas}</td>
                      </tr>
                      <tr>
                        <td>Походов со слабительным:</td>
                        <td>{props.allTimeData.laxatives}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="fullstats_no_stats">
                  <p>Статистика не найдена</p>
                </div>
              )
            ) : (
              <div className="fullstats_no_stats">
                <p>{props.error}</p>
              </div>
            )}
          </>
        )}
        {!props.error && !props.isLoading && (
          <div className="fullstats_stats_center">
            <div className="fullstats_stats_center_fulltime">
              {props.timeMode == timeModeArray[0] && (
                <p>Просрано времени за день: {props.dayData.dayTime}</p>
              )}
              {props.timeMode == timeModeArray[1] && (
                <p>Просрано времени за неделю: {props.weekData.weekTime}</p>
              )}
              {props.timeMode == timeModeArray[2] && (
                <p>Просрано времени за месяц: {props.monthData.monthTime}</p>
              )}
              {props.timeMode == timeModeArray[3] && (
                <p>Просрано времени за год: {props.yearData.yearTime}</p>
              )}
              {props.timeMode == timeModeArray[4] && (
                <p>Всего просрано времени: {props.allTimeData.allTime}</p>
              )}
              <img src={Pepe} alt="Pepe on toilet" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ToiletFullStats;
