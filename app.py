from flask import Flask, render_template, jsonify, request
import random
import os

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
    {
        "id": "planetorbit",
        "title": "Planet Orbit",
        "description": "Drag each planet into its correct orbital position around the Sun. How fast can you sort the solar system?",
        "icon": "🪐",
        "color": "#ff9500",
        "category": "Puzzle",
        "difficulty": "Medium",
    },
    {
        "id": "trivia",
        "title": "Planet Trivia Showdown",
        "description": "2-player hot-seat astronomy quiz. Take turns answering questions about planets, stars, and space exploration. May the best explorer win!",
        "icon": "🏆",
        "color": "#ff9f43",
        "category": "Trivia",
        "difficulty": "Mixed",
    },
    {
        "id": "asteroid",
        "title": "Asteroid Dodge",
        "description": "Pilot your ship through a deadly asteroid field. Dodge or destroy rocks as they rain down — survive as long as you can!",
        "icon": "☄️",
        "color": "#ff6b35",
        "category": "Arcade",
        "difficulty": "Hard",
    },
    {
        "id": "constdraw",
        "title": "Constellation Draw",
        "description": "Connect the stars freehand to trace the constellation. The more accurate your lines, the higher your score!",
        "icon": "✏️",
        "color": "#c4a8ff",
        "category": "Puzzle",
        "difficulty": "Medium",
    },
]

@app.route('/')
def index():
    return render_template('index.html', games=GAMES)

@app.route('/wiki')
def wiki():
    return render_template('wiki.html')

@app.route('/game/<game_id>')
def game(game_id):
    g = next((g for g in GAMES if g['id'] == game_id), None)
    if not g:
        return render_template('index.html', games=GAMES)
    return render_template(f'{game_id}.html', game=g)

QUIZ_QUESTIONS = [
    # Solar System — Planets
    {"q": "How many planets are in our solar system?", "a": ["8", "9", "7", "10"], "correct": 0},
    {"q": "What is the largest planet in our solar system?", "a": ["Jupiter", "Saturn", "Neptune", "Uranus"], "correct": 0},
    {"q": "Which planet is closest to the Sun?", "a": ["Mercury", "Venus", "Mars", "Earth"], "correct": 0},
    {"q": "Which planet is known as the Red Planet?", "a": ["Mars", "Venus", "Jupiter", "Saturn"], "correct": 0},
    {"q": "Which planet has the most prominent ring system?", "a": ["Saturn", "Jupiter", "Uranus", "Neptune"], "correct": 0},
    {"q": "Which planet rotates on its side (axial tilt ~98°)?", "a": ["Uranus", "Neptune", "Saturn", "Venus"], "correct": 0},
    {"q": "Which planet is the hottest in our solar system?", "a": ["Venus", "Mercury", "Mars", "Jupiter"], "correct": 0},
    {"q": "Which planet has the Great Red Spot?", "a": ["Jupiter", "Saturn", "Mars", "Neptune"], "correct": 0},
    {"q": "Which is the smallest planet in our solar system?", "a": ["Mercury", "Mars", "Pluto", "Venus"], "correct": 0},
    {"q": "How many moons does Mars have?", "a": ["2", "0", "1", "4"], "correct": 0},
    {"q": "Which planet has the most moons?", "a": ["Saturn", "Jupiter", "Uranus", "Neptune"], "correct": 0},
    {"q": "What is the name of Earth's only natural satellite?", "a": ["Moon", "Titan", "Phobos", "Ganymede"], "correct": 0},
    {"q": "Which planet is farthest from the Sun?", "a": ["Neptune", "Uranus", "Saturn", "Pluto"], "correct": 0},

    # Stars & the Sun
    {"q": "How long does light from the Sun take to reach Earth?", "a": ["8 minutes", "1 hour", "1 second", "1 day"], "correct": 0},
    {"q": "What is the closest star to Earth (besides the Sun)?", "a": ["Proxima Centauri", "Sirius", "Betelgeuse", "Vega"], "correct": 0},
    {"q": "What type of star is our Sun?", "a": ["Yellow dwarf", "Red giant", "White dwarf", "Blue supergiant"], "correct": 0},
    {"q": "What is the brightest star visible from Earth at night?", "a": ["Sirius", "Polaris", "Vega", "Betelgeuse"], "correct": 0},
    {"q": "What is a neutron star?", "a": ["Collapsed stellar core of extreme density", "A young star forming in a nebula", "A star orbiting a black hole", "A star with no hydrogen left"], "correct": 0},
    {"q": "What color are the hottest stars?", "a": ["Blue", "Red", "Yellow", "Orange"], "correct": 0},
    {"q": "What will our Sun eventually become after leaving the main sequence?", "a": ["Red giant then white dwarf", "Neutron star", "Black hole", "Blue supergiant"], "correct": 0},
    {"q": "What is the North Star also called?", "a": ["Polaris", "Sirius", "Vega", "Arcturus"], "correct": 0},
    {"q": "What is Betelgeuse?", "a": ["A red supergiant star", "A black hole", "A nebula", "A dwarf planet"], "correct": 0},

    # Galaxies & Universe
    {"q": "What galaxy do we live in?", "a": ["Milky Way", "Andromeda", "Triangulum", "Sombrero"], "correct": 0},
    {"q": "What is the nearest major galaxy to the Milky Way?", "a": ["Andromeda", "Triangulum", "Sombrero", "Whirlpool"], "correct": 0},
    {"q": "What is a light-year?", "a": ["Distance light travels in a year", "Time to orbit the Sun", "Speed of a comet", "Size of a galaxy"], "correct": 0},
    {"q": "What is the shape of the Milky Way galaxy?", "a": ["Barred spiral", "Elliptical", "Irregular", "Ring"], "correct": 0},
    {"q": "Approximately how old is the universe?", "a": ["13.8 billion years", "4.5 billion years", "100 billion years", "6 billion years"], "correct": 0},
    {"q": "What event is believed to have started the universe?", "a": ["The Big Bang", "A supernova explosion", "A black hole collision", "The Great Inflation"], "correct": 0},
    {"q": "What is dark matter?", "a": ["Invisible mass that affects gravity", "Matter inside black holes", "Burned-out stars", "Interstellar gas clouds"], "correct": 0},
    {"q": "What is a quasar?", "a": ["Extremely luminous active galactic nucleus", "A type of pulsar", "A young star cluster", "A comet near a galaxy"], "correct": 0},

    # Space Phenomena
    {"q": "What causes a solar eclipse?", "a": ["Moon blocks the Sun", "Earth blocks the Sun", "Sun goes dark", "A comet passes"], "correct": 0},
    {"q": "What causes a lunar eclipse?", "a": ["Earth's shadow falls on the Moon", "Moon blocks the Sun", "The Moon moves away", "The Sun dims"], "correct": 0},
    {"q": "What is a black hole?", "a": ["A region where gravity prevents even light from escaping", "A collapsed neutron star", "A dark nebula", "A void between galaxies"], "correct": 0},
    {"q": "What is a supernova?", "a": ["A massive stellar explosion", "A large comet impact", "A galaxy collision", "A solar flare"], "correct": 0},
    {"q": "What is the event horizon of a black hole?", "a": ["The point of no return around a black hole", "The outer edge of a galaxy", "The surface of a neutron star", "The boundary of the solar system"], "correct": 0},
    {"q": "What is a nebula?", "a": ["A cloud of gas and dust in space", "A type of galaxy", "A dead star", "A comet tail"], "correct": 0},
    {"q": "What are pulsars?", "a": ["Rapidly rotating neutron stars emitting beams of radiation", "Exploding stars", "Young protostars", "Black hole jets"], "correct": 0},
    {"q": "What is the asteroid belt?", "a": ["A region between Mars and Jupiter filled with asteroids", "A belt of moons around Saturn", "A debris field beyond Neptune", "A ring of comets"], "correct": 0},
    {"q": "What is the Oort Cloud?", "a": ["A distant shell of icy bodies surrounding the solar system", "A cloud of gas near the Sun", "A region of asteroids", "Saturn's outer ring"], "correct": 0},
    {"q": "What is a comet made of?", "a": ["Ice, dust, and rocky material", "Pure iron", "Hydrogen gas", "Dark matter"], "correct": 0},

    # Space Exploration
    {"q": "Which was the first artificial satellite launched into space?", "a": ["Sputnik 1", "Explorer 1", "Vostok 1", "Luna 1"], "correct": 0},
    {"q": "Who was the first human to walk on the Moon?", "a": ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"], "correct": 0},
    {"q": "Who was the first human to travel to space?", "a": ["Yuri Gagarin", "Neil Armstrong", "Alan Shepard", "John Glenn"], "correct": 0},
    {"q": "Which space telescope was launched in 1990 and revolutionized astronomy?", "a": ["Hubble", "James Webb", "Chandra", "Spitzer"], "correct": 0},
    {"q": "Which agency landed the first rover on Mars?", "a": ["NASA", "ESA", "Roscosmos", "CNSA"], "correct": 0},
    {"q": "What is the International Space Station's approximate orbital altitude?", "a": ["400 km", "100 km", "1000 km", "36000 km"], "correct": 0},
    {"q": "Which mission first landed humans on the Moon?", "a": ["Apollo 11", "Apollo 13", "Gemini 7", "Mercury 6"], "correct": 0},
    {"q": "What was the name of the first space shuttle to fly in space?", "a": ["Columbia", "Challenger", "Discovery", "Atlantis"], "correct": 0},
    {"q": "Which probe has traveled farthest from Earth?", "a": ["Voyager 1", "Voyager 2", "New Horizons", "Pioneer 10"], "correct": 0},
    {"q": "What is the James Webb Space Telescope primarily designed to observe?", "a": ["Infrared light from distant objects", "Ultraviolet solar activity", "Radio waves from pulsars", "X-rays from black holes"], "correct": 0},

    # Physics & Measurement
    {"q": "What is the speed of light in a vacuum?", "a": ["~300,000 km/s", "~150,000 km/s", "~30,000 km/s", "~3,000,000 km/s"], "correct": 0},
    {"q": "What keeps planets in orbit around the Sun?", "a": ["Gravity", "Magnetism", "Solar wind", "Dark energy"], "correct": 0},
    {"q": "What is the Milky Way's approximate diameter?", "a": ["100,000 light-years", "1 million light-years", "10,000 light-years", "1 billion light-years"], "correct": 0},
    {"q": "What unit do astronomers use to measure distances within the solar system?", "a": ["Astronomical Unit (AU)", "Light-year", "Parsec", "Kilometer"], "correct": 0},
]

@app.route('/api/quiz/question')
def quiz_question():
    q = random.choice(QUIZ_QUESTIONS)
    shuffled = list(enumerate(q["a"]))
    random.shuffle(shuffled)
    correct_val = q["a"][q["correct"]]
    new_answers = [a for _, a in shuffled]
    new_correct = new_answers.index(correct_val)
    return jsonify({"question": q["q"], "answers": new_answers, "correct": new_correct})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', debug=False, port=port)
