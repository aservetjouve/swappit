#  Swappit

 
Swappit is a application that allows you to swapp pieces of decoration or furniture with an other user. Swapping is the best way to change your interior without spending anything while reducing waste and helping our amazing planet.

  

#  User Stories

  

- Welcome | As an anon

- Sign up | The user can sign up to the platform to swapp with other users

- Login | The user can login to the platform to swapp and communicate with other users.

- Logout | The user can logout from the platform so no one else can modify the informations

- Add item | The user can add an item to swapp with other users

- Swapp | The user can decide to swapp the item or not

- Profile | The user can check their informations and their items

- Update item | The user can change some informations about the item

- Delete item | The user can delete the item if it was swapped or if the user changed their mind.

- Contact Card | When two users agree on swapping together, they receive each-others contact informations

<br/>

- Error 404

> Just to tell the user that the error is not on the programmer

  

##  Backlog

  

- Localisation feature | The user would be able to specify a maximum distance

- Chat | Instead of giving personal informations

- Multiple Item to swapp | Sometimes more is better

  

#  Client | Front-end
##  React Routes

| Path | Component | Permissions | Behavior |
|---------------------------|--------------------------------|------------------------------|--------------------------------------------------------------------|
| `/` | SplashPage | public `<Route>` | Home page |
| `/signup` | SignupPage | anon only `<AnonRoute>` | Signup form, link to login, navigate to add an item after signup |
| `/login` | LoginPage | anon only `<AnonRoute>` | Login form, link to signup, navigate to homepage after login |
| `/logout` | n/a | user only `<PrivateRoute>` | Navigate to homepage after logout, expire session |
| `/home` | ItemCard | user only `<PrivateRoute>` | Display items to swapp with |
| `/profile` | Profile, Stats | user only `<PrivateRoute>` | Check profile with item informations |
| `/profile/add-item` | ItemCard | user only `<PrivateRoute>` | Add the item the user wants to swapp |
| `/profile/edit-item` | ItemCard | user only `<PrivateRoute>` | Edit the information about item |
| `/profile/delete-item` | n/a | user only `<PrivateRoute>` | Remove the item |
| `/connections` | ContactCard | user only `<PrivateRoute>` | Show the email address from the other users when matching |

## Components

- Welcome
> The first page the user will see if not logged in
- Signup 
- Login
- NavBar
- Footer
- AddItem
- ItemCard
- ContactCard

## Services

- Auth Service
	- auth.login(user)
	 - auth.signup(user)
	 - auth.logout()
	 - auth.mi()

- Swappit Services 
	-   .filter(type) // for different types of items
	-   .detail(id)
	-   .add(id)
 	-   .update(id)
	-   .delete(id)



# Server | Back-End<br>

You can find the server repository [here](https://github.com/aservetjouve/swappit__server).

## Models<br>

User model
```javascript
{
  userFirstName: {type: String, required: true},
  userLastName: {type: String, required: true},
  userEmail: {type: String, required: true, unique: true},
  userPassword: {type: String, required: true},
  userLocation: {type: String, required: true}
}
```

Item model 
```javascript
{
  itemName: {type: String, required: true},
  itemType: {type: String, required: true},
  itemAspect: {type: String, required: true},
  owner: {type: Schema.Types.ObjectId,ref:'User'}
}
```
## Back End Routes

| HTTP Method | URL | Request Body | Success status | Error Status | Description |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET | `/auth/profile` | Saved Session | 200 | 404 | Check if user is logged in and return profile page |
# Links
### Trello
You can check the way I planned this project on Trello [here!]([https://trello.com/b/uUpzi6Z0/swappit](https://trello.com/b/uUpzi6Z0/swappit)) 

### Adobe XD 

You will find my wireframes and the prototype [here!](https://github.com/404)

### Git

Here are the links to the :
- [Client repository](https://github.com/aservetjouve/swappit)

- [Server repository](https://github.com/aservetjouve/swappit__server)

- [Deployed App](https://github.com/404)

### Slides

You can check the slides for my presentation [here!](https://github.com/404)

> Thank you for checking my project ! 