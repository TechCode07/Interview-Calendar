#Build the docker app
docker build -t my-node-app .

#Run the docker app
docker run -p 5001:5001 --env-file .env my-node-app

