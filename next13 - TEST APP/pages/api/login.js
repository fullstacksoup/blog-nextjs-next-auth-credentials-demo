const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
var bcrypt = require('bcryptjs');
import {open} from 'sqlite';


import LibConst from "../../src/SliteConn";

// THIS IS NOT SECURE - each user has the same value for salt       
// EXAMPLE USER:
// "Id": 1,
// "Username": "user1",
// "Email": "user1@example.com",
// "Password": "$2a$10$VY7hrUIsU7wZXg0djY9xruRrp/F59hzA7sFjFhmiqb8.WtyOOmfVK",
// "Salt": "$2a$10$VY7hrUIsU7wZXg0djY9xru",

export default async function (req, res) {
  try {
    var dbFile = LibConst.get_config().CommentDbFileName
    
    // console.log(d)
    // const items = await db.all('select * from Products order by ProductName desc');
    const db = await open(
      {filename: dbFile , driver: sqlite3.Database}
    );
   
      const { Email, Password } = req.body;

      // Make sure there is an Email and Password in the request
      if (!(Email && Password)) {
          res.status(400).send("All input is required");
      }      
      let user = [];
      await db.all('SELECT * FROM Users WHERE Email = ?', Email, function(err, rows) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        
        rows.forEach(function (row) {
            user.push(row);                
        })
        
        var PHash = bcrypt.hashSync(Password, user[0].Salt);
   
        if(PHash === user[0].Password) {

          return user;                
        } else {
            return null 
        }


    });	

} catch (err) {
      
      // Create hash with user salt
      var PHash = bcrypt.hashSync(Password, user[0].Salt);

      if(PHash === user[0].Password) {              
        return res.status(200).send(user);     
      } else {
          return res.status(400).send("No Match");          
      }
      
  } catch (err) {
    console.log(err);
  }     
}
