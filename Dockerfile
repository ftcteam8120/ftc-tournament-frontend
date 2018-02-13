# Load from the single page app nginx repo
FROM socialengine/nginx-spa:5.6
# Copy built files to the app directory
COPY dist/ /app