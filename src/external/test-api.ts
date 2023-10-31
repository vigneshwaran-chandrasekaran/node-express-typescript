import api from './api';

// Now you can use the 'api' instance to make HTTP requests
api
  .get("/endpoint")
  .then((response) => {
    console.log("Response data:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
