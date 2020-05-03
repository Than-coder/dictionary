const sqlite = window.require("sqlite3");

class DB {
  constructor(db) {
    this.db = new sqlite.Database(db);
    this.table = "dictionary";
  }
  static main(db) {
    this.db = new sqlite.Database(db);
    this.table = "dictionary";
  }

  static find_eng(word, limit = 20) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${this.table} WHERE english LIKE '${word}%' LIMIT ${limit} `;

      this.db.all(sql, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }

  static find_mm(word, limit = 20) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${this.table} WHERE myanmar LIKE '${word}%' LIMIT ${limit} `;

      this.db.all(sql, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });
  }
}
export default DB;
