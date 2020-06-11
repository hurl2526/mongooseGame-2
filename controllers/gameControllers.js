const express = require('express')
const router = express.Router();
const Game = require('../models/Game')
const uuid = require('uuidv4');

module.exports = {
//getAllGames
getAllGames: (req, res)=>{
  Game.find().then((games)=>{
    return res.status(200).json(games)
  }).catch((err)=> err)
},

//getOneGame

getSingleGame: (req,res)=>{
  const id = req.params.id
    game.findById(id).then((game)=>{
      if(game){
        return res.status(200).json({confirmation: 'success', game})
      }else {
        return res.status(400).json({confirmation:'fail', message:'game not found'})
      }
    })
    .catch((err)=> res.json({confirmation: 'fail', message:'server error'}))
  },

//createGame
createGame: (req,res)=>{
  // const {name,email,password} = req.body //short hand if you didnt want to write it out below.could just dp name.length
  if(!req.body.name || 
    !req.body.description)
  return res.status(504).json({confirmation: 'fail', message: `all fields must be completed`})
//does it exist?
Game.findOne({name:req.body.name}).then((game)=>{
  if(game){
    return res.status(400).json({confirmation:'fail', message:`game already exists`})
  }
  //else create new game and save
  // const salt = bcrypt.genSaltSync(10)
  // const hash = bcrypt.hashSync(req.body.password, salt)

  let newGame = new Game();
  // newGame.id = uuid()
  newGame.name = req.body.name
  newGame.description = req.body.description
  newGame.released = req.body.released
  newGame.playtime = req.body.playtime
  newGame.secret = req.body.secret
  newGame.timestamp = req.body.timestamp;

  newGame.save().then((game)=>{
    console.log(game)
    return res.status(200).json({confirmation:'success', game})
  })
  // .catch((err)=> res.json({
  //   confirmation: 'fail',
  //   message: 'game not saved to db'
  // }))
}).catch((err)=> 
res.status(500).json({confirmation: 'fail', message: 'server error'})
)
},
//
updateGame: (req, res) => {
  const id = req.params.id
  Game.findById(id).then((game)=>{
    if(!game){
      return res.status(404).json({confirmation:'fail',message: 'game not found'})
    }else {
      const updatedGame = req.body

      game.name = updatedGame.name ? updatedGame.name : game.name;
      game.description = updatedGame.description ? updatedGame.description : game.description;
      game.yearReleased = updatedGame.yearReleased ? updatedGame.yearReleased : game.yearReleased;
      game.playTime = updatedGame.playTime ? updatedGame.playTime : game.playTime;

      game.save().then((game)=> {
        return res.status(200).json({message:'game updated',game})
      })
      .catch((err)=>
        res.json({confirmation: 'fail', message: 'game not updated'})
      )
      }
      })
      .catch((err)=>
        res.json({confirmation: 'fail', message: 'server error'})
      )
      },
      //deletegame
      delete: (req, res)=> {
        const id = req.params.id
        game.findByIdAndDelete(id).then((game)=>{
          if(game){
          return res.status(200).json({message: 'game deleted'})
          }else {
            return res.status(404).json({message: 'no game to delete'})
          }
        }).catch((err)=>res.status(404).json({message:'game not found'}))
      }
}

