var path            = require('path');
var mongoose        = require('mongoose'), Schema = mongoose.Schema;
// var moment        = require('moment');

var taskDefinitionSchema = new mongoose.Schema({

  taskDefinition            : {
    taskTitle           : { type: String, trim: true },
    taskDesc            : { type: String, trim: true }
  },

  status                : { type: String, trim: true, lowercase: true,enum: ['draft', 'active', 'inactive', 'deleted', 'closed', 'wip'] },
    tgroup                : { type: Schema.Types.ObjectId, ref: 'tgroups' },
    postedOn              : { type: Date, default: Date.now },
    postedBy              : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    channelList               : [{
      channelId:{ type: Schema.Types.ObjectId, ref: 'channel'},
      publishStatus: {type:String,trim:true,enum:['published','approved','rejected','returned']}                              
    }],
    target                : {type: String, trim: true, enum: ['all', 'channels']},
    startDate             : { type: Date },
    endDate               : { type: Date },
    budget                : { type: Number },
    skillproficiency            : { type: String, trim: true },
    taskType                : { type: Schema.Types.ObjectId, ref: 'task_types' },
    location                : { type: String},
    primarySkill              : { type: String},
    secondarySkill              : { type: String},
    allocatedManHours           : { type: Number, default: 0},
    allocatedPercent            : { type: Number, default: 0},
    remainingManHours           : { type: Number},
    remainingPercent            : { type: Number},
    tac                 : { type: Schema.Types.ObjectId, ref: 'tacs' },
    expiryDate              : { type: Date },
    taskTrace             : [{
      action:{ type: String },
      actionBy:{ type: Schema.Types.ObjectId, ref: 'User', required: true },
      timeStamp:{ type: Date, default: Date.now },
      remarks:{ type: String }
    }],
    tags                : [{ type: String, trim: true }],
    billable              : { type: String, lowercase: true, trim: true, enum: ['billable', 'nonbillable', 'indirectbillable']},

    applicationTypeAndObjectives    : {
      typeOfSystems           : [{ type: String, trim: true }],
      businessObjectives        : { type: String, trim: true }
    },

    requirements              :{
      proposedWorkFlow            : { type: String, trim: true },
      requiredFeatures            : { type: String, trim: true },
      users                 : { type: String, trim: true },
      inputs                  : { type: String, trim: true },
      outputs                 : { type: String, trim: true },
      dependencies              : { type: String, trim: true },
      reports                 : { type: String, trim: true },
      helpPage                : { type: String, trim: true }
    },

    designAndTechnology           :{
      brandGuidelines             : { type: String, trim: true },
      SSOLogging                : { type: String, trim: true },
      userAccountManagement         : { type: String, trim: true },
      preexistingConfidential         : { type: String, trim: true },
      architecture              : { type: String, trim: true },
      integrations              : { type: String, trim: true },
      technicalDocumentation          : { type: String, trim: true },
      operatingSystemsType          : [{ type: String, trim: true }],
      desktop                 : [{ type: String, trim: true }],
      mobile                  : [{ type: String, trim: true }],
      browserVersions             : [{ type: String, trim: true }],
      codeReview                : { type: String, trim: true },
      technicalDocumentation          : { type: String, trim: true }
    },

    security                :{
      auditing                : { type: String, trim: true },
      confidentialInformation         : { type: String, trim: true },
      errorLogging              : { type: String, trim: true },
      vulnerabilityScanning         : { type: String, trim: true },
      dataObfuscation             : { type: String, trim: true }
    },

    perfomanceAndUserAcceptanceTest     :{
      userCount                 : { type: String, trim: true },
      concurrentUserCount           : { type: String, trim: true },
      responseTimePageLoadTime          : { type: String, trim: true },
      performanceTesting            : { type: String, trim: true },
      userCount                 : { type: String, trim: true },
      concurrentUserCount           : { type: String, trim: true },
    },

    deploymentAndGoLive           :{
      deploymentPrimary             : { type: Schema.Types.ObjectId, ref: 'User'},
      deploymentSecondary           : { type: Schema.Types.ObjectId, ref: 'User'},
      serverHosting               : { type: String, trim: true },
      dataMigration               : { type: String, trim: true },
      postGoliveMaintenance           : { type: String, trim: true }
    },
    parentId                : { type: String},
    delegate                : [{ type: Schema.Types.ObjectId, ref: 'User'}]

});


taskDefinitionSchema.index({ "taskDefinition.taskTitle": "text", 
  "taskDefinition.taskDesc": "text"
},

{
  name: "taskDefinition_Search"
}
);

module.exports = mongoose.model('task_definition', taskDefinitionSchema);

