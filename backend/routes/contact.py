from fastapi import APIRouter, HTTPException, Depends
from typing import List
import os
from ..models import ContactMessage, ContactMessageCreate
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/contact", tags=["contact"])

# Get database connection
async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

@router.post("/", response_model=ContactMessage)
async def create_contact_message(message: ContactMessageCreate, db = Depends(get_database)):
    """Create a new contact message"""
    try:
        message_obj = ContactMessage(**message.dict())
        result = await db.contact_messages.insert_one(message_obj.model_dump())
        
        if result.inserted_id:
            return message_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create contact message")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating contact message: {str(e)}")

@router.get("/", response_model=List[ContactMessage])
async def get_contact_messages(db = Depends(get_database)):
    """Get all contact messages (admin only)"""
    try:
        messages = await db.contact_messages.find().to_list(1000)
        return [ContactMessage(**message) for message in messages]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact messages: {str(e)}")

@router.get("/{message_id}", response_model=ContactMessage)
async def get_contact_message(message_id: str, db = Depends(get_database)):
    """Get a specific contact message"""
    try:
        message = await db.contact_messages.find_one({"id": message_id})
        if not message:
            raise HTTPException(status_code=404, detail="Contact message not found")
        
        return ContactMessage(**message)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contact message: {str(e)}")

@router.put("/{message_id}/status")
async def update_message_status(message_id: str, status: str, db = Depends(get_database)):
    """Update contact message status"""
    try:
        result = await db.contact_messages.update_one(
            {"id": message_id},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact message not found")
        
        return {"message": "Status updated successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating message status: {str(e)}")