var path            = require('path');
var mongoose        = require('mongoose'), Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var userSchema = new Schema({
  name             : {
      prefix         : { type: String, trim: true },
      first          : { type: String, trim: true, required: true },
      middle         : { type: String, trim: true },
      last           : { type: String, trim: true, required: true },
      suffix         : { type: String, trim: true }
    },
    email            : { type: String, trim: true, required: true },
    avatar           : { type: String, trim: true },
    summary          : { type: String, trim: true },
    jobTitle         : { type: String, trim: true },
    organization     : { type: String, trim: true },
    orgRef           : { type: Schema.Types.ObjectId, ref: 'client' },
    association      : {type: String, enum: ['employee', 'partner', 'customer', 'contractor'], trim: true },
    socialProfile    : [{
      handle         : { type: String, trim: true },
      network        : { type: String, trim: true }
    }],
    contactNo        : [{
      contactNumber         : { type: String, trim: true },
      contactType           : { type: String, trim: true }
    }],
    stats            : {
      dateCreated    : { type: Date},
      dateLastLogin  : { type: Date}
    },
    preferences      : {
      language       : { type: String, trim: true }
    },
    local            : {
        email        : { type: String, trim: true, required: true },
        password     : { type: String, trim: true, required: true }
    },
    facebook         : {
        id           : { type: String, trim: true },
        token        : { type: String, trim: true },
        email        : { type: String, trim: true },
        name         : { type: String, trim: true }
    },
    twitter          : {
        id           : { type: String, trim: true },
        token        : { type: String, trim: true },
        displayName  : { type: String, trim: true },
        username     : { type: String, trim: true }
    },
    google           : {
        id           : { type: String, trim: true },
        token        : { type: String, trim: true },
        email        : { type: String, trim: true },
        name         : { type: String, trim: true }
    },
    token            : {type: Object},
    status           : {type: String, default: 'Active'},
    memberOf         : [{ type: Schema.Types.ObjectId, ref: 'group' }],
    empShortId        : { type: String },
    resetPasswordToken: String,
    resetPasswordExpires: Date
})

module.exports = mongoose.model('user',userSchema);