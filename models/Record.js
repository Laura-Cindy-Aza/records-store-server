const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//RecordSchema - contains rules about how every Record should look like
const RecordSchema = new Schema ( {
    cover: {type: String, required: true},
    title: {type: String, required: true},
    artist: {type: String, required: true},
    year: {type: Date, required: true}
},
{
    versionKey: false,
    timestamps: true,
    toJSON:{
        virtuals:true,
    }
}
)

RecordSchema.virtual('fullRecordInfo').get(function(){
    return this.cover + ' ' + this.artist;
})

//User model => out interface to db (=users collection )
const Record = model('Record', RecordSchema);

module.exports = Record;