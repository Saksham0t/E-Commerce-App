package com.Project.Matrix.controller;

import com.Project.Matrix.DTO.OrderDto;
import com.Project.Matrix.entity.Order;
import com.Project.Matrix.repository.OrderRepository;
import com.Project.Matrix.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    // GET /orders → fetch all orders
    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // GET /orders/{id} → fetch order by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable String id) {
        OrderDto order = orderService.getOrderById(id);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    // POST /orders → create a new order
    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        Order order = orderService.mapOrderDTOToEntity(orderDto);
        Order savedOrder = orderService.createOrder(order); // ✅ Use service method
        OrderDto responseDto = orderService.mapOrderEntityToOrderDTO(savedOrder);
        return ResponseEntity.ok(responseDto);
    }

    // PUT /orders/{id} → update an existing order
    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable String id, @RequestBody OrderDto orderDto) {
        Order updatedOrder = orderService.updateOrder(id, orderService.mapOrderDTOToEntity(orderDto)); // ✅ Use service method
        OrderDto responseDto = orderService.mapOrderEntityToOrderDTO(updatedOrder);
        return ResponseEntity.ok(responseDto);
    }


    // DELETE /orders/{id} → delete an order
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok().build();
    }
}
