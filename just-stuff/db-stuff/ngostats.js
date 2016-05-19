use fundraising;

var startC,endC;
startC = new Date(2016,2,8,0,0);
endC = new Date(2016,3,28,23,59);
var lfc16 = { $gte: ISODate(startC.toISOString()), $lt: ISODate(endC.toISOString()) };

var resultArr = [];
var ngoCursor =  db.nonprofits.find({});
ngoCursor.forEach(function(ngo) {
  var result = {};
  result.ngo_name = ngo.name;
  result.ngo_id = ngo._id;
  var donorsArr = db.donations.distinct("user._id", { 'nonprofit._id' : ngo._id.valueOf(), 'created_at': lfc16 });
  result.unique_donors = donorsArr.length;
  if(donorsArr.length > 0)
    resultArr.push(result);
});
printjson(resultArr);

