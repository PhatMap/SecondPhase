const { url } = require("inspector");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      client_secret: paymentIntent.client_secret,
    });
  } catch (error) {
    next(error);
  }
});

exports.sendStripeApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

exports.momoPayment = catchAsyncErrors(async (req, res, next) => {
  try {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    const { totalPrice } = req.body;
    var partnerCode = "MOMO";
    var accessKey = "F8BBA842ECF85";
    var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = "pay with MoMo";
    var redirectUrl = "localhost:4000/api/v1/success";
    var ipnUrl =
      "https://marmot-joint-nominally.ngrok-free.app/api/v1/momoCallback";
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = totalPrice;
    var requestType = "captureWallet";
    var extraData = ""; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature
    var signature = crypto
      .createHmac("sha256", secretkey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: "en",
    });

    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "content-length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };

    let result;

    try {
      result = await axios(options);
      return res.status(200).json(result.data);
    } catch (error) {
      return res
        .status(500)
        .json({ statusCode: 500, message: "Internal server error" });
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("MoMo API error:", error.response.data);
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response from MoMo API:", error.request);
      res.status(500).json({ error: "No response from payment server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error in processMoMo:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});


exports.momoCallback = catchAsyncErrors(async (req, res, next) => {
  console.log("req.body", req.body);

  return res.status(200).json(req.body);
});


exports.momoCheckStatus = catchAsyncErrors(async (req, res, next) => {
  const { orderId } = req.body;

  var accessKey = "F8BBA842ECF85";
  var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: "MOMO",
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "en",
  });

  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  const result = await axios(options);

  return res.status(200).json(result.data);
});
