package com.fit.se.app.controller;

import com.fit.se.app.dto.request.OrderRequestDTO;
import com.fit.se.app.dto.request.OrderStatusRequestDTO;
import com.fit.se.app.service.PaymentService;
import com.fit.se.app.service.PaymentStatusService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentStatusService paymentStatusService;

    public PaymentController(PaymentService paymentService, PaymentStatusService paymentStatusService) {
        this.paymentService = paymentService;
        this.paymentStatusService = paymentStatusService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrderPayment(HttpServletRequest request, @RequestBody OrderRequestDTO orderRequestDTO) throws IOException {

        Map<String, Object> result = this.paymentService.createOrder(request, orderRequestDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/create-order/callback")
    public ResponseEntity<Map<String, Object>> doCallBack(@RequestParam Map<String, Object> callBackInfo) {
        System.out.println(callBackInfo);
        return new ResponseEntity<>(callBackInfo, HttpStatus.OK);
    }

    @PostMapping("/create-order/get-status")
    public ResponseEntity<Map<String, Object>> getStatus(HttpServletRequest request, @RequestBody OrderStatusRequestDTO statusRequestDTO) throws IOException {

        Map<String, Object> result = this.paymentStatusService.getStatus(request, statusRequestDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
