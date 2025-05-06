import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get API key from environment variable
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    print("Warning: GROQ_API_KEY not found in environment variables.")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "ai-chatbot-service"})

@app.route('/chat', methods=['POST'])
def chat():
    try:
        print("Received chat request")
        
        # Get the raw request data
        data = request.json
        
        if not data:
            print("No JSON data received")
            return jsonify({"error": "Invalid request. No JSON data received."}), 400
        
        print(f"Received data: {data}")
        
        if 'messages' not in data:
            print("'messages' field missing in request")
            return jsonify({"error": "Invalid request. 'messages' field is required."}), 400
        
        # Extract user type (admin or user)
        user_type = data.get('userType', 'user')
        print(f"User type: {user_type}")
        
        # Get messages from request
        messages = data['messages']
        print(f"Received messages: {messages}")
        
        # Add a system prompt based on user type
        if user_type == 'admin':
            system_message = {
                "role": "system",
                "content": "You are an AI assistant helping an admin of a video platform. You can provide technical support, answer questions about content management, and assist with administrative tasks."
            }
        else:
            system_message = {
                "role": "system", 
                "content": "You are an AI assistant helping a user of a video platform. You can answer questions about using the platform, finding content, and general support."
            }
        
        # Add system message at the beginning if not already present
        if not messages or messages[0].get('role') != 'system':
            messages.insert(0, system_message)
        
        # Ensure all messages have correct format
        formatted_messages = []
        for msg in messages:
            if isinstance(msg, dict) and 'role' in msg and 'content' in msg:
                formatted_messages.append(msg)
            else:
                print(f"Skipping invalid message format: {msg}")
        
        if not formatted_messages:
            return jsonify({"error": "No valid messages provided"}), 400
        
        print(f"Sending to Groq API: {formatted_messages}")
        
        # Call Groq API
        completion = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=formatted_messages,
            temperature=0.7,
            max_tokens=1024,
            top_p=0.9
        )
        
        # Extract response
        response = completion.choices[0].message.content
        print(f"Received response from Groq: {response[:100]}...")
        
        return jsonify({
            "response": response
        })
    
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"Error in chat endpoint: {str(e)}")
        print(error_trace)
        return jsonify({"response": "I'm sorry, I encountered a technical issue. Please try again later."}), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5005))
    app.run(host='0.0.0.0', port=port, debug=True) 