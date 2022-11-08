const express = require('express')
const app = express()
const port = 3030
const rp = require('request-promise');
const cheerio = require('cheerio');
const cors = require('cors');
app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
  res.send('Try an endpoint!')
});

app.get('/playerByName/', (req, res) => {
    var firstName = req.query.firstName.toLowerCase();
    var lastName = req.query.lastName.toLowerCase();
    switch (firstName) {
        case "mitch":
            firstName = "mitchell";
            break;
        case "jake":
            firstName = "jacob";
            break;
        default:
            firstName = firstName;
    }

    var dobberPlayerProfileUrl = "https://frozenpool.dobbersports.com/players/" + firstName + "-" + lastName;

    rp(dobberPlayerProfileUrl).then((html) => {
        const $ = cheerio.load(html);
        //success!
        var playerIdHtml = $('#hidden_player_id');
        var playerId = playerIdHtml['0'].attribs.value;

        res.json({
            dobberUrl: dobberPlayerProfileUrl,
            playerId: playerId
        });
    }).catch((err) => {
        res.json({error: err.message});
    });
});

app.get('/playerGoalsPerGameVSopponent', (req, res) => {
    var playerId = req.query.playerId;
    var abbrOpponent = req.query.opp.toUpperCase();
    switch (abbrOpponent) {
        case "TBL":
            abbrOpponent = "T.B";
            break;
        case "NJD":
            abbrOpponent = "N.J";
            break;
        default:
            abbrOpponent = abbrOpponent;
    }

    var dobberVSopponentUrl = "https://frozenpool.dobbersports.com/frozenpool_playeropponent.php?player=" + playerId + "&opponent=" + abbrOpponent + "&games=ALL%3A10";
    
    rp(dobberVSopponentUrl).then((html) => {
        const $ = cheerio.load(html);
        var gamesPlayed = parseInt($($("h3.text-center:contains('Stats vs Opponent')").next().find("table#opponentStats > tbody > tr:first-child > td:nth-child(1)")).text());
        var gamesPlayed = gamesPlayed ? gamesPlayed : 0;
        var goals = parseInt($($("h3.text-center:contains('Stats vs Opponent')").next().find("table#opponentStats > tbody > tr:first-child > td:nth-child(2)")).text());
        var goals = goals ? goals : 0;
        var gpg = (gamesPlayed != 0 && goals != 0) ? (Math.round(((goals / gamesPlayed)) * 100) / 100).toFixed(2) : 0.00;

        // console.log("opp: " + abbrOpponent + "\nid: " + playerId + "\n" + "GPG: " + gpg + "\n" + "Games Played: " + gamesPlayed + "\n" + "Goals: " + goals + "\n\n");

        res.json({
            dobberUrl: dobberVSopponentUrl,
            playerGPGvsOpponent: gpg
        });
    }).catch((err) => {
        res.json({error: err.message});
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});