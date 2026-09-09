const express = require("express");
const router = express.Router();
const SSLCommerzPayment = require("sslcommerz-lts");
const Order = require("../Models/Order");

// ==================== SSLCommerz Config ====================

const store_id = process.env.SSLCZ_STORE_ID;
const store_passwd = process.env.SSLCZ_STORE_PASSWORD;
const is_live = process.env.SSLCZ_IS_LIVE === "true";

// ==================== Payment শুরু করা ====================

router.post("/initiate", async (req, res) => {
  try {
    const { orderId } = req.body;

    console.log("======================================");
    console.log("Payment Initiation Started");
    console.log("Order ID:", orderId);
    console.log("======================================");

    // Order খুঁজে বের করা
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order পাওয়া যায়নি",
      });
    }

    console.log("Order Found:", order);

    // Amount calculate
    const totalAmount =
      parseFloat(order.product.price) * order.quantity;

    console.log("Total Amount:", totalAmount);

    // ==================== SSLCommerz Data ====================

    const data = {
      total_amount: totalAmount,
      currency: "BDT",

      // Order ID = Transaction ID
      tran_id: order._id.toString(),

      // ==================== URLs ====================

      success_url: `http://localhost:5000/api/payment/success/${order._id}`,

      fail_url: `http://localhost:5000/api/payment/fail/${order._id}`,

      cancel_url: `http://localhost:5000/api/payment/cancel/${order._id}`,

      ipn_url: `http://localhost:5000/api/payment/ipn`,

      // ==================== Product ====================

      shipping_method: "Courier",

      product_name: order.product.name,

      product_category: "General",

      product_profile: "general",

      // ==================== Customer ====================

      cus_name: order.customerInfo.name,

      cus_email: "customer@example.com",

      cus_add1: order.customerInfo.address,

      cus_city: "Dhaka",

      cus_postcode: "1000",

      cus_country: "Bangladesh",

      cus_phone: order.customerInfo.phone,

      // ==================== Shipping ====================

      ship_name: order.customerInfo.name,

      ship_add1: order.customerInfo.address,

      ship_city: "Dhaka",

      ship_postcode: "1000",

      ship_country: "Bangladesh",
    };

    console.log("========== SSL DATA ==========");
    console.log(data);
    console.log("==============================");

    // ==================== SSLCommerz Instance ====================

    console.log("Store ID exists:", !!store_id);
    console.log("Store Password exists:", !!store_passwd);
    console.log("Is Live:", is_live);

    const sslcz = new SSLCommerzPayment(
      store_id,
      store_passwd,
      is_live
    );

    // ==================== SSLCommerz Init ====================

    const apiResponse = await sslcz.init(data);

    console.log("======================================");
    console.log("SSLCommerz FULL RESPONSE");
    console.log(JSON.stringify(apiResponse, null, 2));
    console.log("======================================");

    // ==================== Gateway URL Check ====================

    if (
      !apiResponse ||
      !apiResponse.GatewayPageURL
    ) {
      console.error(
        "❌ SSLCommerz GatewayPageURL পাওয়া যায়নি"
      );

      return res.status(500).json({
        message: "SSLCommerz payment initialization failed",
        sslResponse: apiResponse,
      });
    }

    // ==================== Success ====================

    console.log(
      "✅ Payment Gateway URL:",
      apiResponse.GatewayPageURL
    );

    res.json({
      url: apiResponse.GatewayPageURL,
    });

  } catch (err) {
    console.error("❌ Payment Error:");
    console.error(err);

    res.status(500).json({
      message: err.message || "Payment শুরু করতে সমস্যা হয়েছে",
    });
  }
});

// ==================== Payment সফল হলে ====================

router.post("/success/:orderId", async (req, res) => {
  try {
    console.log("Payment Success:", req.params.orderId);

    await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        paymentStatus: "Paid",
        status: "Confirmed",
        transactionId:
          req.body.tran_id || req.params.orderId,
      }
    );

    // Frontend Success Page
    res.redirect(
      `http://localhost:5173/order-success?orderId=${req.params.orderId}`
    );

  } catch (err) {
    console.error("Success Handler Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ==================== Payment ব্যর্থ হলে ====================

router.post("/fail/:orderId", async (req, res) => {
  try {
    console.log("Payment Failed:", req.params.orderId);

    await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        paymentStatus: "Failed",
      }
    );

    res.redirect(
      `http://localhost:5173/payment-failed?orderId=${req.params.orderId}`
    );

  } catch (err) {
    console.error("Fail Handler Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ==================== Payment Cancel করলে ====================

router.post("/cancel/:orderId", async (req, res) => {
  try {
    console.log("Payment Cancelled:", req.params.orderId);

    res.redirect(
      "http://localhost:5173/checkout"
    );

  } catch (err) {
    console.error("Cancel Handler Error:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ==================== IPN ====================

router.post("/ipn", async (req, res) => {
  try {
    console.log("========== IPN RECEIVED ==========");
    console.log(req.body);
    console.log("===================================");

    // পরে এখানে payment validation করা যাবে

    res.sendStatus(200);

  } catch (err) {
    console.error("IPN Error:", err);

    res.sendStatus(500);
  }
});

module.exports = router;