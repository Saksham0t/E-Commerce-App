package com.project.Matrix.service;

import com.project.Matrix.DTO.OrderDto;
import com.project.Matrix.DTO.OrderProductDto;
import com.project.Matrix.entity.Order;
import com.project.Matrix.entity.OrderProduct;
import com.project.Matrix.entity.User;
import com.project.Matrix.repository.OrderRepository;
import com.project.Matrix.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    // GET: Fetch all orders
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapOrderEntityToOrderDTO)
                .collect(Collectors.toList());
    }

    // GET: Fetch order by ID
    public OrderDto getOrderById(String id) {
        Order order = orderRepository.findById(id).orElseThrow();
        return mapOrderEntityToOrderDTO(order);
    }

    // POST: Create a new order
    public Order createOrder(Order order) {
        User user = userRepository.findById(order.getUser().getId()).orElseThrow();
        order.setUser(user);
        return orderRepository.save(order);
    }

    // PUT: Update an existing order
    public Order updateOrder(String id, Order updatedOrder) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));

        modelMapper.map(updatedOrder, existingOrder);
        return orderRepository.save(existingOrder);
    }

    // DELETE: Remove an order by ID
    public void deleteOrder(String id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found with ID: " + id);
        }
        orderRepository.deleteById(id);
    }

    public OrderDto mapOrderEntityToOrderDTO(Order order) {
        OrderDto dto = modelMapper.map(order, OrderDto.class);
        dto.setUserId(order.getUser().getId());

        List<OrderProductDto> productDTOs = order.getProducts().stream()
                .map(product -> modelMapper.map(product, OrderProductDto.class))
                .collect(Collectors.toList());

        dto.setProducts(productDTOs);
        return dto;
    }

    public Order mapOrderDTOToEntity(OrderDto dto) {
        Order order = modelMapper.map(dto, Order.class);

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + dto.getUserId()));
        order.setUser(user);

        List<OrderProduct> products = dto.getProducts().stream()
                .map(update -> modelMapper.map(update, OrderProduct.class))
                .collect(Collectors.toList());

        order.setProducts(products);
        return order;
    }
}
