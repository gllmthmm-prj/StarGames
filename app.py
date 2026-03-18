from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)

GAMES = [
    {
        "id": "constellation",
        "title": "Constellation Quiz",
        "description": "Recognize star constellations against the clock. Score bonus points for speed!",
        "icon": "🔭",
        "color": "#a78bff",
        "category": "Quiz",
        "difficulty": "Medium",
    },
    {
        "id": "starcatch",
        "title": "Star Catcher",
        "description": "Catch falling stars before they vanish. How many can you grab?",
        "icon": "⭐",
        "color": "#f5c518",
        "category": "Reflex",
        "difficulty": "Easy",
    },
    {
        "id": "starmemory",
        "title": "Star Memory",
        "description": "Match each constellation name to its star pattern. The fewer moves, the better!",
        "icon": "🧠",
        "color": "#ff6eb4",
        "category": "Puzzle",
        "difficulty": "Medium",
    },
    {
        "id": "dotconnect",
        "title": "Dot Connect",
        "description": "Connect numbered stars in the correct order to trace constellations before time runs out.",
        "icon": "🌠",
        "color": "#6ee7ff",
        "category": "Puzzle",
        "difficulty": "Hard",
    },
    {
        "id": "numquiz",
        "title": "Galaxy Quiz",
        "description": "Test your space knowledge with rapid-fire trivia.",
        "icon": "🌌",
        "color": "#00c8ff",
        "category": "Trivia",
        "difficulty": "Easy",
    },
]

@app.route('/')
def index():
    return render_template('index.html', games=GAMES)

@app.route('/game/<game_id>')
def game(game_id):
    g = next((g for g in GAMES if g['id'] == game_id), None)
    if not g:
        return render_template('index.html', games=GAMES)
    return render_template(f'{game_id}.html', game=g)

@app.route('/api/quiz/question')
def quiz_question():
    questions = [
        {"q": "How many planets are in our solar system?", "a": ["8", "9", "7", "10"], "correct": 0},
        {"q": "What is the largest planet?", "a": ["Jupiter", "Saturn", "Neptune", "Uranus"], "correct": 0},
        {"q": "How long does light from the Sun take to reach Earth?", "a": ["8 minutes", "1 hour", "1 second", "1 day"], "correct": 0},
        {"q": "What galaxy do we live in?", "a": ["Milky Way", "Andromeda", "Triangulum", "Sombrero"], "correct": 0},
        {"q": "What is the closest star to Earth?", "a": ["Proxima Centauri", "Sirius", "Betelgeuse", "Vega"], "correct": 0},
        {"q": "Which planet has the most moons?", "a": ["Saturn", "Jupiter", "Uranus", "Neptune"], "correct": 0},
        {"q": "What is a light-year?", "a": ["Distance light travels in a year", "Time to orbit the Sun", "Speed of a comet", "Size of a galaxy"], "correct": 0},
        {"q": "What causes a solar eclipse?", "a": ["Moon blocks the Sun", "Earth blocks the Sun", "Sun goes dark", "A comet passes"], "correct": 0},
    ]
    q = random.choice(questions)
    shuffled = list(enumerate(q["a"]))
    random.shuffle(shuffled)
    correct_val = q["a"][q["correct"]]
    new_answers = [a for _, a in shuffled]
    new_correct = new_answers.index(correct_val)
    return jsonify({"question": q["q"], "answers": new_answers, "correct": new_correct})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
