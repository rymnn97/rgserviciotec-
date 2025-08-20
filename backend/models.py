from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid

# Contact Models
class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"  # pending, responded, resolved

class ContactMessageCreate(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    message: str

# Service Models
class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str
    features: List[str]
    price_from: Optional[float] = None
    duration: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Testimonial Models
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    location: str
    avatar: str
    rating: int = Field(ge=1, le=5)
    comment: str
    type: str  # "Institución Educativa", "Empresa", etc.
    created_at: datetime = Field(default_factory=datetime.utcnow)
    approved: bool = True

class TestimonialCreate(BaseModel):
    name: str
    location: str
    rating: int = Field(ge=1, le=5)
    comment: str
    type: str

# Plan Models
class Plan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    price: float
    frequency: str
    icon: str
    description: str
    features: List[str]
    discounts: dict
    popular: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PlanSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    plan_id: str
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    equipment_count: int = 1
    billing_frequency: str = "monthly"  # monthly, yearly
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"  # pending, active, cancelled

class PlanSubscriptionCreate(BaseModel):
    plan_id: str
    customer_name: str
    customer_email: EmailStr
    customer_phone: str
    equipment_count: int = 1
    billing_frequency: str = "monthly"

# Work Image Models
class WorkImage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    image: str
    category: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Company Info Model
class CompanyInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    address: str
    city: str
    email: EmailStr
    phone: str
    whatsapp: str
    instagram: str
    hours: str
    updated_at: datetime = Field(default_factory=datetime.utcnow)