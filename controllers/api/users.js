const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

module.exports = {
    create,
    login,
    checkToken,
    index,
};

function checkToken(req, res) {
    console.log('req.user', req.user);
    res.json(req.exp);
}

async function create(req, res) {
    try {
        const user = await User.create(req.body);
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({name: req.body.name});
        if (!user) throw new Error();
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) throw new Error();
        const token = createJWT(user);
        res.json(token);
    } catch (err) {
        res.status(400).json('Bad Credentials');
    }
}


function createJWT(user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

async function index(req, res){
    try{
        const users=await User.find({});
        res.json(users);
    }catch(err){
        console.log(err)
    }
}