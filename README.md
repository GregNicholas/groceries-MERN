# Grocery Guru

**Link to Deployed App:** [Grocery Guru](https://grocery-guru.cyclic.app/)

## Table of Contents

  - [Requirements](#requirements)
  - [How It's Made](#how-its-made)
  - [Built With](#built-with)
  - [Other Lessons Learned](#other-lessons-learned)
  - [Things to Add](#things-to-add)
  - [Demo Videos](#demo)
  - [Author](#author)

## Requirements

This project was built for several reasons. One of the activities I frequently engage in is grocery shopping, and I am never quite satisfied with the user interface of the stores' apps, so I decided to make this into a pleasant experience. This app is not just a simple list; it helps the user decide what to make with their ingredients on hand by searching a recipes database for recipes using selected ingredients from the list, or custom combinations. Favorite recipes can be saved and viewed, and recipe ingredients can be instantly added to the user's list.

- Users must log in to access and edit their personalized saved grocery bag.
- Items may be checked off, added/removed from the cart, and sorted based on the time added or alphabetically.
- There is a page to explore recipes using items on the user's list, with the ability to select one or a combination of ingredients when searching.
- The app must call an external API, [Edamam Recipe API](https://developer.edamam.com/edamam-recipe-api), to fetch desired recipes.
- A list of recipes will be displayed, allowing the user to click a title to see recipe ingredients and a picture.
- Users can choose to save the recipe to their favorites and/or add the ingredients to their list.
- All actions will be saved in the database, unique to each user.

## How It's Made

My goal was to use React, NodeJS, MongoDB and Express, and gain more experience with Redux Toolkit for state management, to make this a useful full-stack application. Beforehand, I experimented with creating simple APIs that I could call with my frontend apps. I did a lot of reading on MongoDB, both documentation and code examples, to get a good feel for it. Brad Traversy has some great videos on YouTube that really helped the concepts sink in.

The project is divided into two main directories: frontend and backend. The backend, of course, is where I had to take my time and reference more outside examples. It starts with a simple Express server, with grocery routes and user routes, and once the app was working, recipe routes were added. For user authentication, I followed Brad Traversy's tutorial for JWT Authentication. Authentication in this app allows each registered user to have their own data.

Routes include:
 - getGroceries
 - createGrocery
 - updateGrocery
 - getRecipe
 - createRecipe
 - deleteRecipe
 - registerUser
 - loginUser

These rely on controllers named as above, for GET, POST, PUT, and DELETE.

Another new thing I encountered here is `express-async-handler`, which neatly wraps each of these async functions.

On the frontend, I used Vite to set up the React app. In the past, I have used Create React App, but I found Vite to be a fast alternative with a smaller total file size. Using React Router, the routes are set up in the `App.jsx` file. Other main folders are "pages" and "components."

The design is meant to be visually pleasing and easy to use. It was important to make it mobile responsive, as users would often use it while at the grocery store. Small animations were sprinkled in to guide the eye during interactions.

## Built With

- React
- Redux Toolkit
- MongoDB
- Express
- Node
- Mongoose
- jsonwebtoken
- framer-motion
- react-toastify

## Other Lessons Learned

- How to secure routes on the backend
- Integrating Redux Toolkit with the Node.js Express backend

## Things to Add

- Create an input for when the user is on the recipe page, so they can search from that page without going back, then have the ingredients added to the list if a desirable recipe is found as usual.
- Integrate accounts to facilitate sharing of recipes and writing notes on favorited recipes.
- If I were to build this again from scratch, I would might use styled components or css modules for more organized styling, or maybe Tailwind.


## Demo
[Login_see_list.webm](https://user-images.githubusercontent.com/59461870/194460341-e81bd1e5-2747-4cd2-b793-ef0699ea53c1.webm)

[find_recipes_add_to_favorites.webm](https://user-images.githubusercontent.com/59461870/194460485-fed42c1f-347d-436f-81ad-b8fc757692d0.webm)

[mobile_add_delete_sort.webm](https://user-images.githubusercontent.com/59461870/194460526-27cd5bec-743a-46c2-b64c-bfbbcbfc821a.webm)

## Author

- Website - [Greg Schoenberg](https://gregschoenberg.com)
