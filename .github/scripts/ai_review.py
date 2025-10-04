import os
import json
from github import Github
from openai import OpenAI

# --- Setup ---
GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
PR_NUMBER = int(os.environ["PR_NUMBER"])
REPO_NAME = os.environ["GITHUB_REPOSITORY"]
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

gh = Github(GITHUB_TOKEN)
repo = gh.get_repo(REPO_NAME)
pr = repo.get_pull(PR_NUMBER)
client = OpenAI(api_key=OPENAI_API_KEY)

# --- Step 1: Get changed files in PR ---
files = pr.get_files()
react_files = [f for f in files if f.filename.endswith((".jsx", ".tsx", ".js", ".ts"))]

# --- Step 2: Scan each file ---
def get_ai_review_suggestions(file_path: str, patch: str, file_content: str):
    """
    Sends the file patch and content to GPT to get structured code review comments.
    """
    prompt = f"""
You are a senior code reviewer. Review the following React/JavaScript file.
Give your feedback as a JSON list with objects of:
- line (number)
- suggestion (short clear comment)
- type (one of: bug, performance, readability, style, security)

Do NOT output anything except valid JSON.

File path: {file_path}

Patch:
{patch}

Full file content:
{file_content}
"""

    response = client.responses.create(
        model="gpt-5",
        input=prompt,
        temperature=0.3,
        max_output_tokens=800
    )

    text_output = response.output[0].content[0].text
    try:
        suggestions = json.loads(text_output)
        if isinstance(suggestions, list):
            return suggestions
    except json.JSONDecodeError:
        print(f"❌ Failed to parse AI response for {file_path}:\n{text_output}")
    return []

# --- Step 3: Post comments ---
for f in react_files:
    file_path = f.filename
    patch = f.patch or ""

    # Get file content from repo
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
                side="RIGHT"
            )
        except Exception as e:
            print(f"⚠️ Failed to comment on {file_path}:{s.get('line')} — {e}")

print(f"✅ AI review posted for PR #{PR_NUMBER}")
