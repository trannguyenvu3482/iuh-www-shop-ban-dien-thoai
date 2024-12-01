package com.fit.se.app.service;

import com.fit.se.app.dto.response.ResponseCartDTO;
import com.fit.se.app.entity.*;
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

    public void createCart(Cart cart) {
        cartRepository.save(cart);
    }

    public ResponseCartDTO getCartByUserId(Integer userId) {
        Optional<Cart> cart = cartRepository.findByUserId(userId);

        if (cart.isPresent()) {
            return cartMapper.toCartDTO(cart.get());
        } else throw new IllegalArgumentException("Không tìm thấy giỏ hàng của người dùng: " + userId);
    }

    public void recalculateCart(Cart cart) {
        BigDecimal totalPrice = cart.getCartDetails().stream()
                .map(cartDetail -> cartDetail.getProductVariant().getPrice().multiply(BigDecimal.valueOf(cartDetail.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalPrice(totalPrice);
    }

    public boolean isOutOfStock(Integer productId, Integer productVariantId, Integer needQuantity) {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isPresent()) {
            Optional<ProductVariants> searchedProductVariant = product.get().getProductVariants().stream()
                    .filter(productVariants -> productVariants.getId().equals(productVariantId))
                    .findFirst();

            if (searchedProductVariant.isPresent()) {
                return searchedProductVariant.get().getStock() < needQuantity;
            } else {
                throw new IllegalArgumentException("Không tìm thấy biến thể sản phẩm");
            }

        } else {
            throw new IllegalArgumentException("Không tìm thấy sản phẩm");
        }
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

    public ResponseCartDTO increaseCartDetail(Integer productId, Integer productVariantId, User user, Integer quantity) {

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giỏ hàng"));

        CartDetail cartDetail = cartDetailRepository.findByProductIdAndCartIdAndAndProductVariantId(productId, cart.getId(), productVariantId)
                .orElseGet(() -> initCartDetail(productId, productVariantId, user).getCartDetails().get(0));

        if (isOutOfStock(productId, productVariantId, quantity)) {
            throw new IllegalArgumentException("Sản phẩm đã hết hàng");
        }

        cartDetail.setQuantity(quantity);
        cartDetailRepository.save(cartDetail);

        recalculateCart(cart);
        cartRepository.save(cart);

        return cartMapper.toCartDTO(cart);
    }

    public ResponseCartDTO decreaseCartDetail(Integer productId, Integer productVariantId, User user, Integer quantity) {

        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giỏ hàng"));

        CartDetail cartDetail = cartDetailRepository.findByProductIdAndCartIdAndAndProductVariantId(productId, cart.getId(), productVariantId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy chi tiết giỏ hàng"));

        if (isOutOfStock(productId, productVariantId, quantity)) {
            throw new IllegalArgumentException("Sản phẩm đã hết hàng");
        }

        cartDetail.setQuantity(quantity);
        cartDetailRepository.save(cartDetail);

        recalculateCart(cart);
        cartRepository.save(cart);

        return cartMapper.toCartDTO(cart);
    }

    public ResponseCartDTO deleteCartDetail(Integer productId, Integer productVariantId, User user) {
        Cart cart = cartRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giỏ hàng"));

        CartDetail cartDetail = cartDetailRepository.findByProductIdAndCartIdAndAndProductVariantId(productId, cart.getId(), productVariantId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy chi tiết giỏ hàng"));

        cartDetailRepository.delete(cartDetail);

        recalculateCart(cart);
        cartRepository.save(cart);

        return cartMapper.toCartDTO(cart);
    }
}
