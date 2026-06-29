FROM postgres:latest

# Set essential environment variables
# Note: In a production environment, it's safer to pass these at runtime rather than hardcoding them
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=my_db

# Optional: Run initialization scripts
# Any .sql or .sh scripts copied into this directory will be executed automatically when the container starts for the first time
# COPY init.sql /docker-entrypoint-initdb.d/

# Expose the default PostgreSQL port
EXPOSE 5432