use fundraising;

var startC = new Date(2016, 3, 18, 0, 0);
var endC = new Date(2016, 3, 28, 23, 59);
var inviteC = {$gte: ISODate(startC.toISOString()), $lt: ISODate(endC.toISOString())};

var count = 0;
var result = {};
var camCursor = db.campaigns.find({'created_at': inviteC}).sort({'created_at': 1});
camCursor.forEach(function (campaign) {
  var inviteCount = db.inviteemails.count({'campaign_id':campaign._id.valueOf()});
  if(inviteCount >= 10 && count < 500){
    count++;
    result[campaign.nonprofit.name] = (result[campaign.nonprofit.name] || 0) + 1;
  }
});
print(count);
printjson(result);