const {rzpCreateOrder, rzpOrderPaid, rzpCreatePayment, rzpPaymentCaptured, rzpPaymentFailed} = require('./services/razorpayService')


  const createOrder = async (event) => {
    const eventData = JSON.parse(event.body);
    const {amount, currency, receipt} = eventData
    if (!(amount && currency && receipt)){
      throw('invalid request')
    }
    const order = await rzpCreateOrder(amount, currency, receipt)
    if(!order){
      throw('error occured while creating order')
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        order,
      }, null, 2),
    };
  };
  
  const createPayment = async (event) => {
    const eventData = JSON.parse(event.body);
    const res = {}
    const {orderId, paymentId, userId, amount, currency} = eventData.paymentId
    const order = await rzpCreatePayment(orderId, paymentId, userId, amount, currency)
    return {
      statusCode: 200,
      body: JSON.stringify({
        order,
      }, null, 2),
    };
  };

const webhooks = async(event) => {
  // handle webhooks for razorpay
  try{
    const eventData = JSON.parse(event.body);
    let res = {}
    console.log(eventData.event)
    console.log(eventData)
    let paymentOb = null
    switch(eventData.event){
      case "order.paid":
        paymentOb = eventData.payload.payment.entity
        const orderOb =  eventData.payload.order.entity
        res  = rzpOrderPaid(paymentOb, orderOb)
        break
      case "payment.failed":
        paymentOb = eventData.payload.payment.entity
        res = rzpPaymentFailed(paymentOb)
        break
      case "payment.captured":
        paymentOb = eventData.payload.payment.entity
        res = rzpPaymentCaptured(paymentOb)
        break
      default: 
        res.status = 'unable to process webhook'
        break
    }
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch(e){
    console.log(e);
    throw e
  }

}

module.exports = {
  createOrder,
  createPayment,
  webhooks
}