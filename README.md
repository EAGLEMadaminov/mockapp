Task: Create a simple blog app using React

Requirements:

The app should have two pages: Home and Blog Post.
On the Home page, display a list of blog post titles and their thumbnails.
When a user clicks on a blog post title or thumbnail, they should be taken to the Blog Post page where they can read the full blog post.
The Blog Post page should display the title, author, date, and content of the blog post.
Use React Router for navigation between pages.
Use a mock API to fetch blog post data (you can use any library like axios, fetch, or any other).
Use CSS to style the app and make it responsive.
Add a search bar to the Home page that allows users to search for blog posts by keyword.
Add pagination to the Home page to limit the number of blog posts displayed on a single page.


reate A New Project in REPLIT
login/register
in the dashboard click "create"
find react template
click run
change title in index.html
Get Assets
copy styles from /src/App.css
copy README.md
Global Styles Info
Setup Structure
create /src/components
Favorites.jsx, Meals.jsx, Modal.jsx, Search.jsx
create component (arrow function)
setup basic return (component name)
or my personal favorite "shake and bake"
export default
const Search = () => {
return <h1>Dude, where is my car<h1>
}
export default Search
import all of them in App.js
setup following structure
import './App.css'

import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'

export default function App() {

return (
<main>
<Search />
<Favorites/>
<Meals />
<Modal />
</main>
)
}
comment out Search, Favorites, Modal
export default function App() {

return (
<main>
{/_ <Search /> _/}  
 {/_ <Favorites/>_/}  
 <Meals />
{/_ <Modal /> _/}  
 </main>
)
}
App Level State
in App.js
Context API
3rd Party State Management Library
Redux, Redux-Toolkit,.......
Context API
Provider
Context API

create context.js in the root
context.jsx

import React, {useContext} from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

return (
<AppContext.Provider
value="hello">
{children}
</AppContext.Provider>
)
}

export { AppContext, AppProvider }
index.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './context'
ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<AppProvider>
<App />
</AppProvider>
</React.StrictMode>
)
Consume Data
/components/Meals.jsx

import {useContext} from 'react'
import {AppContext} from '../context'
const Meals = () => {
const context = useContext(AppContext);
console.log(context)
return <h1>Meals Component</h1>
}

export default Meals
Custom Hook
context.jsx

export const useGlobalContext = () => {
return useContext(AppContext)
}
import {useGlobalContext} from '../context'
const Meals = () => {
const context = useGlobalContext()
console.log(context)
return <h1>Meals Component</h1>
}

export default Meals
Data Fetching
where and how
context.jsx

import React, { useContext,useEffect } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {

useEffect(()=>{
console.log('fetch data here')  
 },[])


fetch data (fetch api or axios), from any url in useEffect cb
log result
Fetch API
Fetch API
random user
context.jsx

const AppProvider = ({ children }) => {
useEffect(()=>{
const fetchData = async() =>{
try {
const response = await fetch('https://randomuser.me/api/')
const data = await response.json();
console.log(data)
} catch (error) {
console.log(error)
}
}
fetchData()
},[])
Meals DB
utilize search engine "meals db", follow the link
Meals DB
get familiar with docs
get two url's
Search meal by name
Lookup a single random meal
(hint the "https://" is missing)
setup two variables in context.jsx
(allMealsUrl, randomMealUrl) and assign the corresponding values
Get Meals By Name (with axios)
Axios

install axios
import in context.jsx
refactor fetchData
change name
switch to axios
add url parameter
switch to allMealsUrl
log response
context.jsx

import React, { useState, useContext, useEffect } from 'react'

const AppContext = React.createContext()

import axios from 'axios'
const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({ children }) => {

const fetchMeals = async (url) => {

    try {
      const response = await axios(url)
     console.log(response)

    }
    catch (e) {
      console.log(e.response)
    }

}

useEffect(() => {
fetchMeals(allMealsUrl)
}, [])
State Variable (meals) and render
import useState hook
setup state variable (meals)
set it equal to the meals from api (setMeals)
pass it down to entire app (value prop)
destructure meals in the Meals component
iterate over meals
log each meal
render something (anything) on the screen
import React, { useState, useContext, useEffect } from 'react'

const AppProvider = ({ children }) => {
const [meals, setMeals] = useState([])

const fetchMeals = async (url) => {

    try {
      const { data } = await axios.get(url)
      setMeals(data.meals)
    }
    catch (e) {

      console.log(e.response)
    }

}

useEffect(() => {

      fetchMeals(allMealsUrl)

}, [])

/components/Meals.jsx

import { useGlobalContext } from '../context'

const Meals = () => {
const { meals } = useGlobalContext();


export default Meals
Meals Component - Display Card
/components/Meals.jsx

import { useGlobalContext } from '../context'

const Meals = () => {
const { meals } = useGlobalContext();

export default Meals
Meals CSS
React Icons
React Icons

install
import
set icon in like button
Infinite Loop
Feel free to just watch
initial render (we invoke useEffect)
inside useEffect cb, we fetch data and change value for meals
it triggers re-render
we repeat steps 2 and 3
Loading
setup state variable "loading", with default value false
set loading to true as a first thing in fetchMeals
set loading to false as a last thing in fetchMeals
add loading to value prop (pass it down)
in Meals.jsx set condition for loading
it needs to be before current return
return
Loading...
if loading is true
context.jsx

const AppProvider = ({ children }) => {
const [meals, setMeals] = useState([])
const [loading, setLoading] = useState(false)

const fetchMeals = async (url) => {
setLoading(true)
try {
const { data } = await axios.get(url)
setMeals(data.meals)
}
catch (e) {

      console.log(e.response)
    }
    setLoading(false)

}
/components/Meals.jsx

import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
const { loading, meals } = useGlobalContext();


No items
in fetchMeals check if data.meals is truthy
returns true
basically has some value
only if data.meals has items set it as meals state value
otherwise set meals variable as empty array
in Meals.jsx check if meals length is less than 1
if that's the case return
No items
place it between loading and current return (cards) context.jsx
const AppProvider = ({ children }) => {
const [meals, setMeals] = useState([])
const [loading, setLoading] = useState(false)


components/Meals.jsx

import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
const { loading, meals } = useGlobalContext();


Search Component - Structure
in Search.jsx
import useState and useGlobalContext
setup return
header.search-container
form
input.form-input type="text"
button.btn type="submit"
button.btn.btn-hipster type="button"
in App.jsx display Search Component
/components/Search.jsx

import { useState } from 'react'
import {useGlobalContext} from '../context'



export default Search
Search Component - CSS
HandleChange and Handle Submit
create "text" state variable
create two functions handleChange and handleSubmit
in the handleChange, grab e.target.value and set as text value
add onChange to input and set it equal to handleChange
in the handleSubmit set e.preventDefault()
add onSubmit to form element and set it equal to handleSubmit
Search.jsx

import { useState } from 'react'
import {useGlobalContext} from '../context'

const Search = () => {

const [text, setText] = useState('')

const handleChange = (e) => {
setText(e.target.value)
}
const handleSubmit = (e) => {
e.preventDefault()

}


export default Search
Search Term
in context.jsx create new state variable "searchTerm" with default value ''
combine allMealsUrl with searchTerm and pass in the fetchMeals
add searchTerm to useEffect's dependency array
add setSearchTerm to value prop (pass it down)
grab setSearchTerm in Search.jsx
in the handleSubmit check setup a condition
if the "text" has a value set it equal to "searchTerm"
context.jsx

const AppProvider = ({ children }) => {
const [meals, setMeals] = useState([])
const [loading, setLoading] = useState(false)
const [searchTerm, setSearchTerm] = useState('')

const fetchMeals = async (url) => {
setLoading(true)
try {
const { data } = await axios.get(url)
if (data.meals) {
setMeals(data.meals)
}
else {
setMeals([])
}
}
catch (e) {

      console.log(e.response)
    }
    setLoading(false)

}

useEffect(() => {
fetchMeals(`${allMealsUrl}${searchTerm}`)
}, [searchTerm])


/components/Search.jsx

import { useState } from 'react'
import {useGlobalContext} from '../context'

const Search = () => {
const { setSearchTerm } = useGlobalContext()
const [text, setText] = useState('')

const handleChange = (e) => {
setText(e.target.value)
}
const handleSubmit = (e) => {
e.preventDefault()
if (text) {
setSearchTerm(text)

    }

}



export default Search
Fetch Random Meal
context.jsx

const AppProvider = ({ children }) => {

const fetchRandomMeal = () => {
fetchMeals(randomMealUrl)
}


/components/Search.jsx

import { useState } from 'react'
import {useGlobalContext} from '../context'

const Search = () => {
const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
const [text, setText] = useState('')

const handleChange = (e) => {
setText(e.target.value)
}
const handleSubmit = (e) => {
e.preventDefault()
if (text) {
setSearchTerm(text)

    }

}

export default Search
Fix Bugs
/components/Search.jsx

import { useState } from 'react'
import { useGlobalContext } from '../context'

const Search = () => {
const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
const [text, setText] = useState('')

const handleChange = (e) => {
setText(e.target.value)
}
const handleSubmit = (e) => {
e.preventDefault()
if (text) {
setSearchTerm(text)
}
}

const handleRandomMeal = () => {
setSearchTerm('')
setText('')
fetchRandomMeal()
}

export default Search
context.jsx

const AppProvider = ({ children }) => {

useEffect(() => {
fetchMeals(allMealsUrl)
}, [])

useEffect(() => {
if (!searchTerm) return
fetchMeals(`${allMealsUrl}${searchTerm}`)
}, [searchTerm])

Modal - Setup
/components/Modal.jsx

import { useGlobalContext } from '../context'


export default Modal
context.jsx

const AppProvider = ({ children }) => {

const [showModal, setShowModal] = useState(false)


App.jsx

import { useGlobalContext } from './context'
import './App.css'

import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'
export default function App() {
const { showModal } = useGlobalContext()

return (
<main>

      <Search />
      {/*<Favorites/>*/}

      <Meals />
      {showModal && <Modal />}
    </main>

)
}
Modal CSS - Setup
App.css

.modal-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.85);
display: grid;
place-items: center;
transition: var(--transition);
z-index:100;
}
.modal-container{
width:80vw;
max-width:800px;
height:80vh;
overflow:scroll;
background:var(--white);
border-radius:var(--borderRadius);
}
Display Meal in the Modal
context.jsx

const AppProvider = ({ children }) => {

const [selectedMeal, setSelectedMeal] = useState(null)

const selectMeal = (idMeal, favoriteMeal) => {
let meal;

      meal = meals.find((meal) => meal.idMeal === idMeal);

    setSelectedMeal(meal);
    setShowModal(true)

}


/components/Meals.jsx

import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
const { loading, meals, selectMeal } = useGlobalContext();


}

export default Meals
Display Selcted Meal and Close Modal
context.jsx

const AppProvider = ({ children }) => {

const closeModal = () => {
setShowModal(false)
}


/components/Modal.jsx

import { useGlobalContext } from '../context'

const Modal = () => {
const { selectedMeal, closeModal } = useGlobalContext()

const { strMealThumb: image, strMeal: title, strInstructions: text, strSource: source } = selectedMeal

export default Modal
Modal CSS - Complete
App.css

.modal-img{
height:15rem;
border-top-left-radius:var(--borderRadius);
border-top-right-radius:var(--borderRadius);

}

.modal-content{
padding:1rem 1.5rem;
}
.modal-content p{
color:var(--grey-600);
}
.modal-content a{
display:block;
color:var(--primary-500);
margin-bottom:1rem;
text-decoration:underline;
transition:var(--transition);
}
.modal-content a:hover{

color:var(--black);
}
.close-btn{
background:var(--red-dark);
color:var(--white);
}
Favorites - Setup
context.jsx

const AppProvider = ({ children }) => {

const [favorites, setFavorites] = useState([]);

const addToFavorites = (idMeal) => {
const meal = meals.find((meal) => meal.idMeal === idMeal);
const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
if (alreadyFavorite) return
const updatedFavorites = [...favorites, meal]
setFavorites(updatedFavorites)
}
const removeFromFavorites = (idMeal) => {
const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
setFavorites(updatedFavorites)
}
}
/components/Meals.jsx

import { useGlobalContext } from '../context'
import { BsHandThumbsUp } from 'react-icons/bs'
const Meals = () => {
const { loading, meals, selectMeal, addToFavorites } = useGlobalContext();

}

export default Meals

Render Favorites
App.jsx

import { useGlobalContext } from './context'
import './App.css'

import Search from './components/Search'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Favorites from './components/Favorites'
export default function App() {
const { showModal, favorites } = useGlobalContext()

return (
<main>

      <Search />
      {favorites.length > 0 && <Favorites />}

      <Meals />
      {showModal && <Modal />}
    </main>

)
}
/components/Favorites

import { useGlobalContext } from '../context'

const Favorites = () => {
const { favorites, selectMeal, removeFromFavorites } = useGlobalContext()


export default Favorites
Favorites CSS
App.css

/_ Favorites _/

.favorites{
background:var(--black);
color:var(--white);
padding:1rem 0;
}

.favorites-content{
width: var(--view-width);
max-width: var(--max-width);
margin:0 auto;
}
.favorites-container{
display:flex;
gap:0.5rem;
flex-wrap:wrap;
}
.favorite-item{
text-align:center;
}
.favorites-img{
width:60px;
border-radius:50%;
border:5px solid var(--white);
cursor:pointer;
}
.remove-btn{
margin-top:0.25rem;
background:transparent;
color:var(--white);
border:transparent;
cursor:pointer;
transition:var(--transition);
font-size:0.5rem;
}
.remove-btn:hover{
color:var(--red-dark);
}
SelectMeal Refactor
context.jsx

const selectMeal = (idMeal, favoriteMeal) => {
let meal;
if (favoriteMeal) {
meal = favorites.find((meal) => meal.idMeal === idMeal);
} else {
meal = meals.find((meal) => meal.idMeal === idMeal);
}
setSelectedMeal(meal);
setShowModal(true)
}
/components/Favorites.jsx

import { useGlobalContext } from '../context'

const AppProvider = ({ children }) => {

const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());

const addToFavorites = (idMeal) => {
const meal = meals.find((meal) => meal.idMeal === idMeal);
const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);
if (alreadyFavorite) return
const updatedFavorites = [...favorites, meal]
setFavorites(updatedFavorites)
localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
}
const removeFromFavorites = (idMeal) => {
const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
setFavorites(updatedFavorites)
localStorage.setItem("favorites", JSON.stringify(updatedFavorites))
}

 