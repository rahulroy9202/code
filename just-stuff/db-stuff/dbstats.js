use fundraising;

// Campaigns 
print('\nTotal campaigns in LFC 16');
db.campaigns.find({created_at: {
        $gte: ISODate("2016-03-07T18:30:00.000Z"),
        $lt: ISODate("2016-04-28T18:29:00.000Z")
    }}).count();
	
print('\nTotal campaigns in Product');
db.campaigns.count();

// Invites
print('\nTotal invites in LFC 16');
db.inviteemails.find({created: {
        $gte: ISODate("2016-03-07T18:30:00.000Z"),
        $lt: ISODate("2016-04-28T18:29:00.000Z")
    }}).count();
	
print('\nTotal invites in Product');
db.inviteemails.count();

// Total number of donations
print('\nTotal number of donations');
db.donations.find({"status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}}).count();

// Total donation amount 
print('\nTotal donation amount');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']} } },
	{ $group: { _id: "$currency_code", "total_donation": { "$sum": "$amount" } } }
]);

// Average donation amount 
print('\nAverage donation amount');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']} } },
	{ $group: { _id: "$currency_code", "avg_donation": { "$avg": "$amount" } } }
]);

// No. of Fundraisers (since launch)
print('\nNo. of Fundraisers (since launch)');
db.campaigns.aggregate([
	{ $match: {created_at: {$gte: ISODate("2016-03-07T18:30:00.000Z")}}},
	{ $group: { _id: "$creator.id" }},
	{ $group: { _id: null, count: { $sum: 1 }}}
]);

// No. of donors converted to fundraisers and as % of overall donors  
// % of donors woh are fundraisers
print('\nNo. of Fundraisers');
var fundraisers = db.campaigns.distinct("creator.id");
print(fundraisers.length);
print('\nNo. of Donors');
var donors = db.donations.distinct("user._id");
print(donors.length);
print('\nNo. of donors converted to fundraisers and as % of overall donors');
print((fundraisers.length/donors.length)*100);


// % funding targets reached via campaigns 
// What % of campaigns achieved funding target
print('\n% funding targets reached via campaigns');
var myCursor =  db.campaigns.find({});
var fundedCount = 0;
var totalCount = 0;
myCursor.forEach(function(campaign) {
	totalCount++;
	db.statistics.find({type:'campaign', _id:campaign._id}, function(stats){
		if(campaign.target <= stats.raised_amount) {
			fundedCount++;
		}
	});
});
var percentFunded = (fundedCount/totalCount)*100;
print(percentFunded);
