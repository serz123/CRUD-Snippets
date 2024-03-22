# CRUD Snippets

CRUD Snippets is a web application that manages code snippets. The web application uses the Node.js platform, Express as the application framework, and Mongoose as the object data modeling (ODM) library for MongoDB.

For the application to differentiate between an anonymous and authenticated user, there is support for some basic authentication and authorization. I used session storage on the server side, using the [express-session](https://www.npmjs.com/package/express-session) package to implement authentication and authorization. 

The web application has full CRUD functionality regarding snippets, whereby users must create, read, update, and delete snippets. Anonymous users are only able to view snippets. In addition to viewing snippets, authenticated users must create, edit, and delete them. No one but the owner or creator of a snippet must be able to edit and delete the said snippet.
