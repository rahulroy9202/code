instructions:
- create folder and place the following files.
- npm install

open server.js and set the following:
line 12
redirect url

line 41 - 45
database configuration

line 146
ip and port setup


API:
request - GET - /referral/:email
response - referral_code

request - GET - /ref/:referral_code
response- redirected to redirect url in line 12

