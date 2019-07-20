const Razorpay = require('razorpay')

const instance = new Razorpay({
    key_id: 'RAZORPAY_KEY',
    key_secret: 'RAZORPAY_SECRET',
  });

const rzpCreateOrder = async(amount, currency='INR', receipt='receipt note', notes=null) => {
   
    const order = await instance.orders.create({amount, currency, receipt, payment_capture: true, notes: {notes}})
    // do something with the data how about inserting in database

    if(!order){
        throw 'unable to create order object'
    }
    return order.id;
}

const rzpCreatePayment = async(payment_id) => {
    const payment = await instance.payment.fetch(payment_id).catch(err=>{throw err})
    if (payment){
        // do something with the data how about inserting in database
        if(!orderOb){
            throw 'unable to update order'
        }
        return orderOb;
    }
}

const rzpOrderPaid = async (payment_entity, order_entity) => {
    payment_id = payment_entity.id;
    order_id = order_entity.id;

    // check if the payment object exists; you can remove this check.
    const paymentOb = await instance.payments.fetch(payment_id).catch(err=>{throw err})
    if (paymentOb){
        // do something with data how about updating the database?
        return orderOb;
    }
}


const rzpPaymentCaptured = async (payment_entity) => {
    payment_id = payment_entity.id;
    order_id = payment_entity.order_id;
    // check if the payment object exists or do something; you can remove this check.
    const paymentOb = await instance.payments.fetch(payment_id).catch(err=>{throw err})
    if (paymentOb){
        // do something with data how about updating the database or sending out some notification?
        return orderOb;
    }
}

const rzpPaymentFailed = async (payment_entity) => {
    payment_id = payment_entity.id;
    order_id = payment_entity.order_id;
    // check if the payment object exists; you can remove this check.
    const paymentOb = await instance.payments.fetch(payment_id).catch(err=>{throw err})
    if (paymentOb){
        // do something with data how about updating the database or sending out some notification?
        return orderOb;
    }
}

module.exports = {
    rzpCreateOrder,
    rzpCreatePayment,
    rzpOrderPaid,
    rzpPaymentCaptured,
    rzpPaymentFailed
}
