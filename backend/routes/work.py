from fastapi import APIRouter, HTTPException, Depends
from typing import List
import os
from ..models import WorkImage
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/work", tags=["work"])

# Get database connection
async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

@router.get("/", response_model=List[WorkImage])
async def get_work_images(db = Depends(get_database)):
    """Get all work images for portfolio"""
    try:
        work_images = await db.work_images.find().to_list(1000)
        return [WorkImage(**work_image) for work_image in work_images]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching work images: {str(e)}")

@router.get("/{work_id}", response_model=WorkImage)
async def get_work_image(work_id: str, db = Depends(get_database)):
    """Get a specific work image"""
    try:
        work_image = await db.work_images.find_one({"id": work_id})
        if not work_image:
            raise HTTPException(status_code=404, detail="Work image not found")
        
        return WorkImage(**work_image)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching work image: {str(e)}")