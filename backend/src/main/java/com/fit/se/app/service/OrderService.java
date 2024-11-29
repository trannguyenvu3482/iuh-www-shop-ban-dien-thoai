package com.fit.se.app.service;

import com.fit.se.app.dto.request.RequestOrderDTO;
import com.fit.se.app.repository.OrderRepository;

public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // TODO: CRUD
    public void createOrder(RequestOrderDTO order) {
//        orderRepository.save(order);
    }
}
