import db from "../config/db.js";

class Token {
  constructor(id, user_id, token, issued_at, expires_at, revoked) {
    this.id = id;
    this.user_id = user_id;
    this.token = token;
    this.issued_at = issued_at;
    this.expires_at = expires_at;
    this.revoked = revoked;
    this.ensureTokenTableExist();
  }

  async ensureTokenTableExist() {
    const createTokensTableSQL = `
      CREATE TABLE IF NOT EXISTS tokens (
        token_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(512) UNIQUE NOT NULL,  
        issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        revoked BOOLEAN DEFAULT FALSE,       
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;
    await db.execute(createTokensTableSQL);
  }

  async save() {
    const sql =
      "INSERT INTO tokens(user_id, token, expires_at, revoked) VALUES(?, ?, ?, ?)";
    const [newToken] = await db.execute(sql, [
      this.user_id,
      this.token,
      this.expires_at,
      this.revoked,
    ]);
    this.id = newToken.insertId;
    return this;
  }
}

export default Token;
