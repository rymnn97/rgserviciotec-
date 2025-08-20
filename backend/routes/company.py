from fastapi import APIRouter, HTTPException, Depends
import os
from models import CompanyInfo
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/company", tags=["company"])

# Get database connection
async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

@router.get("/info", response_model=CompanyInfo)
async def get_company_info(db = Depends(get_database)):
    """Get company information"""
    try:
        company_info = await db.company_info.find_one({})
        if not company_info:
            raise HTTPException(status_code=404, detail="Company info not found")
        
        return CompanyInfo(**company_info)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching company info: {str(e)}")

@router.put("/info", response_model=CompanyInfo)
async def update_company_info(info: CompanyInfo, db = Depends(get_database)):
    """Update company information (admin only)"""
    try:
        result = await db.company_info.replace_one(
            {},
            info.model_dump(),
            upsert=True
        )
        
        return info
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating company info: {str(e)}")