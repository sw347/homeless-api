import uvicorn
from fastapi import FastAPI, HTTPException
from elasticsearch import Elasticsearch
from sentence_transformers import SentenceTransformer
from pydantic import BaseModel

app = FastAPI()
model = SentenceTransformer("jhgan/ko-sbert-sts")
es = Elasticsearch(hosts=["http://222.110.147.50:9200"])


class InsertReq(BaseModel):
    query: str


class InsertPost(InsertReq):
    post_id: str
    description: str


class InsertWorkPost(InsertReq):
    work_post_id: str
    description: str


class InsertUserTag(InsertReq):
    tag_id: str


class UpsertUser(InsertReq):
    user_id: str


class GetUserByPost(BaseModel):
    title: str
    description: str


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/post")
async def insert_post(body: InsertPost):
    vector = model.encode(body.query + " " + body.description).tolist()
    doc = {
        "post_id": body.post_id,
        "query": body.query,
        "description": body.description,
        "vector": vector,
    }
    try:
        result = es.index(index="posts", body=doc)
        return {"message": "Post inserted", "id": result['_id']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inserting post: {str(e)}")


@app.post("/work-post")
async def insert_work_post(body: InsertWorkPost):
    vector = model.encode(body.query + " " + body.description).tolist()
    doc = {
        "work_post_id": body.work_post_id,
        "query": body.query,
        "description": body.description,
        "vector": vector
    }
    try:
        result = es.index(index="work_posts", body=doc)
        return {"message": "Work post inserted", "id": result['_id']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inserting work post: {str(e)}")


@app.post("/tag")
async def insert_user_tag(body: InsertUserTag):
    vector = model.encode(body.query).tolist()
    doc = {
        "tag_id": body.tag_id,
        "query": body.query,
        "vector": vector
    }
    try:
        result = es.index(index="user_tags", body=doc)
        return {"message": "User tag inserted", "id": result['_id']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inserting user tag: {str(e)}")


@app.post("/user")
async def upsert_user(body: UpsertUser):
    lst: list[str] = body.query.split(',')
    vector = model.encode(" ".join(lst)).tolist()
    doc = {
        "user_id": body.user_id,
        "query": lst,
        "vector": vector
    }
    try:
        result = es.index(index="users", id=body.user_id, body=doc)
        return {"message": "User upserted", "id": result['_id']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error upserting user: {str(e)}")


@app.get("/search/user")
async def search_users_by_post(title: str, description: str):
    try:
        vector = model.encode(title + " " + description).tolist()
        script_query = {
            "script_score": {
                "query": {"match_all": {}},
                "script": {
                    "source": "cosineSimilarity(params.query_vector, 'vector') + 1.0",
                    "params": {"query_vector": vector}
                }
            }
        }

        response = es.search(
            index="users",
            body={
                "size": 10,
                "query": script_query,
                "_source": ["user_id"]
            }
        )

        return [hit["_source"]["user_id"] for hit in response["hits"]["hits"]]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching posts by user: {str(e)}")


@app.get("/search/post")
async def search_posts_by_user(user_id: str):
    try:
        user = es.get(index="users", id=user_id)
        user_vector = user['_source']['vector']

        script_query = {
            "script_score": {
                "query": {"match_all": {}},
                "script": {
                    "source": "cosineSimilarity(params.query_vector, 'vector') + 1.0",
                    "params": {"query_vector": user_vector}
                }
            }
        }

        response = es.search(
            index="posts",
            body={
                "size": 10,
                "query": script_query,
                "_source": ["post_id"]
            }
        )

        return [hit["_source"]["post_id"] for hit in response["hits"]["hits"]]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching users by post: {str(e)}")


@app.get("/search/work-post")
async def search_work_posts_by_user(user_id: str):
    try:
        user = es.get(index="users", id=user_id)
        user_vector = user['_source']['vector']

        script_query = {
            "script_score": {
                "query": {"match_all": {}},
                "script": {
                    "source": "cosineSimilarity(params.query_vector, 'vector') + 1.0",
                    "params": {"query_vector": user_vector}
                }
            }
        }

        response = es.search(
            index="work_posts",
            body={
                "size": 10,
                "query": script_query,
                "_source": ["work_post_id"]
            }
        )

        return [hit["_source"]["work_post_id"] for hit in response["hits"]["hits"]]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching users by post: {str(e)}")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8727)

