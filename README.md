# Setup
1. Clone the repository
git clone https://github.com/yourusername/interview-scheduling-api.git
cd interview-scheduling-api

2. install node modules
npm install

3. .env configuration
PORT=5001
MONGO_URI=mongodb://localhost:27017/interview-scheduling
JWT_SECRET=your_jwt_secret

4. Run MongoDB locally or enter cloud url

5. Run app and you will see logs - "Server running on port 5001" "Database connected successfully!"
npm run start

6. Open browser and enter swagger url -
http://localhost:5001/api-docs/


7. Build the docker app (Optional)
docker build -t my-node-app .

8. Run the docker app (Optional)
docker run -p 5001:5001 --env-file .env my-node-app


# Use Api's -

1. You need to register twice as interviewer and candidate using user register api
2. With help of token provided in response if user login api's, add in security (top right section) of swagger documentation
3. Create interveiew or candidate availability according to token added (candidate or interveiewer)
4. Then run find slots api, which provide you the common available time of both the user types with entered userId's.


Future Scope -

1. Get list of candidates, to send into req body of slot availability api
2. Get list of interveiwers, to send into req body of slot availability api
3. Email verification
4. This is week calendar, can be extend to month's calendar as well