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
<h3>User Controller</h3>
<p>We have here 5 apis (changePwd, updateUser, deleteUser, getUser, getAllUsers)</p>
<strong>***To be clear that if any step isn't successfully executed we use next helper function to sent error this error is handled by errorhandler function in index.js ***</strong>
<p>Let's talk about each</p>
<p><strong>changePwd</strong> api this api takes <strong>id, email, old and new passwords</strong> from request sent and check for user if it exists first then it trys to match the old password with the one stored in database<br/> after passing these 2 steps we update the user with the data sent and encrypting new password before storing it<br/>after doing that successfully we use nodemailer to sent to user's email message informing him that the password has changed then senting new updated user in json format in response</p>
<p><strong>updateUser</strong> api takes id and updated user checks if username or email or phone of anyother user except current one already exists in database if none of them exists we update user with the new object sent and using nodemailer we sent to user that profile has been updated successfully</p>
<p><strong>deleteUser</strong> api takes user's id from params and delete user</p>
<p><strong>getUser</strong>api takes user's id from params and search for user using user's id and return it if exists</p>
<p><strong>getAllUsers</strong> api return all users from datebase</p>

<p><strong>getUserReservations</strong> api takse user's id from params and search for all user's reservations using user's id and return all if exist otherwise reservation not found</p>
