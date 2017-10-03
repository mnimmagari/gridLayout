function getMyVisits(thisUser, timeline, limit, page, perPage, sort, query, fields){

    // console.log("----------- in getMyVisits service ", limit, page, perPage, sort, query, fields)

    var deferred = Q.defer();

   
    // by default filter not applicable for "vManager, exec"
    var filter = {};
    var drafts_filter = {};
    var user_filter = {};
    var userId = thisUser._id;
    var userSessions = "";

    getUserSessions(userId)
    .then(function(data){
        userSessions = data;

        var projected = _(userSessions).chain().flatten().pluck('visit').unique().value();

        var sessionVisits = arrUnique(projected);

        var today = moment().startOf('day');
        var pastEnd = moment.utc(today).subtract(1, 'days');
        var pastBegin = moment.utc(pastEnd).subtract(7,'years');

        if( secure.isInAnyGroups(thisUser, "customer")) {
                filter = {
                    $and: [
                    {client : thisUser.orgRef}
                    , {startDate: {$gte: pastBegin, $exists: true, $ne: null}}
                    ]
                    };

                // filter = {client : thisUser.orgRef};  // all visits by his company
            }
            else if(secure.isInAnyGroups(thisUser, "exec")){
                filter = {startDate: {$gte: pastBegin, $exists: true, $ne: null}};
            }
            else if(secure.isInAnyGroups(thisUser, "admin")){
                filter = {startDate: {$gte: pastBegin, $exists: true, $ne: null}};
            }
            else if( secure.isInAnyGroups(thisUser, "vManager")){
                filter = {

                    $and: 
                    [
                        {startDate: {$gte: pastBegin, $exists: true, $ne: null}},

                        {$or: 
                        [
                            {createBy: userId}
                            , {agm: userId}
                            , {anchor: userId}
                            , {secondaryVmanager: userId}
                            , {'cscPersonnel.salesExec': userId}
                            , {'cscPersonnel.accountGM': userId}
                            , {'cscPersonnel.industryExec': userId}
                            , {'cscPersonnel.globalDelivery': userId}
                            , {'cscPersonnel.cre': userId}
                            , {'_id': { $in: sessionVisits }}
                            , {'invitees': userId }
                        ]}

                    ]
                };
            } // end of secure if
            else if( secure.isInAnyGroups(thisUser, "user")){
                filter = {

                    $and: 
                    [
                        {startDate: {$gte: pastBegin, $exists: true, $ne: null}},

                        {$or: 
                        [
                            {createBy: userId}
                            , {agm: userId}
                            , {anchor: userId}
                            , {secondaryVmanager: userId}
                            , {'cscPersonnel.salesExec': userId}
                            , {'cscPersonnel.accountGM': userId}
                            , {'cscPersonnel.industryExec': userId}
                            , {'cscPersonnel.globalDelivery': userId}
                            , {'cscPersonnel.cre': userId}
                            , {'_id': { $in: sessionVisits }}
                            , {'invitees': userId }
                        ]}

                    ]
                };
            }
            var visitsByTimeline = new Array();

            model
            .find(filter)   
            .limit(perPage)
            .skip(perPage*page)     
            .populate('client')
            .sort('startDate')
            .exec(function(err, list){
                // console.log("------- list in getMyVisits() = " , list);
                if(err) {
                    deferred.reject(err);
                }
                else{
                    transform(list);
                    deferred.resolve(visitsByTimeline);
                    // console.log(" ------------ visitsByTimeline = ", visitsByTimeline)
                    // console.log(" ------------ visitsByTimeline[past].visits.length = ", visitsByTimeline["past"].visits.length  )
                }
            })

            function transform(visits){

                var visitsSorted =  _.sortBy( visits, 'startDate' );
                visitsSorted.forEach(function(visit){


                    var involved = [];

                    // add visit level participants
                    if(stringCmp(visit.anchor,thisUser._id)){
                        var thisOne = {
                            id : visit._id,
                            type: "Visit",
                            title: "Full Visit participation",
                            startTime : DateReplaceTime(visit.startDate, "08:30"),
                            endTime : DateReplaceTime(visit.endDate, "18:30"),
                            role : "Sponsor"
                        };
                        involved.push(thisOne);
                    }

                    if(stringCmp(visit.agm, thisUser._id)){
                        var thisOne = {
                            id : visit._id,
                            type: "Visit",
                            title: "Full Visit participation",
                            startTime : DateReplaceTime(visit.startDate, "08:30"),
                            endTime : DateReplaceTime(visit.endDate, "18:30"),
                            role : "Visit Manager"
                        };
                        involved.push(thisOne);
                    }

                    if(visit.invitees !== undefined){
                        if(arrContains(visit.invitees, thisUser._id)){
                            var thisOne = {
                                id : visit._id,
                                type: "Visit",
                                title: "Full Visit participation",
                                startTime : DateReplaceTime(visit.startDate, "08:30"),
                                endTime : DateReplaceTime(visit.endDate, "18:30"),
                                role : "Special Invitee"
                            }
                            involved.push(thisOne);
                        }
                    }else {
                    }

                    userSessions.forEach(function(thisSession){

                        if(stringCmp(thisSession.visit, visit._id)){
                            // sesion level participants
                            if(stringCmp(thisUser._id,thisSession.session.owner)){
                                var thisOne = {
                                    id : thisSession._id,
                                    startTime : thisSession.session.startTime,
                                    endTime : thisSession.session.endTime,
                                    type : thisSession.session.type,
                                    title : thisSession.session.title,
                                    role : thisSession.session.type == "presentation"? "Speaker" : "Owner"
                                }
                                involved.push(thisOne);
                            }

                            if(stringCmp(thisUser._id,thisSession.session.supporter)){
                                var thisOne = {
                                    id : thisSession._id,
                                    startTime : thisSession.session.startTime,
                                    endTime : thisSession.session.endTime,
                                    type : thisSession.session.type,
                                    title : thisSession.session.title,
                                    role : "Supporter"
                                }
                                involved.push(thisOne);
                            }

                            if(thisSession.invitees !== undefined){
                                if(arrContains(thisSession.invitees, thisUser._id)){
                                    var thisOne = {
                                        id : thisSession._id,
                                        startTime : thisSession.session.startTime,
                                        endTime : thisSession.session.endTime,
                                        type : thisSession.session.type,
                                        title : thisSession.session.title,
                                        role : "Session Invitee"
                                    }
                                    involved.push(thisOne);
                                }
                            }
                            else {
                            }
                        }
                    }) // end of visit -> session foreach loop

                    visit.set('involved', involved,  { strict: false });
                }) // end of visit loop

var today = moment().startOf('day');
var thisWeekBeginsOn = moment.utc(today).startOf('isoweek').isoWeekday(0);
var thisWeekEndsOn = moment.utc(today).endOf('isoweek').isoWeekday(6);
var nextWeekBeginsOn = moment.utc(thisWeekEndsOn).add(1,'days');
var nextWeekEndsOn = moment.utc(nextWeekBeginsOn).add(7,'days');
var pastEnd = moment.utc(today).subtract(1, 'days');
var pastBegin = moment.utc(pastEnd).subtract(7,'years');
var furtherStart = moment.utc(today).add(1, 'days');
var furtherEnd = moment.utc(furtherStart).add(1,'years');
var thisWeek = today.range("week");
var thisDay = getDayRange(today);
var todayRange = moment.range(thisDay.start._d, thisDay.end._d);
var past = moment.range(pastBegin, pastEnd);
var further = moment.range(furtherStart, furtherEnd);
var nextOne = moment.range(thisDay.start._d, nextWeekEndsOn)

    // console.log("---------- visitsSorted  = " ,visitsSorted);
    // console.log("---------- visitsSorted.length  = " ,visitsSorted.length);


}   //  end of transform

return deferred.promise;

} // getMyVisits method ends