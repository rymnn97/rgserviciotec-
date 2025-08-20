from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path

# Import route modules
from routes import contact, services, testimonials, plans, work, company

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(
    title="RG Servicio Técnico API",
    description="API for RG Servicio Técnico website",
    version="1.0.0"
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Root endpoint
@api_router.get("/")
async def root():
    return {
        "message": "RG Servicio Técnico API",
        "version": "1.0.0",
        "status": "active"
    }

# Health check endpoint
@api_router.get("/health")
async def health_check():
    try:
        # Test database connection
        await client.admin.command('ping')
        return {
            "status": "healthy",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "disconnected",
            "error": str(e)
        }

# Include all route modules
api_router.include_router(contact.router)
api_router.include_router(services.router)
api_router.include_router(testimonials.router)
api_router.include_router(plans.router)
api_router.include_router(work.router)
api_router.include_router(company.router)

# Include the API router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("RG Servicio Técnico API starting up...")
    logger.info(f"Connected to MongoDB: {mongo_url}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("RG Servicio Técnico API shutting down...")
    client.close()