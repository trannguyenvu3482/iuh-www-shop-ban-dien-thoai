package com.fit.se.app.service;

import com.fit.se.app.common.constant.enums.OrderStatusEnum;
import com.fit.se.app.dto.request.RequestOrderDTO;
import com.fit.se.app.dto.response.ResponseOrderDTO;
import com.fit.se.app.dto.response.ResponsePaginationDTO;
import com.fit.se.app.entity.Cart;
import com.fit.se.app.entity.CartDetail;
import com.fit.se.app.entity.Order;
import com.fit.se.app.entity.OrderDetail;
import com.fit.se.app.mapper.OrderMapper;
import com.fit.se.app.repository.CartDetailRepository;
import com.fit.se.app.repository.CartRepository;
import com.fit.se.app.repository.OrderDetailRepository;
import com.fit.se.app.repository.OrderRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CartRepository cartRepository;
    private final CartDetailRepository cartDetailRepository;
    private final OrderMapper orderMapper;
    private final PaymentService paymentService;
    private final CartService cartService;

    public OrderService(OrderRepository orderRepository, CartRepository cartRepository, OrderDetailRepository orderDetailRepository, CartDetailRepository cartDetailRepository, OrderMapper orderMapper, PaymentService paymentService, CartService cartService) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.cartDetailRepository = cartDetailRepository;
        this.orderMapper = orderMapper;
        this.paymentService = paymentService;
        this.cartService = cartService;
    }

    public ResponseOrderDTO createOrder(HttpServletRequest request, RequestOrderDTO order) {
        // Get cart of the user
        Optional<Cart> cart = cartRepository.findByUserId(order.getUserId());

        if (cart.isEmpty()) {
            throw new RuntimeException("Không tìm thấy giỏ hàng của người dùng: " + order.getUserId());
        }

        // Create initial order
        Order newOrder = new Order();
        newOrder.setUser(cart.get().getUser());
        newOrder.setShippingAddress(order.getShippingAddress());
        newOrder.setTotalPrice(order.getTotalPrice());
        newOrder.setPaymentMethod(order.getPaymentMethod());
        newOrder.setNote(order.getNote());
        newOrder = orderRepository.save(newOrder);

        // Process Order detail
        List<CartDetail> cartDetails = cart.get().getCartDetails();

        OrderDetail orderDetail;
        for (CartDetail cartDetail : cartDetails) {
            // Add to order detail
            orderDetail = new OrderDetail();
            orderDetail.setOrder(newOrder);
            orderDetail.setProduct(cartDetail.getProduct());
            orderDetail.setProductVariant(cartDetail.getProductVariant());
            orderDetail.setQuantity(cartDetail.getQuantity());
            orderDetail.setPrice(cartDetail.getPrice());
            orderDetailRepository.save(orderDetail);

            // Update stock
            orderDetail.getProductVariant().setStock(orderDetail.getProductVariant().getStock() - orderDetail.getQuantity());
        }

        // Clear cart if vnpay
        if (!order.getPaymentMethod().equalsIgnoreCase("vnpay")) {
            newOrder.setStatus(OrderStatusEnum.CONFIRMED);
            cartDetailRepository.deleteAll(cartDetails);
            // Return the order
            Order addedOrder = orderRepository.save(newOrder);
            return orderMapper.toResponseOrderDTO(addedOrder);
        } else {
            try {
                Order addedOrder = orderRepository.save(newOrder);
                System.out.println("Order created: " + addedOrder.getId());
                String vnpayUrl = paymentService.createOrder(request, addedOrder.getId());
                ResponseOrderDTO responseOrderDTO = orderMapper.toResponseOrderDTO(addedOrder);
                responseOrderDTO.setPaymentUrl(vnpayUrl);
                return responseOrderDTO;
            } catch (UnsupportedEncodingException e) {
                throw new RuntimeException(e.getMessage());
            }
        }

    }

    public ResponsePaginationDTO getOrdersByUserId(Integer userId, Specification<Order> spec, Pageable pageable) {
        spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user").get("id"), userId));
        Page<Order> pageOrders = orderRepository.findAll(spec, pageable);
        List<ResponseOrderDTO> orders = orderMapper.toResponseOrderDTOs(pageOrders.getContent());
        ResponsePaginationDTO responsePaginationDTO = new ResponsePaginationDTO();
        ResponsePaginationDTO.Metadata metadata = new ResponsePaginationDTO.Metadata();

        metadata.setPage(pageable.getPageNumber() + 1);
        metadata.setPageSize(pageable.getPageSize());
        metadata.setTotalPages(pageOrders.getTotalPages());
        metadata.setTotalItems(pageOrders.getTotalElements());

        responsePaginationDTO.setMetadata(metadata);
        responsePaginationDTO.setResult(orders);

        return responsePaginationDTO;
    }

    public ResponseOrderDTO updateOrderStatus(String orderCode, RequestOrderDTO requestOrderDTO) {
        Optional<Order> order = orderRepository.findByOrderCode(orderCode);

        if (order.isEmpty()) {
            throw new RuntimeException("Không tìm thấy đơn hàng: " + orderCode);
        }

        Order updatedOrder = order.get();
        updatedOrder.setStatus(requestOrderDTO.getStatus());
        updatedOrder = orderRepository.save(updatedOrder);

        // Handle xóa cart nếu chuyển sang CONFIRMED
        if (updatedOrder.getStatus() == OrderStatusEnum.CONFIRMED) {
            Optional<Cart> cart = cartRepository.findByUserId(order.get().getUser().getId());

            if (cart.isEmpty()) {
                throw new RuntimeException("Không tìm thấy giỏ hàng của người dùng: " + order.get().getUser().getId());
            }

            cartDetailRepository.deleteAll(cart.get().getCartDetails());
        }

        return orderMapper.toResponseOrderDTO(updatedOrder);
    }
}
