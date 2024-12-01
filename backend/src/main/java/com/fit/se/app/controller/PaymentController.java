package com.fit.se.app.controller;

import com.fit.se.app.dto.request.RequestPaymentDTO;
import com.fit.se.app.dto.request.RequestPaymentStatusDTO;
import com.fit.se.app.service.PaymentService;
import com.fit.se.app.service.PaymentStatusService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("/api/v1/payment")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaymentController {
    private final PaymentService paymentService;
    private final PaymentStatusService paymentStatusService;

    public PaymentController(PaymentService paymentService, PaymentStatusService paymentStatusService) {
        this.paymentService = paymentService;
        this.paymentStatusService = paymentStatusService;
    }

    @PostMapping
    public String createOrderPayment(HttpServletRequest request, @RequestBody RequestPaymentDTO requestPaymentDTO) throws IOException {

        String result = this.paymentService.createOrder(request, requestPaymentDTO.getOrderId());
        return "redirect:" + result;
    }

    @GetMapping("/callback")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> doCallBack(@RequestParam Map<String, Object> callBackInfo) {
        System.out.println(callBackInfo);
        return ResponseEntity.ok(callBackInfo);
    }

    @PostMapping("/get-status")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> getStatus(HttpServletRequest request, @RequestBody RequestPaymentStatusDTO statusRequestDTO) throws IOException {

        Map<String, Object> result = this.paymentStatusService.getStatus(request, statusRequestDTO);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
