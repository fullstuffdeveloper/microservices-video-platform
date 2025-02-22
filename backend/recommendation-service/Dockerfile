# Use Python base image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all source files
COPY . .

# Expose the service port
EXPOSE 5004

# Run the Flask API
CMD ["python", "api.py"]
