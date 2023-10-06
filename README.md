# Booking-Web-app

this is full stack web application using MERN stack
it's similar to idea of booking web app
this is my 1st full stack MERN web app
I build it using MVC design pattern

<h1><bold>Features</bold></h1>

<h2>Backend Side</h2>
<p>I used express using middlewares, moongose for connecting to MongoDB server and created my routes</p>
<h2>Models</h2>
<p>We have 5 models for User, Hotel, Reservation, Room and Hotel's Rate</p>
<p>I used schema function in moongose to create each in mongoDB server</p>
<h2>Contollers</h2>
<h5>User Controller</h5>
<p>We have here 5 apis (changePwd, updateUser, deleteUser, getUser, getAllUsers)</p>
<p>Let's talk about each</p>
<p>first changePwd api this api takes <strong>id, email, old and new passwords</strong> from request sent and check for user if it exists first then it trys to match the old password with the one stored in database<br/> after passing these 2 steps we update the user with the data sent and encrypting new password before storing it<br/>after doing that successfully we use nodemailer to sent to user's email message informing him that the password has changed then senting new updated user in json format in response</p>
<p><italic>to be clear that if any step isn't successfully executed we use next helper function to sent error this error is handled by errorhandler function in index.js</italic></p>
