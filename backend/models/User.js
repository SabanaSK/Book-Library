import db from "../config/db.js";

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  async save() {
    const sql = `INSERT INTO users(username, email, password) VALUES(?, ?, ?)`;

    console.log(this.username, this.email, this.password);
    const [newUser] = await db.execute(sql, [
      this.username,
      this.email,
      this.password,
    ]);
    this.id = newUser.insertId;
    return this;
  }
  static async findByEmail(email) {
    const sql = `SELECT * FROM users WHERE email = ?`;
    const [users] = await db.execute(sql, [email]);

    if (users.length === 0) {
      return null;
    }
    const user = users[0];
    return new User(user.username, user.email, user.password);
  }
}

export default User;
