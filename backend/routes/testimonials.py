from fastapi import APIRouter, HTTPException, Depends
from typing import List
import os
from models import Testimonial, TestimonialCreate
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/testimonials", tags=["testimonials"])

# Get database connection
async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

@router.get("/", response_model=List[Testimonial])
async def get_testimonials(db = Depends(get_database)):
    """Get all approved testimonials"""
    try:
        testimonials = await db.testimonials.find({"approved": True}).to_list(1000)
        return [Testimonial(**testimonial) for testimonial in testimonials]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching testimonials: {str(e)}")

@router.post("/", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate, db = Depends(get_database)):
    """Create a new testimonial (requires approval)"""
    try:
        # Generate avatar from first letter of name
        avatar = testimonial.name[0].upper() if testimonial.name else "U"
        
        testimonial_obj = Testimonial(
            **testimonial.model_dump(),
            avatar=avatar,
            approved=False  # Requires approval
        )
        
        result = await db.testimonials.insert_one(testimonial_obj.model_dump())
        
        if result.inserted_id:
            return testimonial_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create testimonial")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating testimonial: {str(e)}")

@router.put("/{testimonial_id}/approve")
async def approve_testimonial(testimonial_id: str, db = Depends(get_database)):
    """Approve a testimonial (admin only)"""
    try:
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": {"approved": True}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        
        return {"message": "Testimonial approved successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error approving testimonial: {str(e)}")