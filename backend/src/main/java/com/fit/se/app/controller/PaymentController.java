package com.fit.se.app.controller;

import com.fit.se.app.dto.request.RequestOrderDTO;
import com.fit.se.app.dto.request.RequestOrderStatusDTO;
import com.fit.se.app.service.PaymentService;
import com.fit.se.app.service.PaymentStatusService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/payment")
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentStatusService paymentStatusService;

    public PaymentController(PaymentService paymentService, PaymentStatusService paymentStatusService) {
        this.paymentService = paymentService;
        this.paymentStatusService = paymentStatusService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrderPayment(HttpServletRequest request, @RequestBody RequestOrderDTO requestOrderDTO) throws IOException {

        Map<String, Object> result = this.paymentService.createOrder(request, requestOrderDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/create-order/callback")
    public ResponseEntity<Map<String, Object>> doCallBack(@RequestParam Map<String, Object> callBackInfo) {
        System.out.println(callBackInfo);
        return ResponseEntity.ok(callBackInfo);
    }

    @PostMapping("/create-order/get-status")
    public ResponseEntity<Map<String, Object>> getStatus(HttpServletRequest request, @RequestBody RequestOrderStatusDTO statusRequestDTO) throws IOException {

        Map<String, Object> result = this.paymentStatusService.getStatus(request, statusRequestDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
