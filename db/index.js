const sqlite = require('sqlite3').verbose();

class Database {
  constructor(name,table){
    this.db = new sqlite.Database(name,(err)=>{
      if(err){
        console.log(err);
      }
    });
    // table name
    this.table = table;

  }

  getAll(){
    return new Promise((resolve,reject)=>{
      let sql = `SELECT * FROM ${this.table}`;
      this.db.all(sql,(err,rows)=>{
        if(err) return reject(err);
        resolve(rows);
      })
    })
  }

  addDict(word,mm){
    return new Promise((resolve,reject)=>{
      let sql = `INSERT INTO ${this.table} VALUES (NULL,?,?)`;
      this.db.run(sql,word,mm,(err)=>{
        if(err) return reject(err);
        resolve('dict added');
      })
    });
  }

  search(key,value,limit=15){
    return new Promise((resolve,reject)=>{
      let sql =  `SELECT * FROM ${this.table} WHERE ${key} LIKE '${value}%' ${limit ? 'LIMIT ' +limit: ''}`;
      this.db.all(sql,(err,rows)=>{
        if(err) return reject(err);
        resolve(rows);
      })
    })
  }

  search_word(word,limit=15){
    return new Promise((resolve,reject)=>{
      let sql =  `SELECT * FROM ${this.table} WHERE word LIKE '${word}%' ${limit ? 'LIMIT ' +limit: ''}`;
      this.db.all(sql,(err,rows)=>{
        if(err) return reject(err);
        resolve(rows);
      })
    })
  }
  search_mm(word,limit=15){
    return new Promise((resolve,reject)=>{
      let sql =  `SELECT * FROM ${this.table} WHERE definition LIKE '%${word}%' ${limit ? 'LIMIT ' +limit: ''}`;
      this.db.all(sql,(err,rows)=>{
        if(err) return reject(err);
        resolve(rows);
      })
    })
  }

  findWord(value){
    return new Promise((resolve,reject)=>{
      let sql = `SELECT * FROM ${this.table} WHERE word=?`;
      this.db.get(sql,value,(err,result)=>{
        if(err) return reject(err);
        resolve(result);
      })
    })
  }
  
}

module.exports = Database;




