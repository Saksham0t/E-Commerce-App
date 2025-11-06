package com.project.Matrix.service;

import com.project.Matrix.entity.Product;
import com.project.Matrix.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    // GET: Fetch all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET: Fetch product by ID
    public Product getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
    }

    // POST: Create a new product
    public Product createProduct(Product product) {
        if (productRepository.existsById(product.getId())) {
            throw new RuntimeException("Product with ID already exists: " + product.getId());
        }
        return productRepository.save(product);
    }

    // PUT: Update an existing product
    public Product updateProduct(String id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

        modelMapper.map(updatedProduct, existingProduct);
        return productRepository.save(existingProduct);
    }

    // DELETE: Remove a product by ID
    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with ID: " + id);
        }
        productRepository.deleteById(id);
    }
}
