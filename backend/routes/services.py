from fastapi import APIRouter, HTTPException, Depends
from typing import List
import os
from ..models import Service
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/services", tags=["services"])

# Get database connection
async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

@router.get("/", response_model=List[Service])
async def get_services(db = Depends(get_database)):
    """Get all services"""
    try:
        services = await db.services.find().to_list(1000)
        return [Service(**service) for service in services]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching services: {str(e)}")

@router.get("/{service_id}", response_model=Service)
async def get_service(service_id: str, db = Depends(get_database)):
    """Get a specific service"""
    try:
        service = await db.services.find_one({"id": service_id})
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")
        
        return Service(**service)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching service: {str(e)}")