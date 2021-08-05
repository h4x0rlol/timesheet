const datefns = require("date-fns");
import {
  DBgetAllTimeToiletData,
  DBgetDayToiletData,
  DBgetMonthToiletData,
  DBgetUserByToken,
  DBgetWeekToiletData,
  DBgetYearToiletData,
  DBupdateAllToiletTime,
  pool,
} from "../utils/db";
import {
  allTimeToiletData,
  dayToiletData,
  monthToiletData,
  weekToiletData,
  yearToiletData,
} from "../utils/types";
import {
  averageTime,
  getDaysOfWeek,
  getTime,
  sumTime,
} from "../utils/functions";

export const geAllTimeToiletData = async (req, res) => {
  try {
    const token = req.query.token;

    const user = await DBgetUserByToken(token);

    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден",
      });
    }

    const user_id = user.user_id;
    const records = await DBgetAllTimeToiletData(user_id);

    if (records.length === 0) {
      return res.status(404).send({
        message: "Статистика не найдена",
      });
    }

    let allTime = user.all_toilet_time;
    let successfull = 0;
    let notSuccessfull = 0;
    let neutral = 0;
    let diarrheas = 0;
    let constipations = 0;
    let normals = 0;
    let enemas = 0;
    let laxatives = 0;
    let sumRating = 0;
    let averageToiletTime, successfullPercent, averageRating;

    let tmp = "";
    let days = 0;
    for (let i = 0; i < records.length; i++) {
      if (parseInt(records[i].rating) > 3) {
        successfull += 1;
      } else if (parseInt(records[i].rating) === 3) {
        neutral += 1;
      } else {
        notSuccessfull += 1;
      }
      sumRating += parseInt(records[i].rating);
      diarrheas += parseInt(records[i].diarrhea);
      constipations += parseInt(records[i].constipation);
      normals += parseInt(records[i].normal);
      enemas += parseInt(records[i].enema);
      laxatives += parseInt(records[i].laxative);

      days += 1;
      if (tmp === records[i].start_day) {
        days -= 1;
      }
      tmp = records[i].start_day;
    }

    averageToiletTime = await averageTime(allTime, records.length);

    let goings = records.length;

    successfullPercent = ((successfull / goings) * 100).toFixed(1);

    averageRating = (sumRating / records.length).toFixed(1);

    let monthSplit = allTime.split(":");
    allTime = `${monthSplit[0]}ч ${monthSplit[1]}м`;
    successfullPercent = `${successfullPercent} %`;
    let avg = await averageToiletTime.split(":");
    averageToiletTime = `${avg[0]}ч ${avg[1]}м`;

    let averageGoings = (goings / days).toFixed(1);

    let allTimeToiletData: allTimeToiletData = {
      goings: goings,
      days: days,
      averageGoings: averageGoings,
      averageToiletTime: averageToiletTime,
      successfull: successfull,
      notSuccessfull: notSuccessfull,
      neutral: neutral,
      successfullPercent: successfullPercent,
      averageRating: averageRating,
      diarrheas: diarrheas,
      constipations: constipations,
      normals: normals,
      enemas: enemas,
      laxatives: laxatives,
      allTime: allTime,
    };
    return res.status(200).json({
      allTimeToiletData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};

export const getYearToiletData = async (req, res) => {
  try {
    const token = req.query.token;
    const time = req.query.time;
    const year = req.query.year;

    const user = await DBgetUserByToken(token);

    const timeArray = time.split(/[\s.,]+/);
    const day = parseInt(timeArray[0]);
    const month = parseInt(timeArray[1]) - 1;

    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден",
      });
    }

    const user_id = user.user_id;
    const records = await DBgetYearToiletData(user_id, year);

    if (records.length === 0) {
      return res.status(404).send({
        message: "Статистика не найдена",
      });
    }

    let yearTime = "0:0";
    let successfull = 0;
    let notSuccessfull = 0;
    let neutral = 0;
    let daysSkiped = 0;
    let diarrheas = 0;
    let constipations = 0;
    let normals = 0;
    let enemas = 0;
    let laxatives = 0;
    let sumRating = 0;
    let averageToiletTime, successfullPercent, averageRating;

    const dayOfYear = datefns.getDayOfYear(new Date(year, month, day));

    let tmp = "";
    let days = 0;
    for (let i = 0; i < records.length; i++) {
      yearTime = await sumTime(yearTime, records[i].time);

      if (parseInt(records[i].rating) > 3) {
        successfull += 1;
      } else if (parseInt(records[i].rating) === 3) {
        neutral += 1;
      } else {
        notSuccessfull += 1;
      }
      sumRating += parseInt(records[i].rating);
      diarrheas += parseInt(records[i].diarrhea);
      constipations += parseInt(records[i].constipation);
      normals += parseInt(records[i].normal);
      enemas += parseInt(records[i].enema);
      laxatives += parseInt(records[i].laxative);

      days += 1;
      if (tmp === records[i].start_day) {
        days -= 1;
      }
      tmp = records[i].start_day;
    }

    averageToiletTime = await averageTime(yearTime, records.length);

    let goings = records.length;

    successfullPercent = ((successfull / goings) * 100).toFixed(1);

    daysSkiped = dayOfYear - days;

    averageRating = (sumRating / records.length).toFixed(1);

    let monthSplit = yearTime.split(":");
    yearTime = `${monthSplit[0]}ч ${monthSplit[1]}м`;
    successfullPercent = `${successfullPercent} %`;
    let avg = await averageToiletTime.split(":");
    averageToiletTime = `${avg[0]}ч ${avg[1]}м`;

    let averageGoings = (goings / days).toFixed(1);

    let yearToiletData: yearToiletData = {
      goings: goings,
      days: days,
      averageGoings: averageGoings,
      averageToiletTime: averageToiletTime,
      successfull: successfull,
      notSuccessfull: notSuccessfull,
      neutral: neutral,
      successfullPercent: successfullPercent,
      daysSkiped: daysSkiped,
      averageRating: averageRating,
      diarrheas: diarrheas,
      constipations: constipations,
      normals: normals,
      enemas: enemas,
      laxatives: laxatives,
      yearTime: yearTime,
    };
    return res.status(200).json({
      yearToiletData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};

export const getWeekToiletData = async (req, res) => {
  try {
    const token = req.query.token;
    const time = req.query.time;

    const user = await DBgetUserByToken(token);

    const timeArray = time.split(/[\s.,]+/);
    const day = timeArray[0];
    const month = timeArray[1];
    const year = timeArray[2];

    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден",
      });
    }
    const user_id = user.user_id;
    const records = await DBgetWeekToiletData(user_id, month, year, day);

    if (records.length === 0) {
      return res.status(404).send({
        message: "Статистика не найдена",
      });
    }

    const currentDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day) - 1
    );

    let daysOfWeek = getDaysOfWeek(currentDate);
    let beginBorder = daysOfWeek[0];
    let endBorder = daysOfWeek[daysOfWeek.length - 1];

    const weekRecords = [];

    for (let i = 0; i < records.length; i++) {
      let s = parseInt(records[i].start_day);
      let e = parseInt(records[i].end_day);
      if (s >= beginBorder && e <= endBorder) {
        weekRecords.push(records[i]);
      }
    }

    if (weekRecords.length === 0) {
      return res.status(404).send({
        message: "Статистика не найдена",
      });
    }

    let weekTime = "0:0";
    let successfull = 0;
    let notSuccessfull = 0;
    let neutral = 0;
    let daysSkiped = 0;
    let diarrheas = 0;
    let constipations = 0;
    let normals = 0;
    let enemas = 0;
    let laxatives = 0;
    let sumRating = 0;
    let averageToiletTime, successfullPercent, averageRating;

    let tmp = "";
    let days = 0;
    for (let i = 0; i < weekRecords.length; i++) {
      weekTime = await sumTime(weekTime, weekRecords[i].time);

      if (parseInt(weekRecords[i].rating) > 3) {
        successfull += 1;
      } else if (parseInt(weekRecords[i].rating) === 3) {
        neutral += 1;
      } else {
        notSuccessfull += 1;
      }
      sumRating += parseInt(weekRecords[i].rating);
      diarrheas += parseInt(weekRecords[i].diarrhea);
      constipations += parseInt(weekRecords[i].constipation);
      normals += parseInt(weekRecords[i].normal);
      enemas += parseInt(weekRecords[i].enema);
      laxatives += parseInt(weekRecords[i].laxative);

      days += 1;
      if (tmp === weekRecords[i].start_day) {
        days -= 1;
      }
      tmp = weekRecords[i].start_day;
    }

    averageToiletTime = await averageTime(weekTime, weekRecords.length);

    let goings = weekRecords.length;

    successfullPercent = ((successfull / goings) * 100).toFixed(1);

    const dayOfWeek = daysOfWeek.indexOf(parseInt(day)) + 1;
    daysSkiped = dayOfWeek - days;

    averageRating = (sumRating / weekRecords.length).toFixed(1);

    let weekSplit = weekTime.split(":");
    weekTime = `${weekSplit[0]}ч ${weekSplit[1]}м`;
    successfullPercent = `${successfullPercent} %`;
    let avg = await averageToiletTime.split(":");
    averageToiletTime = `${avg[0]}ч ${avg[1]}м`;

    let averageGoings = (goings / days).toFixed(1);

    let weekToiletData: weekToiletData = {
      goings: goings,
      days: days,
      averageGoings: averageGoings,
      averageToiletTime: averageToiletTime,
      successfull: successfull,
      notSuccessfull: notSuccessfull,
      neutral: neutral,
      successfullPercent: successfullPercent,
      daysSkiped: daysSkiped,
      averageRating: averageRating,
      diarrheas: diarrheas,
      constipations: constipations,
      normals: normals,
      enemas: enemas,
      laxatives: laxatives,
      weekTime: weekTime,
    };
    return res.status(200).json({
      weekToiletData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};

export const getDayToiletData = async (req, res) => {
  try {
    const token = req.query.token;
    const time = req.query.time;

    const user = await DBgetUserByToken(token);

    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден",
      });
    }

    const timeArray = time.split(/[\s.,]+/);
    const day = timeArray[0];
    const month = timeArray[1];
    const year = timeArray[2];

    const user_id = user.user_id;

    const records = await DBgetDayToiletData(user_id, day, month, year);

    if (records.length === 0) {
      return res.status(404).send({
        message: "Статистика не найдена",
      });
    }

    let goings = records.length;
    let dayTime = "0:0";
    let diarrheas = 0;
    let constipations = 0;
    let normals = 0;
    let enemas = 0;
    let laxatives = 0;
    let sumRating = 0;
    let averageRating = "";
    let comments = [];

    for (let i = 0; i < records.length; i++) {
      dayTime = await sumTime(dayTime, records[i].time);

      sumRating += parseInt(records[i].rating);
      diarrheas += parseInt(records[i].diarrhea);
      constipations += parseInt(records[i].constipation);
      normals += parseInt(records[i].normal);
      enemas += parseInt(records[i].enema);
      laxatives += parseInt(records[i].laxative);
      if (records[i].commentary) {
        comments.push(records[i].commentary);
      } else {
        comments.push("");
      }
    }

    averageRating = (sumRating / records.length).toFixed(1);

    let daySplit = dayTime.split(":");
    dayTime = `${daySplit[0]}ч ${daySplit[1]}м`;

    let dayToiletData: dayToiletData = {
      goings: goings,
      dayTime: dayTime,
      averageRating: averageRating,
      diarrheas: diarrheas,
      constipations: constipations,
      normals: normals,
      enemas: enemas,
      laxatives: laxatives,
      comments: comments,
    };
    return res.status(200).json({
      dayToiletData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};

export const getMonthToiletData = async (req, res) => {
  try {
    const token = req.query.token;
    let month = req.query.month;
    const year = req.query.year;
    const user = await DBgetUserByToken(token);
    if (!user) {
      return res.status(404).send({
        message: "Пользователь не найден",
      });
    }
    const user_id = user.user_id;
    const records = await DBgetMonthToiletData(user_id, month, year);

    if (records.length === 0) {
      return res.status(404).send({
        message: "Статистика не найдена",
      });
    }

    let monthTime = "0:0";

    let daysInMonth = new Date(year, parseInt(month), 0).getDate();

    let successfull = 0;
    let notSuccessfull = 0;
    let neutral = 0;
    let daysSkiped = 0;

    let diarrheas = 0;
    let constipations = 0;
    let normals = 0;
    let enemas = 0;
    let laxatives = 0;
    let sumRating = 0;
    let averageToiletTime, successfullPercent, averageRating;

    let tmp = "";
    let days = 0;
    for (let i = 0; i < records.length; i++) {
      monthTime = await sumTime(monthTime, records[i].time);

      if (parseInt(records[i].rating) > 3) {
        successfull += 1;
      } else if (parseInt(records[i].rating) === 3) {
        neutral += 1;
      } else {
        notSuccessfull += 1;
      }
      sumRating += parseInt(records[i].rating);
      diarrheas += parseInt(records[i].diarrhea);
      constipations += parseInt(records[i].constipation);
      normals += parseInt(records[i].normal);
      enemas += parseInt(records[i].enema);
      laxatives += parseInt(records[i].laxative);

      days += 1;
      if (tmp === records[i].start_day) {
        days -= 1;
      }
      tmp = records[i].start_day;
    }

    averageToiletTime = await averageTime(monthTime, records.length);

    let goings = records.length;

    successfullPercent = ((successfull / goings) * 100).toFixed(1);

    daysSkiped = daysInMonth - days;

    averageRating = (sumRating / records.length).toFixed(1);

    let monthSplit = monthTime.split(":");
    monthTime = `${monthSplit[0]}ч ${monthSplit[1]}м`;
    successfullPercent = `${successfullPercent} %`;
    let avg = await averageToiletTime.split(":");
    averageToiletTime = `${avg[0]}ч ${avg[1]}м`;

    let averageGoings = (goings / days).toFixed(1);

    let monthToiletData: monthToiletData = {
      goings: goings,
      days: days,
      averageGoings: averageGoings,
      averageToiletTime: averageToiletTime,
      successfull: successfull,
      notSuccessfull: notSuccessfull,
      neutral: neutral,
      successfullPercent: successfullPercent,
      daysSkiped: daysSkiped,
      averageRating: averageRating,
      diarrheas: diarrheas,
      constipations: constipations,
      normals: normals,
      enemas: enemas,
      laxatives: laxatives,
      monthTime: monthTime,
    };
    return res.status(200).json({
      monthToiletData,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};

export const sendToiletData = async (req, res) => {
  try {
    const token = req.body.token;
    const startTime = req.body.start;
    const endTime = req.body.end;
    const enema = req.body.enema;
    const laxative = req.body.laxative;
    const diarrhea = req.body.diarrhea;
    const constipation = req.body.constipation;
    const normal = req.body.normal;
    const commentary = req.body.commentary;
    const rating = req.body.rating;

    const user = await DBgetUserByToken(token);

    const startArray = startTime.split(/[\s.,]+/);
    const startTimeArray = startArray[3].split(/[\s:]+/);
    const start = `${startTimeArray[0]}:${startTimeArray[1]}`;
    const startDay = startArray[0];

    const endArray = endTime.split(/[\s.,]+/);
    const endTimeArray = endArray[3].split(/[\s:]+/);
    const end = `${endTimeArray[0]}:${endTimeArray[1]}`;
    const endDay = endArray[0];

    const month = startArray[1];
    const year = startArray[2];

    if (start === end && startDay === endDay) {
      return res.status(400).send({
        message: "Одинаковое время начала и конца",
      });
    }

    const time = await getTime(start, end);
    const allTime = await DBupdateAllToiletTime(user.user_id, time);
    if (!allTime) {
      return res.status(404).send({
        message: "Пользователь не найден",
      });
    }

    const query = {
      text: 'INSERT INTO "Toilet"(user_id, start_time, end_time, time, month, year, rating, enema, laxative, diarrhea, constipation, normal, commentary, start_day, end_day) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
      values: [
        user.user_id,
        start,
        end,
        time,
        month,
        year,
        rating,
        enema,
        laxative,
        diarrhea,
        constipation,
        normal,
        commentary,
        startDay,
        endDay,
      ],
    };
    try {
      await pool.query(query);
      return res.status(200).json({
        user_id: user.user_id,
        allTime: allTime,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message: e.message,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};
