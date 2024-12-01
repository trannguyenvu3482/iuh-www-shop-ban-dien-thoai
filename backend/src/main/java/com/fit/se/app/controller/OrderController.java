package com.fit.se.app.controller;

import com.fit.se.app.dto.request.RequestOrderDTO;
import com.fit.se.app.dto.response.ResponseOrderDTO;
import com.fit.se.app.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/api/v1/orders")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<ResponseOrderDTO> createOrder(HttpServletRequest request, @Valid @RequestBody RequestOrderDTO order) {
        ResponseOrderDTO result = orderService.createOrder(request, order);

        return ResponseEntity.ok(result);
    }

    @PutMapping("/{orderCode}")
    public ResponseEntity<ResponseOrderDTO> updateOrder(@PathVariable String orderCode, @RequestBody RequestOrderDTO order) {
        if (order.getStatus() != null) {
            ResponseOrderDTO result = orderService.updateOrderStatus(orderCode, order);
            return ResponseEntity.ok(result);
        } else {
            throw new RuntimeException("Không tìm thấy trạng thái cập nhật");
        }
    }
}
