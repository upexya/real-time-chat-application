# Stage-1: Build React App
FROM  node:latest AS builder
# Create a directory  and go to the directory 
WORKDIR /app
# Copy the package.json file to my current directory to install the necessary dependence  
COPY package.json .
# Install the dependence
RUN npm install
# Copy other files to my current directory
COPY . .
# Build and optimize static file
RUN npm run build

# Stage-2: Serve React App with Nginx
FROM nginx:1.25.2-alpine-slim
# Copy the custom Nginx config
# This is to fix routing issue in React. Eg: if a user navigates to http://localhost:3000/auth, Nginx serves index.html, letting React Router handle the routing. 
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built React files to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Open the port to react
EXPOSE 3000

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]