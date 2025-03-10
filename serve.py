from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_ollama import OllamaLLM
from langserve import add_routes
import os
from dotenv import load_dotenv
load_dotenv()


## Load Gemma2:2b using Ollama
llm = OllamaLLM(model="gemma2:2b")
# 1. Create Prompt Template
system_template = "Translate the following into {language}:"
prompt_template = ChatPromptTemplate.from_messages([
    ("system", system_template),
    ("user", "{text}")
])

parser = StrOutputParser()

# Create Chain
chain = prompt_template | llm | parser

## APP Definition
app = FastAPI(
    title="Langchain Server", version="1.0",
    description="A Simple API Server using Langchain runnable interfaces"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adding Chain Routes
add_routes(
    app, chain,
    path="/chain"
)

if __name__=="__main__":
    import uvicorn
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("-t", "--host", type=str, required=True,
                    help="host address")
    ap.add_argument("-p", "--port", type=int, required=True,
                    help="port")
    args = vars(ap.parse_args())
    uvicorn.run(
        app, host=args["host"],
        port=args["port"]
    )
    print('[INFO] Stopping Server')
