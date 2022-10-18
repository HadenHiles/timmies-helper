import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gamesplayed: 0,
            goals : 0,
        }

        this.getGoalsPerGame = this.getGoalsPerGame.bind(this);
        this.getShotsPerGame = this.getShotsPerGame.bind(this);
        this.getPPTimeOnIce = this.getPPTimeOnIce.bind(this)
        this.getAverageTimeOnIce = this.getAverageTimeOnIce.bind(this)
        this.getGamesPlayed = this.getGamesPlayed.bind(this);
        this.getGoals = this.getGoals.bind(this);
        this.getOpponentGAA = this.getOpponentGAA.bind(this);

        this.getGPGvsOpponent = this.getGPGvsOpponent.bind(this);
        this.getBestGuessValue = this.getBestGuessValue.bind(this);
    }

    getGamesPlayed() {
        if (this.props.player.nhldata) {
            return this.props.player.nhldata.gamesPlayed;
        }
        else {
            return 0;
        }
    }

    getGoals() {
        if (this.props.player.nhldata) {
            return this.props.player.nhldata.goals;
        }
        else {
            return 0;
        }
    }

    getGoalsPerGame() {
        if (!this.props.player.nhldata || this.props.player.nhldata.gamesPlayed === 0) {
            return 0;
        }
        else {
            return (this.props.player.nhldata.goals / this.props.player.nhldata.gamesPlayed).toFixed(2);
        }
    }

    getShotsPerGame() {
        if (!this.props.player.nhldata || this.props.player.nhldata.gamesPlayed === 0) {
            return 0;
        }
        else {
            return (this.props.player.nhldata.shots / this.props.player.nhldata.gamesPlayed).toFixed(2);
        }
    }

    getOpponentGAA() {
        if (!this.props.player.opponent) {
            return "N/A";
        }
        else {
            return (this.props.player.opponent.goalsAgainstPerGame.toFixed(2));
        }
    }

    getPPTimeOnIce() {
        if (!this.props.player.statsdata) {
            return 0;
        }
        else {
            return this.props.player.statsdata.powerPlayTimeOnIcePerGame;
        }
    }

    getAverageTimeOnIce() {
        if (!this.props.player.nhldata) {
            return 0;
        }
        else {
            return this.props.player.statsdata.timeOnIcePerGame;

        }
    }

    getGPGvsOpponent() {
        if (!this.props.player.gpgVSopp) {
            return "N/A";
        }
        else {
            return this.props.player.gpgVSopp.toFixed(2);
        }
    }

    getBestGuessValue() {
        if (!this.props.player.gpgVSopp || (!this.props.player.nhldata || this.props.player.nhldata.gamesPlayed === 0)) {
            return "N/A";
        }
        else {
            return parseFloat((parseFloat(this.props.player.gpgVSopp) + parseFloat((parseFloat(this.props.player.nhldata.goals) / parseFloat(this.props.player.nhldata.gamesPlayed))).toFixed(2))).toFixed(2);
        }
    }

    render() {
        return (
            <Row>
                <Col className="player-name" xs="2">{this.props.player.firstName.substring(0, 1)}. {this.props.player.lastName}</Col>
                <Col xs="1">{this.props.player.position}</Col>
                <Col xs="1"> {this.getGamesPlayed()}</Col>
                <Col xs="1">{this.getGoals()}</Col>
                <Col xs="1">{this.getShotsPerGame()}</Col>
                <Col xs="1">{this.getPPTimeOnIce()}</Col>
                <Col xs="1">{this.getAverageTimeOnIce()}</Col>
                <Col xs="1">{this.getGoalsPerGame()}</Col>
                <Col xs="1">{this.getGPGvsOpponent()}</Col>
                <Col xs="1">{this.getBestGuessValue()}</Col>
                <Col xs="1">{this.getOpponentGAA()}</Col>
            </Row>
            )
    }
}

export default Player;