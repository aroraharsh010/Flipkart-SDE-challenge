import React, {Component} from 'react';
class Invoice extends Component {
    constructor(props) {
        super(props);
        if(props.location.aboutProps===undefined){
         window.alert("Bad requst, go back to dashboard");
         props.history.push("/");
         return;
        }
        this.state = {
            invoice: props.location.aboutProps.invoice,
         }
    }
    render() {
        return (
<div class="container">
   <div class="col-md-12">
      <div class="invoice">
         {/* <!-- begin invoice-header --> */}
         <div class="invoice-header">
            <div class="invoice-from">
               <address class="m-t-5 m-b-5">
        <strong class="text-inverse">{this.state.invoice.cName}</strong>
                  <br></br>
                  {this.state.invoice.cAddress}<br></br>
                  {this.state.invoice.cEmail}<br></br>
                  GST: {this.state.invoice.cGstIn}<br></br>
               </address>
            </div>
            <div class="invoice-date">
        <div class="date text-inverse m-t-5">{this.state.invoice.date}</div>
               <div class="invoice-detail">
               Invoice Number: {this.state.invoice.invoice_number}<br></br>
               </div>
            </div>
         </div>
         {/* <!-- end invoice-header -->
         <!-- begin invoice-content --> */}
         <div class="invoice-content">
            {/* <!-- begin table-responsive --> */}
            <div class="table-responsive">
               <table class="table table-invoice">
                  <thead>
                     <tr>
                        <th class="text-center" width="10%">Product ID</th>
                        <th class="text-center" width="20%">Description</th>
                        <th class="text-center" width="10%">GST rate%</th>
                        <th class="text-center" width="10%">Rate</th>
                        <th class="text-center" width="10%">Quantity</th>
                        <th class="text-right" width="10%">Total</th>
                     </tr>
                  </thead>
                  <tbody>
                  {this.state.invoice.lines.map((line, index) => (
                      <tr>
                      <td>
                  <span class="text-center">{line.pid}</span><br></br>
                      </td>
                  <td class="text-center">{line.desc}</td>
                  <td class="text-center">{line.gstRate}</td>
                  <td class="text-center">{line.rate}</td>
                  <td class="text-center">{line.qty}</td>
                  <td class="text-right">{line.price}</td>
                   </tr>
                  ))}
                  </tbody>
               </table>
            </div>
            {/* <!-- end table-responsive -->
            <!-- begin invoice-price --> */}
            <div class="invoice-price">
               <div class="invoice-price-left">
                  <div class="invoice-price-row">
                  </div>
               </div>
               <div class="invoice-price-right">
        <small>TOTAL</small> <span class="f-w-600">₹{this.state.invoice.amount}</span>
               </div>
            </div>
            {/* <!-- end invoice-price --> */}
         </div>
         {/* <!-- end invoice-footer --> */}
      </div>
   </div>
</div>
        );
    }
}

export default Invoice;