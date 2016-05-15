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

// Number of Donations on Campaigns
print('\nNumber of Donations on Campaigns');
db.donations.find({"status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}, "campaign": { $exists: true }}).count();

// Total donation amount 
print('\nTotal donation amount');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']} } },
	{ $group: { _id: "$currency_code", "total_donation": { "$sum": "$amount" } } }
]);

// Total Amount of Donations on Campaigns
print('\nTotal Amount of Donations on Campaigns');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}, "campaign": { $exists: true} } },
	{ $group: { _id: "$currency_code", "total_donation": { "$sum": "$amount" } } }
]);

// Average donation amount 
print('\nAverage donation amount');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']} } },
	{ $group: { _id: "$currency_code", "avg_donation": { "$avg": "$amount" } } }
]);

// Max donation amount 
print('\nHighest Individual Donation (INR and foreign currency, separate)');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']} } },
	{ $group: { _id: "$currency_code", "max_donation": { "$max": "$amount" } } }
]);

// NGO with most number of foreign donations (in LFC '16)
print('\nNGO with most number of foreign donations (in LFC 16)');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}, "currency_code": {$ne: 'INR'} } },
	{ $group: { _id: { _id:"$nonprofit._id", name: "$nonprofit.name"}, "total_no_donation": { "$sum": 1 } } },
	{ $sort: { "total_no_donation": -1} },
	{ $limit: 1 }
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

// NGO with most number of fundraisers
print('\nNGO with most number of fundraisers');
db.campaigns.aggregate([
	{ $group: { _id: {nonprofit: {_id: "$nonprofit._id", name: "$nonprofit.name"}, user: "$creator.id"} }},
	{ $group: { _id: "$_id.nonprofit", number_of_fundraisers: { $sum: 1 } }},
	{ $sort: { "number_of_fundraisers": -1} },
	{ $limit: 1 }
]);

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

// Donations in April v March
var start,end;
start = new Date(2016,2,1);
end = new Date(2016,2,31,23,59);
var march = { $gte: ISODate(start.toISOString()), $lt: ISODate(end.toISOString()) };
print('\nDonations in March');
print('total amounts');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}, "created_at": march } },
	{ $group: { _id: "$currency_code", "total_donation": { "$sum": "$amount" } } }
]);
print('number of donations');
db.donations.find({"status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}, "created_at": march}).count();


start = new Date(2016,3,1);
end = new Date(2016,3,30,23,59);
var april = { $gte: ISODate("2016-03-07T18:30:00.000Z"), 	$lt: ISODate("2016-04-28T18:29:00.000Z") };
print('\nDonations in April');
print('total amounts');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}, "created_at": april } },
	{ $group: { _id: "$currency_code", "total_donation": { "$sum": "$amount" } } }
]);

print('number of donations');
db.donations.find({"status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}, "created_at": april}).count();


// NGO amount raised from foreign donations
print('\nNGO amount raised from foreign donations');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}, "currency_code": {$ne: 'INR'} } },
	{ $group: { _id: { _id:"$nonprofit._id", name: "$nonprofit.name", currency_code :"$currency_code"}, "amount": { "$sum": "$amount" } } },
	{ $sort: { "amount": -1} },
	{ $sort: { "_id.name": -1} }
]);

// NGO amount raised
print('\nNGO amount raised');
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']} } },
	{ $group: { _id: { _id:"$nonprofit._id", name: "$nonprofit.name", currency_code :"$currency_code"}, "amount": { "$sum": "$amount" } } },
	{ $sort: { "amount": -1} },
	{ $sort: { "_id.name": -1} }
]);