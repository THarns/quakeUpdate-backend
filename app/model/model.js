const sql = require('./db.js');

//constructor
let View = function(view) {
    this.viewId = view;
};

//getJSON data method
View.getJSONdata = (viewId, result) => {
    //create query using viewId parameter
    let query = sql.query( `SELECT Data from json_data WHERE TimeFrame = ?`, viewId, (err, res) => {
        if(err) {
            console.log("error: " + err);
        } else {
            let preparsed = JSON.parse(JSON.stringify(res[0].Data));
            let parsed = JSON.parse(preparsed);

            console.log(parsed);
            result(parsed);
        }
    });   
};

View.getMaxMagHour = (result) => {
    let query = sql.query('SELECT MaxMagHR from stats_log WHERE TimeStamp = (SELECT MAX(TimeStamp) FROM stats_log)', (err, res) => {
        if(err) {
            console.log("error: " + err);
        } else {
            let parsed = JSON.parse(JSON.stringify(res));

            console.log(parsed[0].MaxMagHR);
            result(parsed[0].MaxMagHR);
        }
    });
}

View.getTotalOfHour = (result) => {
    let query = sql.query('SELECT pastHRtotal from stats_log WHERE TimeStamp = (SELECT MAX(TimeStamp) FROM stats_log)', (err, res) => {
        if(err) {
            console.log("error: " + err);
        } else {
            let parsed = JSON.parse(JSON.stringify(res));

            console.log(parsed);
            result(parsed);
            //console.log(res);
        }
    });
}

View.getLastNofCombinedTotals = (result) => {
    let query = sql.query('SELECT * from stats_log ORDER BY TimeStamp DESC LIMIT 5', (err, res) => {
        if(err) {
            console.log("error: " + err);
        } else {
            let parsed = JSON.parse(JSON.stringify(res));

            console.log(parsed);
            let hourlyArr = [], twentyFourArr = [];
            for(let i = 0; i < parsed.length; i++) {
                hourlyArr.push(parsed[i].pastHRtotal);
                twentyFourArr.push(parsed[i].pastDaytotal);
            }

            let combinedArr = [hourlyArr.reverse(), twentyFourArr.reverse()];
            result(combinedArr);
        }
    });
}

View.getLastNofMaxMagHour = (result) => {
    let query = sql.query('SELECT * from stats_log ORDER BY TimeStamp DESC LIMIT 5', (err, res) => {
        if(err) {
            console.log("error: " + err);
        } else {
            let parsed = JSON.parse(JSON.stringify(res));
            let magArr = [];
            for(let i = 0; i < parsed.length; i++) {
                let item = parseFloat(parsed[i].MaxMagHR);
                let itemTrun = item.toFixed(1);
                magArr.push(itemTrun);
            }

            magArr.reverse();
            console.log(magArr);
            result(magArr);
        }
    });
}

View.get24HRTotals = () => {

}

View.getMax24Mag = () => {
    
}

module.exports = View;