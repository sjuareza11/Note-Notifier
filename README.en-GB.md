UOC qualification notifier

This application developed in NodeJS uses Puppeteer to log in to the web and obtain the url to consult the notes before they are published.

The consultation interval of the notes is 1 minute. (can be adjusted from the .env)
The application is prepared to notify of the qualifications via email, for this it is necessary to configure a google account to send email. Example here: https://www.youtube.com/watch?v=RpSQQIGTpTM .

The steps to follow to run the application are as follows:

Having NodeJS installed you can install it from here: https://nodejs.org/es/download/

1. Clone the repository
2. In the root of the application open a terminal run "npm i"
3. Configure the .env file by entering our uoc username and password. (The others are configuration parameters DO NOT TOUCH unless you know what you are doing). The fields are: USER and PASSWORD
4. In the root of the application open a terminal and execute "npm run start"

ADDITIONAL (Email sending):

The fields to fill in for sending the email are:
ENABLE_SEND_MAIL => Enable email sending (Value: true/false)
USER_AUTH_EMAIL => Email configured to send the email
USER_AUTH_PASSWORD => =Password obtained during gmail setup from third party apps
USER_NOTIFICATION_EMAIL => Email where the notification of the obtained grades will arrive
