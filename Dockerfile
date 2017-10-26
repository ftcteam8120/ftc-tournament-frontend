# Load from the single page app nginx repo
FROM socialengine/nginx-spa
# Copy built files to the app directory
COPY dist/ /app