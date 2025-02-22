# Use Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy dependencies and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project files
COPY . .

# Expose port
EXPOSE 5004

# Start Flask application
CMD ["python", "api.py"]
