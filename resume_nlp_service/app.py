# app.py
from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = SentenceTransformer('all-MiniLM-L6-v2')

@app.route('/embed-match', methods=['POST'])
def embed_and_match():
    data = request.get_json()
    resume = data.get("resume")
    jd = data.get("job_description")

    if not resume or not jd:
        return jsonify({"error": "Missing resume or job_description"}), 400

    resume_emb = model.encode(resume, convert_to_tensor=False)
    jd_emb = model.encode(jd, convert_to_tensor=False)
    score = cosine_similarity([resume_emb], [jd_emb])[0][0]

    jd_keywords = set(jd.lower().split())
    resume_keywords = set(resume.lower().split())

    matched = list(jd_keywords & resume_keywords)
    missing = list(jd_keywords - resume_keywords)

    return jsonify({
        "score": round(float(score), 2),
        "matched_keywords": matched,
        "missing_keywords": missing
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
