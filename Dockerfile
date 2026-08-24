# FROM node:22

# WORKDIR /app

# COPY package*.json  .

# RUN npm install 

# COPY . .

# EXPOSE 4000

# CMD ["npm", "run", "dev"]



# Production dependencies
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json .

RUN npm ci --omit=dev


# Production image
FROM node:22-alpine

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json .
COPY src ./src

USER node

EXPOSE 4000

CMD ["node", "src/app.js"]