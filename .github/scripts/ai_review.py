# import os
# import subprocess
# from github import Github
# from transformers import AutoTokenizer, AutoModelForCausalLM
# import torch
# import json

# # -------------------------
# # Config
# # -------------------------
# MODEL_PATH = "/opt/models/starcoder"  # local StarCoder path
# REPO_PATH = "."  # GitHub Action checkout
# MAX_TOKENS = 500

# # GitHub PR info
# GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
# PR_NUMBER = int(os.environ["PR_NUMBER"])
# REPO_NAME = os.environ["GITHUB_REPOSITORY"]

# # -------------------------
# # Load LLaMA 3
# # -------------------------
# tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
# model = AutoModelForCausalLM.from_pretrained(MODEL_PATH, device_map="auto")
# device = "cuda" if torch.cuda.is_available() else "cpu"
# model.to(device)

# # -------------------------
# # Connect to GitHub
# # -------------------------
# gh = Github(GITHUB_TOKEN)
# repo = gh.get_repo(REPO_NAME)
# pr = repo.get_pull(PR_NUMBER)

# # -------------------------
# # Get changed React files
# # -------------------------
# diff_output = subprocess.check_output(
#     ["git", "diff", "--name-only", "origin/develop...HEAD"],
#     cwd=REPO_PATH
# ).decode("utf-8").splitlines()

# react_files = [f for f in diff_output if f.endswith((".js", ".jsx", ".tsx"))]

# # -------------------------
# # Review function
# # -------------------------
# def review_code(code):
#     prompt = f"""
# You are a senior React developer. Review this code and suggest improvements, bugs, and style issues.
# Return JSON array with objects: line (number), suggestion (text), type (bug/style/performance).

# Code:
# {code}
# """
#     inputs = tokenizer(prompt, return_tensors="pt").to(device)
#     outputs = model.generate(**inputs, max_new_tokens=MAX_TOKENS)
#     text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
#     try:
#         return json.loads(text)
#     except:
#         # fallback if not proper JSON
#         return [{"line": 1, "suggestion": text, "type": "info"}]

# # -------------------------
# # Run review for each file
# # -------------------------
# for file_path in react_files:
#     with open(file_path, "r", encoding="utf-8") as f:
#         code = f.read()

#     suggestions = review_code(code)

#     for s in suggestions:
#         pr.create_review_comment(
#             body=f"[AI Review] {s['suggestion']} ({s['type']})",
#             commit_id=pr.head.sha,
#             path=file_path,
#             line=s.get("line", 1),
#             side="RIGHT"
#         )

# print(f"Reviewed {len(react_files)} React files in PR #{PR_NUMBER}")

import os
from github import Github

# GitHub PR info
GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
PR_NUMBER = int(os.environ["PR_NUMBER"])
REPO_NAME = os.environ["GITHUB_REPOSITORY"]

gh = Github(GITHUB_TOKEN)
repo = gh.get_repo(REPO_NAME)
pr = repo.get_pull(PR_NUMBER)

# Dummy changed files (for prototype)
react_files = ["src/App.jsx", "src/Button.jsx"]

# Dummy AI suggestions
dummy_suggestions = [
    {"line": 1, "suggestion": "Consider using useEffect here.", "type": "style"},
    {"line": 5, "suggestion": "Avoid using index as key in lists.", "type": "bug"}
]

# Post dummy comments
for file_path in react_files:
    for s in dummy_suggestions:
        pr.create_review_comment(
            body=f"[AI Review] {s['suggestion']} ({s['type']})",
            commit_id=pr.head.sha,
            path=file_path,
            line=s["line"],
            side="RIGHT"
        )

print(f"Posted dummy AI comments for PR #{PR_NUMBER}")
