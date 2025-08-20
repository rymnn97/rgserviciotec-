#!/usr/bin/env python3
"""
RG Servicio Técnico Backend API Test Suite
Tests all backend endpoints for functionality and data integrity
"""

import requests
import json
import sys
from datetime import datetime
from typing import Dict, Any, List

# Backend URL from environment
BACKEND_URL = "https://54caadb5-6ca1-4aab-a05c-75e9045e099c.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": [],
            "test_details": []
        }
        
    def log_test(self, test_name: str, passed: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.results["total_tests"] += 1
        if passed:
            self.results["passed"] += 1
            status = "✅ PASS"
        else:
            self.results["failed"] += 1
            status = "❌ FAIL"
            self.results["errors"].append(f"{test_name}: {details}")
        
        test_result = {
            "test": test_name,
            "status": status,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        
        if response_data:
            test_result["response_sample"] = response_data
            
        self.results["test_details"].append(test_result)
        print(f"{status} - {test_name}")
        if details:
            print(f"    Details: {details}")
        print()

    def test_health_check(self):
        """Test GET /api/health endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/health", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "status" in data and "database" in data:
                    if data["status"] == "healthy" and data["database"] == "connected":
                        self.log_test("Health Check", True, "API is healthy and database connected", data)
                    else:
                        self.log_test("Health Check", False, f"Unhealthy status: {data}")
                else:
                    self.log_test("Health Check", False, "Missing required fields in response")
            else:
                self.log_test("Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Health Check", False, f"Request failed: {str(e)}")

    def test_services_endpoint(self):
        """Test GET /api/services/ endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/services/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) >= 6:  # Should have 6 services
                        # Check service structure
                        sample_service = data[0] if data else {}
                        required_fields = ["id", "title", "description", "icon", "features"]
                        
                        if all(field in sample_service for field in required_fields):
                            service_titles = [service.get("title", "") for service in data]
                            expected_services = ["Windows", "celular", "PC", "optimización", "impresora", "mantenimiento"]
                            
                            # Check if we have expected service types
                            found_services = []
                            for expected in expected_services:
                                for title in service_titles:
                                    if expected.lower() in title.lower():
                                        found_services.append(expected)
                                        break
                            
                            self.log_test("Services Endpoint", True, 
                                        f"Found {len(data)} services with expected structure. Services include: {', '.join(found_services)}", 
                                        sample_service)
                        else:
                            missing_fields = [field for field in required_fields if field not in sample_service]
                            self.log_test("Services Endpoint", False, f"Missing required fields: {missing_fields}")
                    else:
                        self.log_test("Services Endpoint", False, f"Expected at least 6 services, got {len(data)}")
                else:
                    self.log_test("Services Endpoint", False, "Response is not a list")
            else:
                self.log_test("Services Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Services Endpoint", False, f"Request failed: {str(e)}")

    def test_plans_endpoint(self):
        """Test GET /api/plans/ endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/plans/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) >= 3:  # Should have 3 plans
                        sample_plan = data[0] if data else {}
                        required_fields = ["id", "name", "price", "frequency", "features"]
                        
                        if all(field in sample_plan for field in required_fields):
                            plan_names = [plan.get("name", "") for plan in data]
                            expected_plans = ["Prevención Esencial", "Rendimiento Óptimo", "Soporte Total"]
                            
                            found_plans = []
                            for expected in expected_plans:
                                for name in plan_names:
                                    if expected.lower() in name.lower():
                                        found_plans.append(expected)
                                        break
                            
                            self.log_test("Plans Endpoint", True, 
                                        f"Found {len(data)} plans with expected structure. Plans: {', '.join(found_plans)}", 
                                        sample_plan)
                        else:
                            missing_fields = [field for field in required_fields if field not in sample_plan]
                            self.log_test("Plans Endpoint", False, f"Missing required fields: {missing_fields}")
                    else:
                        self.log_test("Plans Endpoint", False, f"Expected at least 3 plans, got {len(data)}")
                else:
                    self.log_test("Plans Endpoint", False, "Response is not a list")
            else:
                self.log_test("Plans Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Plans Endpoint", False, f"Request failed: {str(e)}")

    def test_testimonials_endpoint(self):
        """Test GET /api/testimonials/ endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/testimonials/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) >= 3:  # Should have 3 testimonials
                        sample_testimonial = data[0] if data else {}
                        required_fields = ["id", "name", "location", "rating", "comment", "type"]
                        
                        if all(field in sample_testimonial for field in required_fields):
                            # Check rating values are valid (1-5)
                            ratings = [t.get("rating", 0) for t in data]
                            valid_ratings = all(1 <= rating <= 5 for rating in ratings)
                            
                            if valid_ratings:
                                avg_rating = sum(ratings) / len(ratings)
                                self.log_test("Testimonials Endpoint", True, 
                                            f"Found {len(data)} testimonials with valid structure. Average rating: {avg_rating:.1f}/5", 
                                            sample_testimonial)
                            else:
                                self.log_test("Testimonials Endpoint", False, "Invalid rating values found")
                        else:
                            missing_fields = [field for field in required_fields if field not in sample_testimonial]
                            self.log_test("Testimonials Endpoint", False, f"Missing required fields: {missing_fields}")
                    else:
                        self.log_test("Testimonials Endpoint", False, f"Expected at least 3 testimonials, got {len(data)}")
                else:
                    self.log_test("Testimonials Endpoint", False, "Response is not a list")
            else:
                self.log_test("Testimonials Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Testimonials Endpoint", False, f"Request failed: {str(e)}")

    def test_work_images_endpoint(self):
        """Test GET /api/work/ endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/work/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) >= 10:  # Should have 10 work images
                        sample_work = data[0] if data else {}
                        required_fields = ["id", "title", "description", "image"]
                        
                        if all(field in sample_work for field in required_fields):
                            # Check if images have valid URLs or paths
                            images_with_urls = [w for w in data if w.get("image", "").startswith(("http", "/", "data:"))]
                            
                            self.log_test("Work Images Endpoint", True, 
                                        f"Found {len(data)} work images with valid structure. {len(images_with_urls)} have image URLs", 
                                        sample_work)
                        else:
                            missing_fields = [field for field in required_fields if field not in sample_work]
                            self.log_test("Work Images Endpoint", False, f"Missing required fields: {missing_fields}")
                    else:
                        self.log_test("Work Images Endpoint", False, f"Expected at least 10 work images, got {len(data)}")
                else:
                    self.log_test("Work Images Endpoint", False, "Response is not a list")
            else:
                self.log_test("Work Images Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Work Images Endpoint", False, f"Request failed: {str(e)}")

    def test_company_info_endpoint(self):
        """Test GET /api/company/info endpoint"""
        try:
            response = requests.get(f"{BACKEND_URL}/company/info", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "address", "city", "email", "phone", "whatsapp", "hours"]
                
                if all(field in data for field in required_fields):
                    # Validate email format
                    email = data.get("email", "")
                    phone = data.get("phone", "")
                    
                    email_valid = "@" in email and "." in email
                    phone_valid = len(phone) >= 10
                    
                    if email_valid and phone_valid:
                        self.log_test("Company Info Endpoint", True, 
                                    f"Company info retrieved successfully. Contact: {email}, {phone}", 
                                    data)
                    else:
                        issues = []
                        if not email_valid:
                            issues.append("invalid email format")
                        if not phone_valid:
                            issues.append("invalid phone format")
                        self.log_test("Company Info Endpoint", False, f"Data validation issues: {', '.join(issues)}")
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Company Info Endpoint", False, f"Missing required fields: {missing_fields}")
            else:
                self.log_test("Company Info Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Company Info Endpoint", False, f"Request failed: {str(e)}")

    def test_contact_form_endpoint(self):
        """Test POST /api/contact/ endpoint"""
        try:
            # Test data for contact form
            test_contact = {
                "name": "Carlos Rodriguez",
                "email": "carlos.rodriguez@email.com",
                "phone": "+57 300 123 4567",
                "message": "Necesito servicio técnico para mi computadora que no enciende. ¿Podrían ayudarme?"
            }
            
            response = requests.post(f"{BACKEND_URL}/contact/", 
                                   json=test_contact, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "name", "message", "created_at", "status"]
                
                if all(field in data for field in required_fields):
                    # Verify the data was saved correctly
                    if (data["name"] == test_contact["name"] and 
                        data["message"] == test_contact["message"] and
                        data["status"] == "pending"):
                        
                        self.log_test("Contact Form Endpoint", True, 
                                    f"Contact message created successfully with ID: {data['id']}", 
                                    data)
                    else:
                        self.log_test("Contact Form Endpoint", False, "Data mismatch in saved contact message")
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Contact Form Endpoint", False, f"Missing required fields in response: {missing_fields}")
            else:
                self.log_test("Contact Form Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form Endpoint", False, f"Request failed: {str(e)}")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        try:
            # Test invalid service ID
            response = requests.get(f"{BACKEND_URL}/services/invalid-id", timeout=10)
            if response.status_code == 404:
                self.log_test("Error Handling - Invalid Service ID", True, "Correctly returns 404 for invalid service ID")
            else:
                self.log_test("Error Handling - Invalid Service ID", False, f"Expected 404, got {response.status_code}")
            
            # Test invalid contact data
            invalid_contact = {"name": ""}  # Missing required fields
            response = requests.post(f"{BACKEND_URL}/contact/", 
                                   json=invalid_contact, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            if response.status_code in [400, 422]:  # Bad request or validation error
                self.log_test("Error Handling - Invalid Contact Data", True, f"Correctly returns {response.status_code} for invalid contact data")
            else:
                self.log_test("Error Handling - Invalid Contact Data", False, f"Expected 400/422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Error Handling", False, f"Error handling test failed: {str(e)}")

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("RG SERVICIO TÉCNICO - BACKEND API TEST SUITE")
        print("=" * 60)
        print(f"Testing backend at: {BACKEND_URL}")
        print()
        
        # Run all tests
        self.test_health_check()
        self.test_services_endpoint()
        self.test_plans_endpoint()
        self.test_testimonials_endpoint()
        self.test_work_images_endpoint()
        self.test_company_info_endpoint()
        self.test_contact_form_endpoint()
        self.test_error_handling()
        
        # Print summary
        print("=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        print(f"Success Rate: {(self.results['passed']/self.results['total_tests']*100):.1f}%")
        
        if self.results['errors']:
            print("\nFAILED TESTS:")
            for error in self.results['errors']:
                print(f"  • {error}")
        
        print("\n" + "=" * 60)
        
        return self.results

if __name__ == "__main__":
    tester = BackendTester()
    results = tester.run_all_tests()
    
    # Exit with error code if tests failed
    if results['failed'] > 0:
        sys.exit(1)
    else:
        sys.exit(0)