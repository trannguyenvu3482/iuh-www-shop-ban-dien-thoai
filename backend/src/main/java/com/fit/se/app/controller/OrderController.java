package com.fit.se.app.controller;

import com.fit.se.app.dto.request.RequestOrderDTO;
import com.fit.se.app.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/v1/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public String createOrder(HttpServletRequest request, @Valid @RequestBody RequestOrderDTO order) {
        Object result = orderService.createOrder(request, order);

        if (result instanceof String) {
            return "redirect:" + result;
        } else {
            return "Order created successfully";
        }
    }

}
