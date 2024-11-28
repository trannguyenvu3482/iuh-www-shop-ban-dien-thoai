package com.fit.se.app.service;

import com.fit.se.app.dto.response.ResponseCartDTO;
import com.fit.se.app.entity.Cart;
import com.fit.se.app.entity.CartDetail;
import com.fit.se.app.entity.User;
import com.fit.se.app.mapper.CartMapper;
import com.fit.se.app.repository.CartDetailRepository;
import com.fit.se.app.repository.CartRepository;
import com.fit.se.app.repository.ProductRepository;
import com.fit.se.app.repository.ProductVariantsRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CartService {
    private final CartRepository cartRepository;
    private final CartDetailRepository cartDetailRepository;
    private final ProductRepository productRepository;
    private final ProductVariantsRepository productVariantsRepository;
    private final CartMapper cartMapper;

    public CartService(CartRepository cartRepository,
                       CartDetailRepository cartDetailRepository,
                       ProductRepository productRepository,
                       ProductVariantsRepository productVariantsRepository,
                       CartMapper cartMapper) {
        this.cartRepository = cartRepository;
        this.cartDetailRepository = cartDetailRepository;
        this.productRepository = productRepository;
        this.productVariantsRepository = productVariantsRepository;
        this.cartMapper = cartMapper;
    }

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public ResponseCartDTO getCartByUserId(Integer userId) {
        Optional<Cart> cart = cartRepository.findByUserId(userId);

        if (cart.isPresent()) {
            return cartMapper.toCartDTO(cart.get());
        } else throw new IllegalArgumentException("Không tìm thấy giỏ hàng của người dùng: " + userId);
    }

    public void recalculateCart(Cart cart) {
        BigDecimal totalPrice = cart.getCartDetails().stream()
                .map(cartDetail -> cartDetail.getProduct().getBasePrice().multiply(BigDecimal.valueOf(cartDetail.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalPrice(totalPrice);
    }

    public Cart initCartDetail(Integer productId, Integer productVariantId, User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giỏ hàng"));

        CartDetail newCartDetail = new CartDetail();
        newCartDetail.setCart(cart);
        newCartDetail.setProduct(productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy sản phẩm")));
        newCartDetail.setProductVariant(productVariantsRepository.findById(productVariantId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy biến thể sản phẩm")));
        newCartDetail.setQuantity(1);

        cartDetailRepository.save(newCartDetail);
        recalculateCart(cart);
        cartRepository.save(cart);

        return cart;
    }

    public ResponseCartDTO increaseCartDetail(Integer productId, Integer productVariantId, User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giỏ hàng"));

        CartDetail cartDetail = cartDetailRepository.findByProductIdAndCartIdAndAndProductVariantId(productId, cart.getId(), productVariantId)
                .orElseGet(() -> initCartDetail(productId, productVariantId, user).getCartDetails().get(0));

        cartDetail.setQuantity(cartDetail.getQuantity() + 1);
        cartDetailRepository.save(cartDetail);

        recalculateCart(cart);
        cartRepository.save(cart);

        return cartMapper.toCartDTO(cart);
    }

    public ResponseCartDTO decreaseCartDetail(Integer productId, Integer productVariantId, User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giỏ hàng"));

        CartDetail cartDetail = cartDetailRepository.findByProductIdAndCartIdAndAndProductVariantId(productId, cart.getId(), productVariantId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy chi tiết giỏ hàng"));

        if (cartDetail.getQuantity() > 1) {
            cartDetail.setQuantity(cartDetail.getQuantity() - 1);
            cartDetailRepository.save(cartDetail);
        } else {
            cartDetailRepository.delete(cartDetail);
        }

        recalculateCart(cart);
        cartRepository.save(cart);

        return cartMapper.toCartDTO(cart);
    }
}
