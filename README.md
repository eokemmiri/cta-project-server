Hello! Welcome to the CTA 201 server web application. To install and set up this application see instructions below!

Instructions:
Please download code file as .zip. Then unzip the file to locate associated files for server, docker, client side, and MySQL.


Setting Up SQL Database:
1. Create MySQL database and necessary tables (with provided schema files). Run schema files to set up database and tables.
2. Create an RDS instance in AWS (with an associated password)
3. Create connection between SQL database and RDS instance.
   
Setting up Docker Environment/Web Server:
1. Run Docker desktop in the background.
2. Open preferred terminal and switch into unzipped project folder.
3. Build Docker image using build command.
4. Run Docker image using run command.
5. This will start the server and provide the associated link for the web application.
6. Follow the Link to interact with client side of the application.
7. Each tab holds the associated non-trivial functions, click through each function to learn useful information about the 201 CTA bus route!


To run web server (without client side):
1. Follow steps 1-5 in previous section.
2. Then copy and paste link into preferred browser.
3. Append associated endpoint with necessary parameters to see direct server interactions (find endpoints and parameters in app.js).
