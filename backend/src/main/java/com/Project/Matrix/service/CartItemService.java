package com.Project.Matrix.service;

import com.Project.Matrix.entity.CartItem;
import com.Project.Matrix.entity.Product;
import com.Project.Matrix.repository.CartItemRepository;
import com.Project.Matrix.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartItem addCartItem(String productid, int quantity) {
        Product product = productRepository.findById(productid)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = new CartItem();
        item.setId(UUID.randomUUID().toString());
        item.setProductid(productid);
        item.setQuantity(quantity);
        item.setTotalPrice(product.getPrice() * quantity);

        return cartItemRepository.save(item);
    }

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public void deleteCartItem(String cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    public CartItem updateCartItemQuantity(String cartItemId, int newQuantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        Product product = productRepository.findById(item.getProductid())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        item.setQuantity(newQuantity);
        item.setTotalPrice(product.getPrice() * newQuantity);

        return cartItemRepository.save(item);
    }

    public Optional<CartItem> getCartItemById(String id) {
        return cartItemRepository.findById(id);
    }

    public Optional<CartItem> getCartItemByProductid(String id) {
        return cartItemRepository.findByProductid(id);
    }

    public CartItem patchCartItem(String id, Map<String, Object> updates) {
        Optional<CartItem> optionalItem = cartItemRepository.findById(id);
        if (optionalItem.isEmpty()) return null;

        CartItem item = optionalItem.get();

        if (updates.containsKey("quantity")) {
            item.setQuantity((Integer) updates.get("quantity"));
        }
        if (updates.containsKey("totalPrice")) {
            item.setTotalPrice((Integer) updates.get("totalPrice"));
        }

        return cartItemRepository.save(item);
    }
}
