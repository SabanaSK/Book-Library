import db from "../config/db.js";

class post {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }
  async save() {
    let sql = `INSERT INTO postsbook(title, body) VALUES(?, ?)`;
    const [newPost] = await db.execute(sql, [this.title, this.body]);
    return newPost;
  }
  static findAll() {}
  static findById(id) {
    let sql = `SELECT * FROM postsbook WHERE Id = ${id};`;
    return db.execute(sql);
  }
}

export default post;
