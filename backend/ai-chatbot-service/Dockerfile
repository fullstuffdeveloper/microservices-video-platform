FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT=5005
ENV FLASK_APP=app.py

EXPOSE 5005

CMD ["gunicorn", "--bind", "0.0.0.0:5005", "app:app"] 