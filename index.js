import express from "express";

import isUp from 'is-up';
import isreachable from 'is-reachable';
import bodyparser from "body-parser";
import date from 'date-and-time';

const PORT = 7000;

const app = express();

app.set("view engine","ejs")

app.use(bodyparser.urlencoded({ extended: false }));

app.use(bodyparser.json());

app.post("/singledomainstatuschecker", async (req, res) => {
  var url = req.body.domain;
//console.log(url);



/*  httpism.get(url).then(function (responseBody) {
    var msg= console.log(responseBody);
  }, function (error) {
    console.log('uh oh', error);
    var msg= "iTS uP"
  });
http://localhost:7000/bulksitedownchecker
  */


    var statusResult = await isreachable(url);
    if(statusResult){
      var now = new Date();
    var now1= date.format(now, 'YYYY/MM/DD HH:mm:ss');

      res.json({
        domain: url,
        domainstatus:"Site is Up (200) Ok",
        refresh_time:now1,
      });
    }
    else{
      const now = new Date();
      date.format(now, 'YYYY/MM/DD HH:mm:ss');

      res.json({
        domain: url,
        domainstatus:"Site is Down",
        refresh_time:now1,
      });
    }
});

app.get("/bulksitedownchecker", (req, res) => {
  res.render("bulksitedownchecker", { title: "URL Status Checker" });
});



app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
