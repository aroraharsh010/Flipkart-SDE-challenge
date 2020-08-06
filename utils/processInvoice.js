const lines = [
    {
      price: 18301.68,
      rate: 247.32,
      desc: 'DUMMY PRODUCT FOR EVALUATION',
      gstRate: 12,
      qty: 74,
      pid: 94054090,
    },
    {
      price: 24732.00,
      rate: 494.64,
      desc: 'DUMMY PRODUCT FOR EVALUATION',
      gstRate: 12,
      qty: 50,
      pid: 94054090,
    },
    {
      price: 26964.50,
      rate: 539.29,
      desc: 'DUMMY PRODUCT FOR EVALUATION',
      gstRate: 12,
      qty: 50,
      pid: 94054090,
    },
    {
      price: 19953.36,
      rate: 269.64,
      desc: 'DUMMY PRODUCT FOR EVALUATION',
      gstRate: 12,
      qty: 74,
      pid: 94054090,
    },
    {
      price: 49464.50,
      rate: 989.29,
      desc: 'DUMMY PRODUCT FOR EVALUATION',
      gstRate: 12,
      qty: 50,
      pid: 94054090,
    },
];

const invoicePL = {
    cName:'VIRTUALCOMPANYIND',
    cAddress:'VirtualAddr, 255.0.0.0, India',
    cEmail:'abc@gmail.com',
    cGstIn:'17ABCDEF123GXYZ',
    date: '1/7/2017',
    invoice_number: '1234',
    amount: 156146,
    lines: lines,
};
module.exports.getInvoice = () =>{
    return invoicePL;
};
