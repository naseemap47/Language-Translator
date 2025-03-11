# Language-Translator
Translate English to different laguages Using LLM models (Groq API / Ollama).<br>
We can interact with model using NodeJs Web-Dashboard.

### Table of Content

- [Setup Server (LangServe)](https://github.com/naseemap47/Language-Translator/master/README.md#setup-server-langserve)
    - [Groq API](https://github.com/naseemap47/Language-Translator/master/README.md#1-groq-api)
    - [Ollama (Local)](https://github.com/naseemap47/Language-Translator/master/README.md#2-ollama-local)
- [Setup User (Web Dashboard)](https://github.com/naseemap47/Language-Translator/master/README.md#setup-user-web-dashboard)

## Setup Server (LangServe)
This needs to install/setup on a Server that runs LLM models locally or use Groq API to invoke the input coming from User (Web Dashboard).

### 1. Groq API
#### Install the requrements
```bash
git clone https://github.com/naseemap47/Language-Translator
cd Language-Translator/
conda create -n server python=3.10 -y
conda activate server
pip3 install -r requirements.txt
```
#### Update **.env**
```.env
LANGCHAIN_API_KEY="{LANGCHAIN_API_KEY}"
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT="https://api.smith.langchain.com"
LANGSMITH_API_KEY="{LANGSMITH_API_KEY}"
LANGSMITH_PROJECT="{LANGSMITH_PROJECT}"
GROQ_API_KEY="{GROQ_API_KEY}"
```
### Start Server
```bash
python3 server.py
```

### 2. Ollama (Local)
#### Install the requrements
```bash
git clone https://github.com/naseemap47/Language-Translator -b ollama
cd Language-Translator/
conda create -n server python=3.10 -y
conda activate server
pip3 install -r requirements.txt
```
##### Install Ollama
Download Ollama on the server <br>
Checkout: https://ollama.com/download

**For Linux**:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```
Download model which is required for you.<br>
Checkout: https://ollama.com/models

For example, I am choosing **deepseek-r1** model.<br>
To download **deepseek-r1** model:
```bash
ollama run deepseek-r1
```
#### Update **.env**
```.env
LANGCHAIN_API_KEY="{LANGCHAIN_API_KEY}"
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT="https://api.smith.langchain.com"
LANGSMITH_API_KEY="{LANGSMITH_API_KEY}"
LANGSMITH_PROJECT="{LANGSMITH_PROJECT}"
```
### Start Server
```bash
python3 server.py
```
## Setup User (Web Dashboard)
### Install NodeJs & npm
Follow NodeJs Docs: https://nodejs.org/en/download
#### Install the requrements
```bash
git clone https://github.com/naseemap47/Language-Translator -b langchain/ui
cd Language-Translator/ui
npm install
```
#### Start the Web Dashboard
```bash
npm start
```
