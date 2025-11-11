package com.project.Matrix;

import com.project.Matrix.entity.Product;
import com.project.Matrix.repository.ProductRepository;
import com.project.Matrix.service.ProductService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @BeforeEach
    void setup() {
        productRepository.deleteAll();
        Product product = new Product("101", "Test Laptop", 45000, "Electronics", "Test description", "http://image.url");
        productRepository.save(product);
    }

    @Test
    void testGetProductById() {
        String expectedName = "Test Laptop";
        Product product = productService.getProductById("101");

        System.out.println("Expected Name: " + expectedName);
        System.out.println("Actual Name: " + product.getName());
    }

    @Test
    void testGetAllProducts() {
        List<Product> products = productService.getAllProducts();

        System.out.println("Expected Count: 1");
        System.out.println("Actual Count: " + products.size());

        for (Product p : products) {
            System.out.println("Product: " + p.getId() + " - " + p.getName());
        }
    }

    @Test
    void testCreateProduct() {
        Product newProduct = new Product("102", "Phone", 30000, "Electronics", "Smartphone", "http://image2.url");
        Product saved = productService.createProduct(newProduct);

        System.out.println("Expected ID: 102");
        System.out.println("Actual ID: " + saved.getId());
    }
}
