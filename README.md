# May My Review

**May My Review** is a full-stack application where users can register, log in, select any location on a map, add reviews and ratings, and view reviews left by other users by clicking on map pins. It uses **Mapbox GL** for map integration and features a smooth, interactive user experience.

## Features

- User Registration, Login, and Logout
- Interactive map with pins for locations reviewed
- Add reviews (name, review text, rating) for any location
- View reviews added by other users by clicking on pins
- Full CRUD functionality
- Deployed on Heroku

## Tech Stack

**Frontend:**

- React.js
- Material-UI
- Custom CSS

**Backend:**

- Node.js
- Express.js

**Database:**

- MongoDB (MongoDB Atlas)
- Mongoose

**Map Integration:**

- Mapbox GL
- react-map-gl

**Deployment:**

- Heroku

## Project Structure

The project is divided into two main folders:

- `api`: Contains the backend code (Node.js and Express.js)
- `client`: Contains the frontend code (React.js)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/may-my-review.git
   ```

2. Navigate to the `api` folder to install backend dependencies:

   ```bash
   cd api
   yarn install
   ```

3. Navigate to the `client` folder to install frontend dependencies:
   ```bash
   cd client
   yarn install
   ```

## Environment Variables

Create a `.env` file in the `api` folder with the following keys:
MONGO_URL = your-mongodb-url
PORT = 8800

Create a `.env` file in the `client` folder with the following keys:
REACT_APP_MAPBOX = your-mapbox-token

## Running Locally

To run the application locally:

1. Start the backend:

   ```bash
   cd api
   yarn start
   ```

2. Start the frontend:

   ```bash
   cd client
   yarn start
   ```

3. Open `http://localhost:3000` in your browser to view the app.

## Demo

Check out the live application here:  
[May My Review](https://map-my-review-20b14fa53c61.herokuapp.com/)

## Deployment on Heroku

## Make sure you in your mongob trefic is allowed from all ips

1. Move `client` directory to `api`

2. Add the following code in `api/index.js` after routes:

```
app.use(express.static(path.join(__dirname, "/client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});
```

3. Move to `api`, open `package.json` and change `scripts` to the follwong code:

```
"scripts": {
    "start": "nodemon index.js",
    "heroku-postbuild": "cd client && yarn install && yarn build"
  },
```

4. Move to `client/src` and open `config.js` and change baseURL to your Heroku project url:

```
baseURL: "your-heroku-project-url/api/"
```

5. Download and install the Heroku CLI.

6. If you haven't already, log in to your Heroku account.

```
$ heroku login
```

7. Start git

```
$ git init
$ git add .
```

8. Make sure that `.env`, `package.json` files from both `api` and `client` are added then do the following:

```
$ git commit -am "make it better"
$ git push heroku main
```
