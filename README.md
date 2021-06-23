# Articles API (RESTful)
This API communicates with a MongoDB database in a RESTful way to add, delete, update, and view articles stored inside the database.

The following routes are defined:

* /articles - This can be accessed by Get, Post, and Delete methods to view all, add one, and delete all articles (respectively) in the collection
* /articles/:articleTitle - This can be accessed by Get, Put, Patch, and Delete methods to view, replace, update, or delete a specific article from the collection, using the title as a reference

### Note
You cannot use this API directly because it needs an srv string to connect to a MongoDB Atlas cluster.

Replace the "process.env.MONGODB_URI" in app.js with your own MongoDB Atlas srv string to make this API functional. Use a tool like Postman to test this API.
