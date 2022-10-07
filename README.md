
# Grocery Getter MERN

**Link to project demo:** https://grocerygreg.herokuapp.com/

## Table of contents

  - [Requirements](#requirements)
  - [How It's Made](#how-its-made)
  - [Built with](#built-with)
  - [Other lessons Learned](#other-lessons-learned)
  - [Things to add](#things-to-add)
  - [Demo](#demo)
- [Author](#author)

## Requirements: 

After building frontend projects of various sizes, using Redux, and using firebase to handle the backend, and even working on a project that had PostgreSQL, I decided it was time to create my own backend and build a MERN project. Something I do often is grocery shopping, and I am never quite satisfied with the user interface of the stores' apps, so I decided to make this into a pleasant experience.

- A user must log in to be able to access and edit their own saved grocery bag. 
- Items may be checked off, added/removed from the cart, and sortable based on time added or alphabetically.
- There is a page to explore recipes using items on the user's list, with the ability to select one or a combination of ingredients when searching.
- Must call an external api, https://developer.edamam.com/edamam-recipe-api to fetch desired recipes.
- A recipe list will display, allowing the user to click a title to see recipe ingredients and a picture.
- The user can choose to save the recipe to their favorites and/or add the ingredients to their list.
- All actions will be saved to the database, unique to each user.

## How It's Made:

My goal was to learn the MERN stack to turn another project into a fullstack application, so I jumped into this project and implemented it because it would be good practice with a simpler schema while building something I'd use. Beforehand, I experimented with creating simple API's that I could call with frontend apps. I did a lot of reading on MongoDB, both documentation, and code examples to get a good feel for it. Brad Traversy has some great videos on youtube that really helped the concepts sink in.

The project is divided in two main parts, frontend and backend. The backend, of course is where I had to really take my time and reference outside examples. It starts with a simple Express server, with grocery routes and user routes. For user authentication, I followed Brad Traversy's tutorial for JWT Authentication. I didn't focus on the authentication much other than to get it working. 
Routes are:
 - getGroceries 
 - createGrocery 
 - updateGrocery 
 - getRecipe
 - createRecipe
 - deleteRecipe
 - registerUser
 - loginUser
 
These rely on controllers named as above, for GET, POST, PUT, and DELETE.

Another new thing I encountered here is express-async-handler, which neatly wraps each of these async functions.

On the frontend, I used Vite to set up the React app. In the past I have used Create React App, but found Vite to be a fast alternative with a smaller total file size.
Using react router as I have in the past, the routes are set up in the App.jsx file. Other main folders are "pages" and "components." 

## Built with:

React, Redux toolkit, MongoDB, Express, Node, Mongoose, jsonwebtoken, framer-motion, react-toastify

## Other lessons Learned:

- How to protect routes on the backend
- Integrating Redux toolkit with my own backend

## Things to Add: 

- Integrate accounts to facilitate sharing of recipes while keeping other things such as the grocery list private.

## Demo
[Login_see_list.webm](https://user-images.githubusercontent.com/59461870/194460341-e81bd1e5-2747-4cd2-b793-ef0699ea53c1.webm)

[find_recipes_add_to_favorites.webm](https://user-images.githubusercontent.com/59461870/194460485-fed42c1f-347d-436f-81ad-b8fc757692d0.webm)

[mobile_add_delete_sort.webm](https://user-images.githubusercontent.com/59461870/194460526-27cd5bec-743a-46c2-b64c-bfbbcbfc821a.webm)

## Author

- Website - [Greg Schoenberg](https://gregschoenberg.com)
