from fastapi import APIRouter, HTTPException, Depends
from typing import List
import os
from ..models import Plan, PlanSubscription, PlanSubscriptionCreate
from motor.motor_asyncio import AsyncIOMotorClient

router = APIRouter(prefix="/plans", tags=["plans"])

# Get database connection
async def get_database():
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ['DB_NAME']]
    return db

@router.get("/", response_model=List[Plan])
async def get_plans(db = Depends(get_database)):
    """Get all available plans"""
    try:
        plans = await db.plans.find().to_list(1000)
        return [Plan(**plan) for plan in plans]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching plans: {str(e)}")

@router.get("/{plan_id}", response_model=Plan)
async def get_plan(plan_id: str, db = Depends(get_database)):
    """Get a specific plan"""
    try:
        plan = await db.plans.find_one({"id": plan_id})
        if not plan:
            raise HTTPException(status_code=404, detail="Plan not found")
        
        return Plan(**plan)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching plan: {str(e)}")

@router.post("/subscribe", response_model=PlanSubscription)
async def subscribe_to_plan(subscription: PlanSubscriptionCreate, db = Depends(get_database)):
    """Subscribe to a plan"""
    try:
        # Verify plan exists
        plan = await db.plans.find_one({"id": subscription.plan_id})
        if not plan:
            raise HTTPException(status_code=404, detail="Plan not found")
        
        subscription_obj = PlanSubscription(**subscription.model_dump())
        result = await db.plan_subscriptions.insert_one(subscription_obj.model_dump())
        
        if result.inserted_id:
            return subscription_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create subscription")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating subscription: {str(e)}")

@router.get("/subscriptions/", response_model=List[PlanSubscription])
async def get_subscriptions(db = Depends(get_database)):
    """Get all subscriptions (admin only)"""
    try:
        subscriptions = await db.plan_subscriptions.find().to_list(1000)
        return [PlanSubscription(**subscription) for subscription in subscriptions]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching subscriptions: {str(e)}")