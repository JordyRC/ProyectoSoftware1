const {Schema, model} = require('mongoose');

const UserSchema = Schema({
   
    
    birth_date:{
        type: Date,
      //  required:[true, 'The birth date is required']
    },
    email:{
        type: String,
        required:[true, 'The email is required'],
        unique:true
    },
    last_name:{
        type: String,
        required:[true, 'The last name is required']
    }, 
    name:{
        type: String,
        required:[true, 'The name is required']
    },
    picture:{
        type: String,
    }
});



module.exports = model('User', UserSchema, "Users");