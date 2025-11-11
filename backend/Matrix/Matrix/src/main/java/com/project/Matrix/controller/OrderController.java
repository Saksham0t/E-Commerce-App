package com.project.Matrix.controller;

import com.project.Matrix.DTO.OrderDto;
import com.project.Matrix.entity.Order;
import com.project.Matrix.repository.OrderRepository;
import com.project.Matrix.service.OrderService;
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

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable String id) {
        OrderDto order = orderService.getOrderById(id);
        return order != null ? ResponseEntity.ok(order) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<OrderDto> createOrder(@RequestBody OrderDto orderDto) {
        Order order = orderService.mapOrderDtoToOrderEntity(orderDto);
        Order savedOrder = orderService.createOrder(order);
        OrderDto responseDto = orderService.mapOrderEntityToOrderDto(savedOrder);
        return ResponseEntity.ok(responseDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDto> updateOrder(@PathVariable String id, @RequestBody OrderDto orderDto) {
        Order order = orderService.mapOrderDtoToOrderEntity(orderDto);
        Order saved = orderRepository.save(order);
        OrderDto responseDto= orderService.mapOrderEntityToOrderDto(saved);
        return ResponseEntity.ok(responseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok().build();
    }
}
