const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//UserSchema - contains rules about how every User should look like
const UserSchema = new Schema ( {
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: {type: String, unique:true, required: true},
    nickname: { type: String, unique: true, required: true},
    password: {type: String, required:true},
    avatar: {type: String, required: true, default: '../assets/doge2.png'}

},
{
    versionKey: false,
    timestamps: true,
    toJSON:{
        virtuals: true,
    }
}
)

UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
})

//User model => out interface to db (=users collection )
const User = model('User', UserSchema);

module.exports = User;