from sqlalchemy import Column, Integer, Float, String, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class CableCalculation(Base):
    __tablename__ = "cable_calculations"

    id = Column(Integer, primary_key=True, index=True)
    source_rack = Column(String, index=True)
    target_rack = Column(String, index=True)
    route_type = Column(String)
    cable_length = Column(Float)
    route_path = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    settings = Column(JSON)  # Stores the calculation settings

    class Config:
        orm_mode = True 