use fundraising

// Campaigns 
print('Total campaigns in LFC 16')
db.campaigns.find({created_at: {
        $gte: ISODate("2016-03-07T18:30:00.000Z"),
        $lt: ISODate("2016-04-28T18:29:00.000Z")
    }}).count()
	
print('Total campaigns in Product')
db.campaigns.count()

// Invites
print('Total invites in LFC 16')
db.inviteemails.find({created: {
        $gte: ISODate("2016-03-07T18:30:00.000Z"),
        $lt: ISODate("2016-04-28T18:29:00.000Z")
    }}).count()
	
print('Total invites in Product')
db.inviteemails.count()

// Total number of donations
print('Total number of donations')
db.donations.find({"status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']}}).count()

// Average donation amount 
print('Average donation amount')
db.donations.aggregate([
	{ $match: { "status" : {$in : ['CONFIRMED', 'DISBURSED', 'SETTLED']} } },
	{ $group: { _id: "$currency_code", "avg_donation": { "$avg": "$amount" } } }
])