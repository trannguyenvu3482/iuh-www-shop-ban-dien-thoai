package com.fit.se.app.service;

import com.fit.se.app.common.constant.VnPayConstant;
import com.fit.se.app.common.util.VnPayUtil;
import com.fit.se.app.dto.request.RequestOrderDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class PaymentService {
    public Map<String, Object> createOrder(HttpServletRequest request, RequestOrderDTO requestOrderDTO) throws UnsupportedEncodingException {

        Map<String, Object> payload = new HashMap<>() {{
            put("vnp_Version", VnPayConstant.VNP_VERSION);
            put("vnp_Command", VnPayConstant.VNP_COMMAND_ORDER);
            put("vnp_TmnCode", VnPayConstant.VNP_TMN_CODE);
            put("vnp_Amount", String.valueOf(requestOrderDTO.getAmount() * 100));
            put("vnp_CurrCode", VnPayConstant.VNP_CURRENCY_CODE);
            put("vnp_TxnRef", VnPayUtil.getRandomNumber(8));
            put("vnp_OrderInfo", requestOrderDTO.getOrderInfo());
            put("vnp_OrderType", VnPayConstant.ORDER_TYPE);
            put("vnp_Locale", VnPayConstant.VNP_LOCALE);
            put("vnp_ReturnUrl", VnPayConstant.VNP_RETURN_URL);
            put("vnp_IpAddr", VnPayUtil.getIpAddress(request));
            put("vnp_CreateDate", VnPayUtil.generateDate(false));
            put("vnp_ExpireDate", VnPayUtil.generateDate(true));
        }};

        String queryUrl = getQueryUrl(payload).get("queryUrl")
                + "&vnp_SecureHash="
                + VnPayUtil.hmacSHA512(VnPayConstant.SECRET_KEY, getQueryUrl(payload).get("hashData"));

        String paymentUrl = VnPayConstant.VNP_PAY_URL + "?" + queryUrl;
        payload.put("redirect_url", paymentUrl);

        return payload;
    }

    private Map<String, String> getQueryUrl(Map<String, Object> payload) throws UnsupportedEncodingException {

        List<String> fieldNames = new ArrayList<>(payload.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {

            String fieldName = itr.next();
            String fieldValue = (String) payload.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {

                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));

                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                if (itr.hasNext()) {

                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        return new HashMap<>() {{
            put("queryUrl", query.toString());
            put("hashData", hashData.toString());
        }};
    }
}
