use fundraising

// Total campaigns 
print('Total campaigns in LFC 16')

db.campaigns.find({created_at: {
        $gte: ISODate("2016-03-07T18:30:00.000Z"),
        $lt: ISODate("2016-04-28T18:29:00.000Z")
    }}).count()
	
print('Total campaigns in Product')
use fundraising
db.campaigns.count()