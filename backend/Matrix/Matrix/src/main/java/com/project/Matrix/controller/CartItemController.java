package com.project.Matrix.controller;

import com.project.Matrix.entity.CartItem;
import com.project.Matrix.service.CartItemService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
@AllArgsConstructor
public class CartItemController {

    private final CartItemService cartItemService;

//    @GetMapping
//    public ResponseEntity<List<CartItem>> getAllCartItems() {
//        List<CartItem> items = cartItemService.getAllCartItems();
//        return ResponseEntity.ok(items);
//    }

    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

//    // GET /cart/{id} → fetch cart item by its ID
//    @GetMapping("/{id}")
//    public ResponseEntity<CartItem> getCartItemById(@PathVariable String id) {
//        return cartItemService.getCartItemById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }

    @GetMapping("/{id}")
    public Optional<CartItem> getCartItemById(@PathVariable String id) {
        return cartItemService.getCartItemByProductid(id);
    }

//    @GetMapping(params = "productid")
//    public Optional<CartItem> getItemById(@RequestParam("productid") String productId) {
//        return cartItemService.getCartItemByProductid(productId);
//    }

//    @PostMapping
//    public CartItem addCartItem(@RequestBody CartItem cartItem) {
//        return cartItemService.addCartItem(cartItem.getProductid(),1);
//    }

    @PostMapping
    public ResponseEntity<CartItem> addCartItem(@RequestBody CartItem cartItem) {
        CartItem createdItem = cartItemService.addCartItem(cartItem.getProductid(), 1);
        return ResponseEntity.ok(createdItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CartItem> updateCartItemQuantity(@PathVariable String id, @RequestBody CartItem cartItem) {
        CartItem updatedItem = cartItemService.updateCartItemQuantity(id, cartItem.getQuantity());
        return updatedItem != null ? ResponseEntity.ok(updatedItem) : ResponseEntity.notFound().build();
    }

    // PATCH /cart/{id} → partially update cart item
    @PatchMapping("/{id}")
    public ResponseEntity<CartItem> patchCartItem(@PathVariable String id, @RequestBody Map<String, Object> updates) {
        CartItem patchedItem = cartItemService.patchCartItem(id, updates);
        return patchedItem != null ? ResponseEntity.ok(patchedItem) : ResponseEntity.notFound().build();
    }

    // DELETE /cart/{id} → remove cart item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable String id) {
        cartItemService.deleteCartItem(id);
        return ResponseEntity.ok().build();
    }
}
