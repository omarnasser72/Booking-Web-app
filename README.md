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
<h3>User model </h3>
<p>describes user's information represented in username, email, profile's photo, password, birthdate, phone, city, country, isAdmin to detect if it's Admin or not </p>
<h3>Hotel model </h3>
<p>describes hotel's information represented in name, city, 
hotel's photos, type, title, description, city, country, distance(distance from city's location), address, rating, cheapestPrice(the cheapest room's price in hotel), featured(is it featured hotel or not), rooms(array of rooms including type and numbers with it's reservation dates) </p>
<h3>Room model </h3>
<p>describes hotel rate's information represented in title, description, price, maxPeople(maximum no of people can stay at the room), images, roomNumbers(contains array of numbers for this type of room and unavailableDates(array of dates that aren't available for reservations) </p>
<h3>Hotel Rate model </h3>
<p>describes hotel rate's information represented in userId(whose reservation it is ) , hotelId(in which hotel), roomTypeId(which type of room ), roomNumberId(which number in the roomvtype ), reservationDuration(contains the start and end dates of duration of the reservation ), cost(cost of reservation based of room type's price and no of days between start and end dates) </p>
<p>I used schema function in moongose to create each in mongoDB server</p>
<h3>Reservation model </h3>
<p>describes reservation's information represented in rating(it's not the hotel's rate but it's user's rate to the hotel) , hotelId(to identify whose hotel rate it is) , 
userId(to identify which user rate this value with this rate)  </p>
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
