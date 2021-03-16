const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//RecordSchema - contains rules about how every Record should look like
const RecordSchema = new Schema ( {
    cover: {type: String},
    title: {type: String},
    artist: {type: String},
    year: {type: Date}
},
{
    versionKey: false,
    timestamps: true,
    toJSON:{
        virtual:true,
    }
}
)

RecordSchema.virtual('fullRecordInfo').get(function(){
    return this.cover + ' ' + this.artist;
})

//User model => out interface to db (=users collection )
const Record = model('Record', RecordSchema);

module.exports = Record;