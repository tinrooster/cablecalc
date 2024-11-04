from fastapi import FastAPI, HTTPException, Depends, Response
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import pandas as pd

from fastapi.middleware.cors import CORSMiddleware
from .models.database import CableCalculation
from .utils.calculator import CableCalculator
from .database.connection import get_db

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

calculator = CableCalculator()

@app.post("/calculate", response_model=CableCalculationResponse)
async def calculate_cable_length(
    request: CableCalculationRequest,
    db: Session = Depends(get_db)
):
    try:
        result = calculator.calculate_distance(
            request.source_rack,
            request.target_rack,
            request.route_type,
            request.settings.dict()
        )
        
        # Save calculation to database
        calculation = CableCalculation(
            source_rack=request.source_rack,
            target_rack=request.target_rack,
            route_type=request.route_type,
            cable_length=result['cable_length'],
            route_path=result['route_path'],
            settings=request.settings.dict()
        )
        db.add(calculation)
        db.commit()
        db.refresh(calculation)
        
        return calculation
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/calculate-batch", response_model=List[CableCalculationResponse])
async def calculate_batch(
    requests: List[CableCalculationRequest],
    db: Session = Depends(get_db)
):
    results = []
    for request in requests:
        try:
            result = await calculate_cable_length(request, db)
            results.append(result)
        except HTTPException as e:
            results.append({
                "error": e.detail,
                "request": request.dict()
            })
    return results

@app.get("/export")
async def export_calculations(
    format: str = "csv",
    filtered: bool = False,
    filters: Optional[dict] = None,
    db: Session = Depends(get_db)
):
    query = db.query(CableCalculation)
    
    if filtered and filters:
        # Apply filters
        if 'source_rack' in filters:
            query = query.filter(CableCalculation.source_rack.like(f"%{filters['source_rack']}%"))
        if 'target_rack' in filters:
            query = query.filter(CableCalculation.target_rack.like(f"%{filters['target_rack']}%"))
        if 'route_type' in filters:
            query = query.filter(CableCalculation.route_type == filters['route_type'])
        if 'min_length' in filters:
            query = query.filter(CableCalculation.cable_length >= filters['min_length'])
        if 'max_length' in filters:
            query = query.filter(CableCalculation.cable_length <= filters['max_length'])

    calculations = query.all()
    
    if format == "csv":
        df = pd.DataFrame([{
            'Source': calc.source_rack,
            'Target': calc.target_rack,
            'Route': calc.route_path,
            'Length (ft)': calc.cable_length,
            'Timestamp': calc.timestamp
        } for calc in calculations])
        
        return Response(
            content=df.to_csv(index=False),
            media_type="text/csv",
            headers={
                'Content-Disposition': 'attachment; filename=cable_calculations.csv'
            }
        )
    
    return calculations 