import db from "../config/db.js";

class post {
  constructor(title, image, genre, author) {
    this.title = title;
    this.image = image;
    this.genre = genre;
    this.author = author;
  }
  async save() {
    let sql = `INSERT INTO postsbook(title, image, genre, author) VALUES(?, ?, ?, ?)`;
    const [newPost] = await db.execute(sql, [
      this.title,
      this.image,
      this.genre,
      this.author,
    ]);
    return newPost;
  }

  static async findAll() {
    const sql = `SELECT * FROM postsbook`;
    const [allPosts] = await db.execute(sql);
    return allPosts;
  }

  static async findById(id) {
    const sql = `SELECT * FROM postsbook WHERE Id = ?`;
    const [post] = await db.execute(sql, [id]);

    if (post.length === 0) {
      return null;
    }

    return post[0];
  }

  static async deleteById(id) {
    const sql = `DELETE FROM postsbook WHERE Id = ?`;
    await db.execute(sql, [id]);
  }
}

export default post;
