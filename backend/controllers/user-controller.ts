import { DBgetUserByName, DBgetUserByToken, pool } from "../utils/db";

const tokenGen = require("crypto");
const bcrypt = require("bcrypt");

export const register = async (req, res) => {
  try {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;
    const token = tokenGen.randomBytes(256).toString("base64");
    let userExists = await DBgetUserByName(username);
    if (userExists) {
      return res.status(400).send({
        message: "Такое имя пользователя уже существует",
      });
    } else {
      let hashedPassword = await bcrypt.hashSync(password, 12);
      const query = {
        text: 'INSERT INTO "Users"(username, password, token, all_toilet_time) VALUES($1, $2, $3, $4)',
        values: [username, hashedPassword, token, "0:0"],
      };
      try {
        await pool.query(query);
        const user = await DBgetUserByName(username);
        return res.status(200).json({
          user_id: user.user_id,
          username: user.username,
          token: user.token,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).send({
          message: e.message,
        });
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};

export const authenticate = async (req, res) => {
  try {
    const username = req.body.username.toLowerCase();
    const user = await DBgetUserByName(username);

    if (user) {
      let access = await bcrypt.compare(req.body.password, user.password);
      if (access) {
        if (!user.token) {
          const token = tokenGen.randomBytes(256).toString("base64");
          const query = {
            text: 'UPDATE "Users" SET token = $1 WHERE user_id = $2',
            values: [token, user.user_id],
          };
          try {
            await pool.query(query);
            return res.status(200).json({
              user_id: user.user_id,
              username: user.username,
              token: token,
            });
          } catch (e) {
            console.log(e);
            return res.status(500).send({
              message: e.message,
            });
          }
        }
        return res.status(200).json({
          user_id: user.user_id,
          username: user.username,
          token: user.token,
        });
      }
    }
    return res.status(404).json({ message: "Неверный логин или пароль" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const username = req.body.username.toLowerCase();
    const user = await DBgetUserByName(username);
    if (user) {
      const query = {
        text: 'UPDATE "Users" SET token = $1 WHERE user_id = $2',
        values: [null, user.user_id],
      };
      try {
        await pool.query(query);
        return res.status(200).json({
          user: user.id,
          token: user.token,
        });
      } catch (e) {
        console.log(e);
        return res.status(500).send({
          message: e.message,
        });
      }
    }

    return res.status(404).json({ message: "Пользователь не найден" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await DBgetUserByToken(req.body.token);

    if (user) {
      return res.status(200).json({
        user_id: user.user_id,
        username: user.username,
        token: user.token,
      });
    }
    return res.status(404).json({ message: "Ошибка авторизации" });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e.message,
    });
  }
};
