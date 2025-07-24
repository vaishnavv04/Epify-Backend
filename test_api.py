import requests
import json

# IMPORTANT: Change this URL to match your running server's URL and port
BASE_URL = "http://localhost:3000"

def print_result(test_name, passed, expected=None, got=None, request_data=None, response_body=None):
    """Prints the test result in a standard format."""
    if passed:
        print(f"{test_name}: PASSED")
    else:
        print(f"{test_name}: FAILED")
        if request_data:
            print(f"  Request Body: {json.dumps(request_data)}")
        if expected is not None or got is not None:
            print(f"  Expected: {expected}, Got: {got}")
        if response_body:
            print(f"  Response Body: {response_body}")

def test_register_user():
    """Tests the user registration endpoint."""
    payload = {"username": "puja", "password": "mypassword"}
    res = requests.post(f"{BASE_URL}/register", json=payload)
    passed = res.status_code in [201, 409] # Expects 201 (Created) or 409 (Conflict if user exists)
    print_result("User Registration", passed, "201 or 409", res.status_code, payload, res.text)
    return passed

def test_login():
    """Tests the login endpoint and returns the access token on success."""
    payload = {"username": "puja", "password": "mypassword"}
    res = requests.post(f"{BASE_URL}/login", json=payload)
    token = None
    passed = False
    if res.status_code == 200:
        try:
            token = res.json().get("access_token")
            passed = token is not None
        except Exception:
            passed = False
    print_result("Login Test", passed, "200 with access_token", res.status_code, payload, res.text)
    return token

def test_add_product(token):
    """Tests adding a product and returns the product_id on success."""
    payload = {
        "name": "Phone",
        "type": "Electronics",
        "sku": "PHN-001",
        "image_url": "https://example.com/phone.jpg",
        "description": "Latest Phone",
        "quantity": 5,
        "price": 999.99
    }
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.post(f"{BASE_URL}/products", json=payload, headers=headers)
    product_id = None
    passed = res.status_code == 201
    if passed:
        try:
            product_id = res.json().get("product_id")
            passed = product_id is not None
        except Exception:
            passed = False
    print_result("Add Product", passed, "201 with product_id", res.status_code, payload, res.text)
    return product_id

def test_update_quantity(token, product_id, new_quantity):
    """Tests updating a product's quantity."""
    payload = {"quantity": new_quantity}
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.put(f"{BASE_URL}/products/{product_id}/quantity", json=payload, headers=headers)
    passed = res.status_code == 200
    print_result("Update Quantity", passed, 200, res.status_code, payload, res.text)
    return passed

def test_get_products(token, product_id, expected_quantity):
    """Tests fetching products and verifies the quantity of the test product."""
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/products", headers=headers)

    if res.status_code != 200:
        print_result("Get Products", False, 200, res.status_code, response_body=res.text)
        return

    try:
        data = res.json()
        products = data.get("products", []) # Assumes paginated response
        found_product = next((p for p in products if p.get("_id") == product_id), None)

        if not found_product:
            print_result("Get Products", False, f"Product with id {product_id} to be found", "Not Found", response_body=res.text)
            return

        got_quantity = found_product.get("quantity")
        passed = got_quantity == expected_quantity
        print_result("Get Products", passed, f"Quantity {expected_quantity}", f"Quantity {got_quantity}", response_body=res.text)

    except Exception as e:
        print_result("Get Products", False, "Valid JSON response", f"Invalid JSON or structure error: {e}", response_body=res.text)

def run_all_tests():
    """Runs all API tests in sequence."""
    print("--- Starting API Tests ---")

    if not test_register_user():
        print("Registration test failed. Aborting further tests.")
        return

    token = test_login()
    if not token:
        print("Login failed. Skipping further tests.")
        return

    product_id = test_add_product(token)
    if not product_id:
        print("Product creation failed. Skipping further tests.")
        return

    new_quantity = 15
    if not test_update_quantity(token, product_id, new_quantity):
        print("Update quantity failed. Aborting further tests.")
        return

    test_get_products(token, product_id, expected_quantity=new_quantity)

    print("--- All Tests Completed ---")

if __name__ == "__main__":
    run_all_tests()