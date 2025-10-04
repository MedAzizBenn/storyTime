from github import Github, Auth
import os
import json
import re
from github import Github
from openai import OpenAI

# --- Setup ---
GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
PR_NUMBER = int(os.environ["PR_NUMBER"])
REPO_NAME = os.environ["GITHUB_REPOSITORY"]
OPENROUTER_API_KEY = os.environ["OPENROUTER_API_KEY"]

gh = Github(auth=Auth.Token(GITHUB_TOKEN))
repo = gh.get_repo(REPO_NAME)
pr = repo.get_pull(PR_NUMBER)

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY,
)

# --- Step 1: Get changed files in PR ---
files = pr.get_files()
react_files = [f for f in files if f.filename.endswith((".jsx", ".tsx", ".js", ".ts"))]

# --- Step 2: AI Review ---
def parse_ai_json(text_output: str):
    """Extract JSON array from AI response, even if extra text is around it."""
    try:
        match = re.search(r"\[.*\]", text_output, re.DOTALL)
        if match:
            return json.loads(match.group(0))
    except json.JSONDecodeError as e:
        print(f"❌ Failed to parse JSON: {e}")
    return []

def get_ai_review_suggestions(file_path: str, patch: str, file_content: str):
    prompt = f"""
You are a senior code reviewer. Review the following React/JS/TS file.
Return ONLY valid JSON: a list of objects with keys:
- line (number)
- suggestion (short clear comment)
- type (bug/performance/readability/style/security)

File path: {file_path}
Patch:
{patch}

Full file content:
{file_content}
"""
    response = client.chat.completions.create(
        extra_headers={
            "HTTP-Referer": "https://example.com",
            "X-Title": "AI Code Reviewer",
        },
        model="openai/gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
        max_tokens=800,
    )

    text_output = response.choices[0].message.content
    suggestions = parse_ai_json(text_output)
    if not suggestions:
        print(f"❌ Failed to parse AI response for {file_path}:\n{text_output}")
    return suggestions

# --- Post comments ---
files = pr.get_files()
react_files = [f for f in files if f.filename.endswith((".jsx", ".tsx", ".js", ".ts"))]

for f in react_files:
    file_path = f.filename
    patch = f.patch or ""
    file_obj = repo.get_contents(file_path, ref=pr.head.ref)
    file_content = file_obj.decoded_content.decode("utf-8")

    suggestions = get_ai_review_suggestions(file_path, patch, file_content)
    for s in suggestions:
        try:
            pr.create_review_comment(
                body=f"[AI Review] {s['suggestion']} ({s['type']})",
                commit_id=pr.head.sha,
                path=file_path,
                line=s["line"],
                side="RIGHT",
            )
        except Exception as e:
            print(f"⚠️ Failed to comment on {file_path}:{s.get('line')} — {e}")

print(f"✅ AI review posted for PR #{PR_NUMBER}")
