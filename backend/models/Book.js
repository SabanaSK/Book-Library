import db from "../config/db.js";

class Book {
  constructor(title, image, genre, author) {
    this.title = title;
    this.image = image;
    this.genre = genre;
    this.author = author;
    this.ensureTableExists();
  }

  async ensureTableExists() {
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS postsbook (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        image VARCHAR(255), 
        genre VARCHAR(100) NOT NULL,
        author VARCHAR(100) NOT NULL
      );
    `;
    await db.execute(createTableSQL);
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

  static async updateById(id, title, image, genre, author) {
    const sql = `UPDATE postsbook SET title = ?, image = ?, genre = ?, author = ?  WHERE Id = ?`;
    await db.execute(sql, [title, image, genre, author, id]);
  }

  static async deleteById(id) {
    const sql = `DELETE FROM postsbook WHERE Id = ?`;
    await db.execute(sql, [id]);
  }
}

export default Book;
