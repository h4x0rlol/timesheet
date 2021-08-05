import { sumTime } from "../functions";

const { Pool, Client } = require("pg");
require("dotenv").config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const DBgetUserByName = async (username: string) => {
  const query = {
    text: `SELECT * FROM "Users" WHERE username = $1`,
    values: [username],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};

export const DBgetUserById = async (user_id) => {
  const query = {
    text: `SELECT * FROM "Users" WHERE user_id = $1`,
    values: [user_id],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};

export const DBgetUserByToken = async (token: string) => {
  const query = {
    text: `SELECT * FROM "Users" WHERE token = $1`,
    values: [token],
  };
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (err) {
    console.log(err.stack);
  }
};

export const DBupdateAllToiletTime = async (user_id, time) => {
  try {
    const user = await DBgetUserById(user_id);
    const previousTime = user.all_toilet_time;

    const result = await sumTime(previousTime, time);

    const query = {
      text: `UPDATE "Users" SET all_toilet_time = $1 WHERE user_id = $2`,
      values: [result, user_id],
    };

    try {
      await pool.query(query);
      return result;
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};

export const DBgetAllTimeToiletData = async (user_id) => {
  try {
    const query = {
      text: `SELECT * FROM "Toilet" WHERE user_id = $1`,
      values: [user_id],
    };
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const DBgetYearToiletData = async (user_id, year) => {
  try {
    const query = {
      text: `SELECT * FROM "Toilet" WHERE user_id = $1 AND year = $2`,
      values: [user_id, year],
    };
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const DBgetMonthToiletData = async (user_id, month, year) => {
  try {
    const query = {
      text: `SELECT * FROM "Toilet" WHERE user_id = $1 AND month = $2 AND year = $3`,
      values: [user_id, month, year],
    };
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const DBgetWeekToiletData = async (user_id, month, year, day) => {
  try {
    let query = {};
    if (parseInt(day) > 7) {
      query = {
        text: `SELECT * FROM "Toilet" WHERE user_id = $1 AND month = $2 AND year = $3`,
        values: [user_id, month, year],
      };
    } else {
      const nextMonth = `0${parseInt(month) + 1}`;
      const previousMonth = `0${parseInt(month) - 1}`;
      query = {
        text: `SELECT * FROM "Toilet" WHERE user_id = $1 AND month IN ($2,$3,$4) AND year = $5`,
        values: [user_id, previousMonth, month, nextMonth, year],
      };
    }
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

export const DBgetDayToiletData = async (user_id, day, month, year) => {
  try {
    const query = {
      text: `SELECT * FROM "Toilet" WHERE user_id = $1 AND start_day = $2 AND month = $3 AND year = $4 OR user_id = $1 AND end_day = $2 AND month = $3 AND year = $4`,
      values: [user_id, day, month, year],
    };
    try {
      const res = await pool.query(query);
      return res.rows;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
