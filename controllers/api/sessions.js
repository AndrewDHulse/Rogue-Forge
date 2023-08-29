const Session = require('../../models/session')

module.exports = {
    create,
    index,
    show,
    deleteSession
}

async function create(req, res){
    try{
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

async function show(req, res){
    try{
        const session = await Session.findById(req.params.id);
        res.json(session);
    }catch(err){
        console.log(err)
    }
}

async function deleteSession(req, res) {
    try {
        const session = await Session.findById(req.params.id);
        if (!session) {
            return res.status(404).json({ message: "Session not found." });
        }
        await session.deleteOne(); 
        return res.json({ message: "Session deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting session." });
    }
}