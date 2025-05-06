import os
import json
import requests
from flask import Flask, jsonify, request
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

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Recommendation Service Running!"})

def get_youtube_thumbnail_url(video_id):
    return f"https://i.ytimg.com/vi/{video_id}/mqdefault.jpg"

def extract_youtube_video_id(url):
    if "youtu.be" in url:
        return url.split("/")[-1].split("?")[0]
    elif "youtube.com/watch" in url:
        import urllib.parse
        query = urllib.parse.urlparse(url).query
        params = urllib.parse.parse_qs(query)
        return params.get("v", [""])[0]
    return None

def parse_llm_response(llm_response, video_title):
    """Parse the LLM response and handle any errors."""
    try:
        # The response might include markdown code blocks, so we need to clean it
        if "```json" in llm_response:
            json_str = llm_response.split("```json")[1].split("```")[0].strip()
        elif "```" in llm_response:
            json_str = llm_response.split("```")[1].strip()
        else:
            json_str = llm_response.strip()
        
        # Parse JSON
        recommendations = json.loads(json_str)
        
        # Validate format - ensure it's a list of objects
        if not isinstance(recommendations, list):
            print(f"Error: Expected list, got {type(recommendations)}")
            return get_fallback_recommendations(video_title)
        
        # Check each recommendation
        for i, rec in enumerate(recommendations):
            if not isinstance(rec, dict):
                print(f"Error: Item {i} is not a dictionary: {rec}")
                continue
            
            # Ensure required fields exist
            for field in ['title', 'description', 'url', 'source']:
                if field not in rec:
                    rec[field] = f"Unknown {field}" if field != 'url' else 'https://youtube.com'
        
        return recommendations
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print(f"Raw response: {llm_response}")
        return get_fallback_recommendations(video_title)
    except Exception as e:
        print(f"Error parsing LLM response: {e}")
        return get_fallback_recommendations(video_title)

def get_fallback_recommendations(video_title):
    """Return fallback recommendations if there's an issue."""
    return [
        {
            "title": f"Exploring topics related to {video_title}",
            "description": "An in-depth look at related concepts and techniques.",
            "url": "https://youtube.com/watch?v=dQw4w9WgXcQ",
            "source": "YouTube"
        },
        {
            "title": f"Advanced techniques inspired by {video_title}",
            "description": "Take your skills to the next level with these advanced methods.",
            "url": "https://youtube.com/watch?v=9bZkp7q19f0",
            "source": "YouTube"
        },
        {
            "title": f"Trending content similar to {video_title}",
            "description": "Discover what's popular in this category right now.",
            "url": "https://youtube.com/watch?v=CZ3wIuvmHeM",
            "source": "YouTube"
        }
    ]

def get_generic_recommendations():
    """Return generic recommendations when no title is provided."""
    return [
        {
            "title": "Learn Flask for Web Development",
            "description": "A comprehensive tutorial on building web applications with Flask.",
            "url": "https://youtube.com/watch?v=Z1RJmh_OqeA",
            "thumbnailUrl": get_youtube_thumbnail_url("Z1RJmh_OqeA"),
            "source": "YouTube"
        },
        {
            "title": "Microservices Architecture Explained",
            "description": "Understanding the basics of microservices architecture.",
            "url": "https://youtube.com/watch?v=CZ3wIuvmHeM",
            "thumbnailUrl": get_youtube_thumbnail_url("CZ3wIuvmHeM"),
            "source": "YouTube"
        },
        {
            "title": "Vue.js Tutorial for Beginners",
            "description": "Learn Vue.js from scratch with this step-by-step tutorial.",
            "url": "https://youtube.com/watch?v=FXpIoQ_rT_c",
            "thumbnailUrl": get_youtube_thumbnail_url("FXpIoQ_rT_c"),
            "source": "YouTube"
        }
    ]

@app.route("/recommend", methods=["GET"])
def recommend():
    # Get the video title from the query parameters
    video_title = request.args.get("title", "")
    
    # Display request info for debugging
    print(f"Request headers: {request.headers}")
    print(f"Request method: {request.method}")
    print(f"Request query params: {request.args}")
    print(f"Request path: {request.path}")
    
    print(f"Received recommendation request for title: '{video_title}'")
    
    # If no title or empty title, return generic recommendations
    if not video_title or video_title.strip() == "":
        print("No title provided, returning generic recommendations")
        return jsonify(get_generic_recommendations())
    
    # Use Groq LLM to generate personalized recommendations for the provided title
    try:
        print(f"Generating recommendations for: {video_title}")
        
        # Craft a prompt for the LLM
        system_prompt = """
        You are a video recommendation system. Based on the given video title, 
        suggest 5 similar YouTube videos that viewers might be interested in. 
        
        For each recommendation, provide the following:
        1. An engaging title 
        2. A brief description
        3. A plausible YouTube URL
        4. A source (e.g., "YouTube", "Vimeo")
        
        Make your recommendations diverse, educational, and engaging.
        
        Format your response as a JSON array of objects with the following structure:
        [
            {
                "title": "Video Title",
                "description": "Brief description of the video",
                "url": "https://youtube.com/watch?v=XYZ123",
                "source": "YouTube"
            },
            ...
        ]
        
        The JSON array should contain exactly 5 items.
        Ensure the output is valid JSON.
        Do not include explanations, markdowns, or any other text outside the JSON structure.
        """
        
        user_prompt = f"Suggest videos similar to: '{video_title}'"
        
        # Call Groq API
        completion = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=1024,
            top_p=0.9
        )
        
        # Extract response
        llm_response = completion.choices[0].message.content
        print(f"LLM response received, length: {len(llm_response)}")
        
        # Parse the JSON response from the LLM with improved error handling
        recommendations = parse_llm_response(llm_response, video_title)
        
        # Process the recommendations to add thumbnail URLs
        for rec in recommendations:
            if "url" in rec and "youtube.com" in rec["url"]:
                video_id = extract_youtube_video_id(rec["url"])
                if video_id:
                    rec["thumbnailUrl"] = get_youtube_thumbnail_url(video_id)
                else:
                    rec["thumbnailUrl"] = "https://via.placeholder.com/320x180.png?text=Video+Thumbnail"
            else:
                rec["thumbnailUrl"] = "https://via.placeholder.com/320x180.png?text=Video+Thumbnail"
        
        print(f"Returning {len(recommendations)} recommendations for '{video_title}'")
        return jsonify(recommendations)
        
    except Exception as e:
        import traceback
        error_trace = traceback.format_exc()
        print(f"Error generating recommendations: {str(e)}")
        print(error_trace)
        
        # Fallback to static recommendations
        fallback_recommendations = get_fallback_recommendations(video_title)
        
        # Add thumbnails
        for rec in fallback_recommendations:
            if "url" in rec and "youtube.com" in rec["url"]:
                video_id = extract_youtube_video_id(rec["url"])
                if video_id:
                    rec["thumbnailUrl"] = get_youtube_thumbnail_url(video_id)
                else:
                    rec["thumbnailUrl"] = "https://via.placeholder.com/320x180.png?text=Video+Thumbnail"
            else:
                rec["thumbnailUrl"] = "https://via.placeholder.com/320x180.png?text=Video+Thumbnail"
        
        return jsonify(fallback_recommendations)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5004))
    app.run(host="0.0.0.0", port=port, debug=True)

