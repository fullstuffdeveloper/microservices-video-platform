# Use Python image
FROM python:3.8-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Set environment variables
ENV PORT=5004
ENV FLASK_APP=api.py
ENV GROQ_API_KEY=${GROQ_API_KEY:-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}

# Expose port
EXPOSE 5004

# Start the application directly with Python for easier debugging
CMD ["python", "api.py"]
