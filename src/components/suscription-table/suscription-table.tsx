import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'suscription-table',
  styleUrl: 'suscription-table.css',
  shadow: true
})
export class SuscriptionTable {

  plans = {
    standar: {
      price: 9.9
    },
    advance: {
      price: 19.90
    },
    premium: {
      price: 29.90
    }
  }

  @State() monthlyBilling: boolean = true

  togglingBillingMonthly(value) {
    this.monthlyBilling = value
  }

  co() {
    const TwoCoInlineCart = window['TwoCoInlineCart']
    TwoCoInlineCart.setup.setMerchant('250139456036'); // meter en variables de entorno

    TwoCoInlineCart.products.add({
      code: 'standardM', // codigo de producto
      quantity: 1 //siempre 1

    }); // add products to cart

    TwoCoInlineCart.billing.setData({
      email: 'cabeza2@gmail.com', // debe tomar el mail que tenemos en el registro del usuario
      name: 'John Doe' // debe tomar el nombre que tenemos en el registro del usuario
    });

    TwoCoInlineCart.cart.setLanguage('es'); //poner el lenguaje que tengamos del cliente o 'us' por default

    /*  TwoCoInlineCart.cart.setReturnMethod({ //dejar comentado por ahora
             Type: 'HEADER_REDIRECT',
             URL: 'https://chatboxbackdev.mybluemix.net/dashboard'
         });  */

    TwoCoInlineCart.cart.setCurrency('USD'); //siempre USD
    TwoCoInlineCart.cart.setOrderExternalRef('1231231'); //colocar el USERID
    TwoCoInlineCart.cart.setExternalCustomerReference('123extern'); 

    TwoCoInlineCart.cart.checkout();
  }

  componentWillLoad() {
    const src = 'https://secure.avangate.com/checkout/client/twoCoInlineCart.js'
    const libName = 'TwoCoInlineCart'
    const config = {
      'app': { 'merchant': '250139456036' }, 'cart': { 'host': 'https:\/\/secure.2checkout.com', 'customization': 'inline' }
    }
    var script = document.createElement('script');
    script.src = src;
    script.async = true;
    var firstScriptElement = document.getElementsByTagName('script')[0];
    script.onload = function () {
      for (var namespace in config) {
        if (config.hasOwnProperty(namespace)) {
          window[libName].setup.setConfig(namespace, config[namespace]);
        }
      }
      window[libName].register();
    };
    firstScriptElement.parentNode.insertBefore(script, firstScriptElement);

  }

  calculatePrice(plan) {
    return this.monthlyBilling ? plan.price : (plan.price * 12) / 1.20
  }

  render() {
    return <div class=' flex container mx-auto font-sans font-light text-sm'>
      <div class=''>
        <button onClick={() => this.togglingBillingMonthly(true)}>Monthly</button>
        <button onClick={() => this.togglingBillingMonthly(false)}>Annualy</button>
      </div>
      <div class='flex-1  text-gray-700 text-center  p-2 m-1 rounded-lg shadow-md'>
        Features
        <p class='text-left'>Price</p>
        <p class='text-left'>Feature 1</p>
        <p class='text-left'>Feature 2</p>
        <p class='text-left'>Feature 3</p>
        <p class='text-left'>Feature 4</p>
        <p class='text-left'>Feature 5</p>
        <p class='text-left'>Feature 6</p>
        <p class='text-left'>Feature 7</p>
        <p class='text-left'>Feature 8</p>
        <p class='text-left'>Feature 9</p>
      </div>
      <div class='flex-1  text-gray-700 text-center  p-2 m-1  rounded-lg shadow-md'>
        Standar
        <div> USD {this.calculatePrice(this.plans.standar)}</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <button onClick={() => this.co()}>Subscribe</button>
      </div>
      <div class='flex-1 text-gray-700 text-center  p-2 m-1  rounded-lg shadow-md'>
        Advance
        <div> USD {this.calculatePrice(this.plans.advance)}</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <button>Subscribe</button>
      </div>
      <div class='flex-1 text-gray-700 text-center  p-2 m-1  rounded-lg shadow-md'>
        Premium
        <div> USD {this.calculatePrice(this.plans.premium)}</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <div> SI</div>
        <button>Subscribe</button>
      </div>
    </div>
  }
}
