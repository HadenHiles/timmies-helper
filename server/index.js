const express = require('express')
const app = express()
const port = 3000
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
    var dobberVSopponentUrl = "https://frozenpool.dobbersports.com/frozenpool_playeropponent.php?player=" + playerId + "&opponent=" + abbrOpponent + "&games=ALL%3A10";

    rp(dobberVSopponentUrl).then((html) => {
        const $ = cheerio.load(html);
        var statsVSopp = $("#opponentStats_wrapper:first-child table#opponentStats:first-child");
        var gamesPlayed = parseInt($($($('tbody > tr:first-child > td:nth-child(1)')).first(), statsVSopp.first()).text());
        var goals = parseInt($($($('tbody > tr:first-child > td:nth-child(2)')).first(), statsVSopp.first()).text());
        var gpg = (Math.round(((goals / gamesPlayed)) * 100) / 100).toFixed(2);

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