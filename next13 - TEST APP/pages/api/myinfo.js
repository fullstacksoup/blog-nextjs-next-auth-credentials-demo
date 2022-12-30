const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

import LibConst from "../../../libs/SliteConn";

export default async function (req, res){
  try{
    var dbFile = LibConst.get_config().CommentDbFileName
    
// console.log(d)
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
    // const items = await db.all('select * from Products order by ProductName desc');
    const items = await db.all('SELECT * FROM Comments');
    var ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.error(err);
      res.status(500).send();    
  }   
};
