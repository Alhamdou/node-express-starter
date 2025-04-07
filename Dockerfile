FROM node:18-bullseye-slim as base-stage

# Create app directory
WORKDIR /app 

# Install app dependencies
COPY package*.json ./ 

RUN npm install 
COPY . .

# develop stage 
FROM base-stage as development-stage
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# production stage 
FROM base-stage as production-stage
ENV NODE_ENV=production
CMD ["npm", "run", "prod"]
