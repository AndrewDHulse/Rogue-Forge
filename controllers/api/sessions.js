const User = require('../../models/user')
const Session = require('../../models/session')
const CharacterSheet = require ('../../models/characterSheet')
const Template = require ('../../models/characterSheetTemplate')

module.exports = {
    create,
    index,
}

async function create(req, res){
    try{
        //add session to the DB
        const session = await Session.create(req.body);
        res.json(session)
    } catch (err){
        console.log(err)
    }
}

async function index(req, res){
    try{
        const sessions= await Session.find({})
        res.json(sessions)
    }catch(err){
        console.log(err)
    }
}