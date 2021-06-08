# Javascript Middleware and Backend with JSON
This repository stores my codes for creating a Javascript API middleware that is able 
to GET, DELETE, POST from a JSON file that acts as the database.

You can activate the server by using `npm start` in terminal (must be diferent terminal window that you
execute the frontend codes). So long as the ports specified in both frontend and backend are the same, you are 
good to go.

## Things to note for middleware code:
1.  If you are running the backend server in the same computer as the frontend, you
will need to `require("cors")` and apply it to `express` object before start to use the `express` object.

2.  You MUST not use `require` to read in the JSON database because Node.js will cache the data when it
first pull in the data, and continue to use the same old cache. Therefore only use `fs.readFile` or 
`fs.readFileSync` to read in the JSON file so that the updated JSON will be pulled in and used.

3.  Be careful of data type. Most of the time, data comes in as string.
