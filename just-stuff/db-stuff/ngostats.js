use fundraising;

var startC,endC;
startC = new Date(2016,2,8,0,0);
endC = new Date(2016,3,28,23,59);
var lfc16 = { $gte: ISODate(startC.toISOString()), $lt: ISODate(endC.toISOString()) };

var donationStatus = ['DISBURSED', 'SETTLED'];
var resultArr = [];
var ngoCursor =  db.nonprofits.find({});
ngoCursor.forEach(function(ngo) {
  var result = {};
  result.ngo_name = ngo.name;
  var donorsArr = db.donations.distinct("user._id", { 'nonprofit._id' : ngo._id.valueOf(), 'created_at':lfc16, "status":{$in:donationStatus} });
  result.unique_donors = donorsArr.length;
  result.donations_count = db.donations.count({ 'nonprofit._id' : ngo._id.valueOf(), 'created_at':lfc16, "status":{$in:donationStatus} });

  result.donations = {};
  var donCursor = db.donations.find({ 'nonprofit._id' : ngo._id.valueOf(), 'created_at':lfc16, "status":{$in:donationStatus} });
  donCursor.forEach(function(donation){
    result.donations[donation.currency_code] = (result.donations[donation.currency_code] || 0 ) + donation.amount;
  });

  if(donorsArr.length > 0){
    resultArr.push(result);
  }
});
printjson(resultArr);

