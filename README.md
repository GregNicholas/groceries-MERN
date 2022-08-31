
# Grocery Getter MERN
After building frontend projects of various sizes, using Redux, and using firebase to handle the backend, and even working on a project that had PostgreSQL, I decided it was time to create my own backend and build a MERN project. Something I do often is grocery shopping, and I am never quite satisfied with the user interface of the stores' apps, so I decided to make this into a pleasant experience.
A user must log in to be able to access and edit their own saved grocery bag. Items may be checked off, and there will be sorting capabilities, filters available, and a page to explore recipes with selected items from the cart.

**Link to project demo:**https://grocerygreg.herokuapp.com/

![screenshot](url)

## How It's Made:

**Tech used:** React, Redux toolkit, MongoDB, Express, Node, Mongoose

My goal was to learn the MERN stack to turn another project into a fullstack application, so I took this project from the queue and implemented it because it would be good practice with a simpler schema. Beforehand, I experimented with creating simple API's that I could call with frontend apps. I did a lot of reading on MongoDB, both documentation, and code examples to get a good feel for it. Brad Traversy has some great videos on youtube that really helped the concepts sink in.

The project is divided in two main parts, frontend and backend. The backend, of course is where I had to really take my time and reference outside examples. It starts with a simple Express server, with grocery routes and user routes. For user authentication, I followed Brad Traversy's tutorial for JWT Authentication. I didn't focus on this part much other than to get it working. 
Routes are:
 - getGroceries 
 - createGrocery 
 - updateGrocery 
 - deleteGrocery
These rely on controllers named as above, for GET, POST, PUT, and DELETE, respectively.

Another new thing I encountered here is express-async-handler, which neatly wraps each of these async functions.

On the frontend, I have used the main technologies before. I used Vite to set up the React app. In the past I have used Create React App, but found Vite to be a fast alternative with a smaller total file size.
Using react router as I have in the past, the routes are set up in the App.jsx file. Other main folders are "pages" and "components," as usual. 


## Lessons Learned:

-How to protect routes on the backend.
- This was the second time I've used Redux toolkit, and it was good to see how it can interact with my backend.




