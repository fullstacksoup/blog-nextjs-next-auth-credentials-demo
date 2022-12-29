const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
var bcrypt = require('bcryptjs');
import {open} from 'sqlite';


import LibConst from "../../src/SliteConn";

export default async function (req, res){
  try{
    var dbFile = LibConst.get_config().CommentDbFileName
    
    console.log(dbFile)
    // const items = await db.all('select * from Products order by ProductName desc');
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    const items = await db.all('SELECT * FROM Users');

    var ret ={
      data: items
    }
    res.json(ret);              
    
  } catch (err) {
    console.log(err);
  }     
};
