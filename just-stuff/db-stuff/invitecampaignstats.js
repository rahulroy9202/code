use fundraising;

var startC = new Date(2016, 3, 18, 0, 0);
var endC = new Date(2016, 3, 28, 23, 59);
var inviteC = {$gte: ISODate(startC.toISOString()), $lt: ISODate(endC.toISOString())};

var camCursor = db.campaigns.find({'created_at': inviteC});
camCursor.sort({'created_at': 1});
camCursor.forEach(function (campaign) {

});
