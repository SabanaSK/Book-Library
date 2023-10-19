import db from "../config/db.js";

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.ensureTablesExist();
  }

  async ensureTablesExist() {
    const createUsersTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `;
    await db.execute(createUsersTableSQL);
  }
  async save() {
    const sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
    console.log(this.username, this.email, this.password);
    const [newUser] = await db.execute(sql, [
      this.username,
      this.email,
      this.password,
    ]);
    this.id = newUser.insertId;
    return this;
  }

  static async findAll() {
    const sql = `SELECT * FROM users`;
    const [allUsers] = await db.execute(sql);
    return allUsers;
  }
  static async findByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [users] = await db.execute(sql, [email]);

    if (users.length === 0) {
      return null;
    }
    const user = users[0];
    return new User(user.id, user.username, user.email, user.password);
  }

  static async findById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [users] = await db.execute(sql, [id]);

    if (users.length === 0) {
      return null;
    }
    const user = users[0];
    return new User(user.id, user.username, user.email, user.password);
  }

  static async deleteById(id) {
    const sql = `DELETE FROM users WHERE Id = ?`;
    await db.execute(sql, [id]);
  }

  static async findRefreshTokenForUser(userId, token) {
    const sql = "SELECT token FROM tokens WHERE user_id = ? AND token = ?";
    const [tokens] = await db.execute(sql, [userId, token]);

    if (tokens.length === 0) {
      return null;
    }
    return tokens[0].token;
  }

  static async storeRefreshTokenForUser(userId, token) {
    const sql = "INSERT INTO tokens(user_id, token) VALUES(?, ?)";
    await db.execute(sql, [userId, token]);
  }

  static async invalidateRefreshTokenForUser(userId, token) {
    const sql = "DELETE FROM tokens WHERE user_id = ? AND token = ?";
    await db.execute(sql, [userId, token]);
  }
}

export default User;
