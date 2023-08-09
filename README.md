# Webtech-React-Django


I created a website called GamersHub with the goal of serving the needs of gamers. Users have the chance to discover a wide variety of possibilities on this online platform, including gaming consoles, computer PC parts, and accessories, all of which are offered at affordable prices. React was used in the platform's construction for the front-end user interface, and Django was used for the back-end operations.

With each API call, the presentation is set up to display 10 products within the pagination feature of the homepage. The site has a live search stream as well, which at first returns a maximum of 10 items. A "load more" button provides access to additional things.

Users are allowed to browse the variety of offerings, create accounts, and log in. Users that register are given the ability to make purchases and provide insightful product reviews. Standard users are allowed to explore the selection of products, but they are not allowed to make any purchases. Users can move forward with item purchases thanks to the integration of a test PayPal ID and a predefined user ID that simplifies the purchasing procedure. The administrator is given the power to check payment statuses following the successful completion of a purchase. Users can also easily change their passwords and other personal information, and they have access to the status of their orders.

The website's administration section offers the administrator a number of crucial features. This broad jurisdiction includes the right to add, remove, and change the products that are advertised on the platform. Additionally, the administrator has the ability to update an order's delivery status, which contributes to a streamlined and effective order tracking system. The administrator has the ability to change user data and, if required, deactivate user accounts when it comes to user management.


##GamersHub Project Setup Guide
1:Backend Setup (Django):

a.Install Python: Ensure that Python is installed on your system.
Create a Virtual Environment (Recommended):

b.Navigate to the backend directory.
Create a virtual environment to isolate dependencies.
  python -m venv venv
  source venv/bin/activate  # On Windows: venv\Scripts\activate
  
c.Install Dependencies:
Install Django and other required packages using pip.
  pip install Django
  
d.Database Configuration:
Set up your database SQLite

e.Run Initial Migrations:
Apply the initial migrations to set up the database.
  python manage.py makemigrations
  python manage.py migrate

f.Create Admin Superuser:
Create an admin account for managing the Django admin interface.
  python manage.py createsuperuser
  
g.Run Backend Server:
Start the Django development server.
  python manage.py runserver



2:Frontend Setup (React):

a.Install Node.js and npm:
Ensure Node.js and npm (Node Package Manager) are installed on your system.
Navigate to Frontend Directory:

b.Open a terminal and navigate to the frontend directory.
Install Frontend Dependencies:

c.Install the required frontend packages.
  npm install

d.Start Frontend Development Server:
Start the frontend development server.
  npm start



3: Additional Configuration:

a.Proxy Configuration:
In the frontend package.json file, replace the "proxy" value with your backend server URL.
Admin and User Credentials:

b.Admin Credentials:
Username: admin@gmail.com

Password: E#6jWZC6Kxi8WYz

c.User Credentials:
Username: zeus1@gmail.com

Password: Cj3id!Ez5A!vv

d.PayPal Mockup Payment id & pass:
email: sb-rzqln26923746@personal.example.com

password: q&0kI_lt









