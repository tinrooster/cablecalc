from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CableCalculationRequest(BaseModel):
    source_rack: str
    target_rack: str
    route_type: str
    settings: Dict

class CableCalculationResponse(BaseModel):
    source_rack: str
    target_rack: str
    route_type: str
    cable_length: float
    route_path: str

@app.post("/calculate", response_model=CableCalculationResponse)
async def calculate_cable_length(request: CableCalculationRequest):
    try:
        # Dummy calculation for testing
        return {
            "source_rack": request.source_rack,
            "target_rack": request.target_rack,
            "route_type": request.route_type,
            "cable_length": 42.5,  # Dummy value
            "route_path": "Test Path"
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 