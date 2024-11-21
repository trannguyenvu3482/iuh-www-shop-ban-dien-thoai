package com.fit.se.app.service;

import com.fit.se.app.common.constant.VnPayConstant;
import com.fit.se.app.common.util.VnPayUtil;
import com.fit.se.app.dto.request.OrderStatusRequestDTO;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@Service
public class PaymentStatusService {
    public Map<String, Object> getStatus(HttpServletRequest request, OrderStatusRequestDTO statusRequestDTO) throws IOException {

        JSONObject statusQuery = new JSONObject();

        statusQuery.put("vnp_RequestId", VnPayUtil.getRandomNumber(8));
        statusQuery.put("vnp_Version", VnPayConstant.VNP_VERSION);
        statusQuery.put("vnp_Command", VnPayConstant.VNP_COMMAND_STATUS);
        statusQuery.put("vnp_TmnCode", VnPayConstant.VNP_TMN_CODE);
        statusQuery.put("vnp_TxnRef", statusRequestDTO.getOrderId());
        statusQuery.put("vnp_OrderInfo", statusRequestDTO.getOrderInfo());
        statusQuery.put("vnp_TransactionNo", statusRequestDTO.getTransactionNo());
        statusQuery.put("vnp_TransDate", statusRequestDTO.getTransDate());
        statusQuery.put("vnp_CreateDate", VnPayUtil.generateDate(false));
        statusQuery.put("vnp_IpAddr", VnPayUtil.getIpAddress(request));
        statusQuery.put("vnp_Amount", String.valueOf(statusRequestDTO.getAmount()));
        statusQuery.put("vnp_BankCode", VnPayConstant.VNP_BANK_CODE);
        statusQuery.put("vnp_ResponseCode", VnPayConstant.VNP_RESPONSE_CODE); //success status
        statusQuery.put("vnp_TransactionStatus", VnPayConstant.VNP_TRANSACTION_STATUS);

        String hashData = String.join("|"
                , statusQuery.get("vnp_RequestId").toString()
                , statusQuery.get("vnp_Version").toString()
                , statusQuery.get("vnp_Command").toString()
                , statusQuery.get("vnp_TmnCode").toString()
                , statusQuery.get("vnp_TxnRef").toString()
                , statusQuery.get("vnp_TransDate").toString()
                , statusQuery.get("vnp_TransactionNo").toString()
                , statusQuery.get("vnp_CreateDate").toString()
                , statusQuery.get("vnp_IpAddr").toString()
                , statusQuery.get("vnp_OrderInfo").toString()
                , statusQuery.get("vnp_BankCode").toString()
                , statusQuery.get("vnp_ResponseCode").toString() //success status
                , statusQuery.get("vnp_Amount").toString()
                , statusQuery.get("vnp_TransactionStatus").toString());

        String vnpSecureHash = VnPayUtil.hmacSHA512(VnPayConstant.SECRET_KEY, hashData);
        statusQuery.put("vnp_SecureHash", vnpSecureHash);

        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(VnPayConstant.VNP_API_URL);

        StringEntity stringEntity = new StringEntity(statusQuery.toString());
        post.setHeader("content-type", "application/json");
        post.setEntity(stringEntity);

        CloseableHttpResponse res = client.execute(post);
        BufferedReader rd = new BufferedReader(new InputStreamReader(res.getEntity().getContent()));
        StringBuilder resultJsonStr = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {

            resultJsonStr.append(line);
        }

        JSONObject object = new JSONObject(resultJsonStr.toString());
        Map<String, Object> result = new HashMap<>();
        for (Iterator<String> it = object.keys(); it.hasNext(); ) {

            String key = it.next();
            result.put(key, object.get(key));
        }

        return result;
    }
}
