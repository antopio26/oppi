FROM node

WORKDIR /ws

# Copy the source code
COPY ./server ./server
COPY ./client ./client

# Install dependencies
RUN cd server && npm install
RUN cd client && npm install

# Build the frontend
RUN cd client && npm run build

WORKDIR /ws/server

# Set the entrypoint
ENTRYPOINT ["node", "main.js"]

