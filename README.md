# Socket chat

A real time chat app made with React and Node/Express using websockets.

## Installation
__Note: This project requires an instance of a database comaptible with sequelize. You can check the compatibility list from [here](https://sequelize.org/releases/)__

- Clone the repo into your local machine.
- Run `npm install` in both the front-end and back-end directories.
- Create a `.env` file in the root of the back-end folder
- Specify a `PGDATABASE`, `PGHOST`, `PGPASSWORD`, `PGPORT`, `PGUSER` and `ACCESS_TOKEN` variable in the `.env` file. Or simply replace the `DB_URL` in `db.js` to connect to your database.  
- Start the development server of the front-end using `npm start` and for the back-end using `npm run dev`
- Run the app