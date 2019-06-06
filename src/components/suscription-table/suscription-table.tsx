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
    TwoCoInlineCart.setup.setMerchant('250163802451'); // meter en variables de entorno

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
      <div class='flex-1  text-gray-700 text-center box1'>
        <p class='text-4xl plan_name pt-4  pt-4'>Free</p>
        <div class='price text-4xl  pt-4'> $0</div>
        <div class="border-b  pt-4 pb-1"> por mes</div>
        <div class="border-b pt-4 pb-1"> <p>Periodo de pruebas</p><p  class='uppercase pt-1 font-bold'>Ilimitado</p></div>
        <div  class="border-b pt-4 pb-1" > Mensajes/Mes <span  class='uppercase pt-1 font-bold'> 500 </span></div>
        <div class="border-b pt-4 pb-1"> Chatbot Widgets <p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1"> Watson Assistant (IBM)  </div>
        <div class="border-b pt-4 pb-1"> Dialogflow (Google)</div>
        <div class="border-b pt-4 pb-1"> Lex (AWS)</div>
        <div class="border-b pt-4 pb-1"> Qna (Microsoft) </div>
        <div class="border-b pt-4 pb-1"> Web / Mobile Chatbot</div>
        <div class="border-b pt-4 pb-1">Soporte  <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Widgets/website<p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1">Analytics (prox.) <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Colaboración  <span  class='uppercase pt-1 font-bold'> X</span></div>
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' onClick={() => this.co()}>Subscribe</button>
      </div>
      <div class='flex-1  text-gray-700 text-center box2'>
        <p class='text-4xl plan_name  pt-4'>Standar</p>
        <div class='price text-4xl pt-4'> $ {this.calculatePrice(this.plans.standar)}</div>
        <div class="border-b pt-4"> por mes</div>
        <div class="border-b pt-4 pb-1"> <p>Periodo de pruebas</p><p  class='uppercase pt-1 font-bold'>Ilimitado</p></div>
        <div  class="border-b pt-4 pb-1" > Mensajes/Mes <span  class='uppercase pt-1 font-bold'> 500 </span></div>
        <div class="border-b pt-4 pb-1"> Chatbot Widgets <p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1"> Watson Assistant (IBM)  </div>
        <div class="border-b pt-4 pb-1"> Dialogflow (Google)</div>
        <div class="border-b pt-4 pb-1"> Lex (AWS)</div>
        <div class="border-b pt-4 pb-1"> Qna (Microsoft) </div>
        <div class="border-b pt-4 pb-1"> Web / Mobile Chatbot</div>
        <div class="border-b pt-4 pb-1">Soporte  <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Widgets/website<p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1">Analytics (prox.) <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Colaboración  <span  class='uppercase pt-1 font-bold'> X</span></div>
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' onClick={() => this.co()}>Subscribe</button>
      </div>
      <div class='flex-1 text-gray-700 text-center box3 '>
        <p class='text-4xl plan_name  pt-4'>Advance</p>
        <div class='text-4xl price pt-4'> $ {this.calculatePrice(this.plans.advance)}</div>
        <div  class="border-b pt-4"> por mes</div>
        <div class="border-b pt-4 pb-1"> <p>Periodo de pruebas</p><p  class='uppercase pt-1 font-bold'>Ilimitado</p></div>
        <div  class="border-b pt-4 pb-1" > Mensajes/Mes <span  class='uppercase pt-1 font-bold'> 500 </span></div>
        <div class="border-b pt-4 pb-1"> Chatbot Widgets <p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1"> Watson Assistant (IBM)  </div>
        <div class="border-b pt-4 pb-1"> Dialogflow (Google)</div>
        <div class="border-b pt-4 pb-1"> Lex (AWS)</div>
        <div class="border-b pt-4 pb-1"> Qna (Microsoft) </div>
        <div class="border-b pt-4 pb-1"> Web / Mobile Chatbot</div>
        <div class="border-b pt-4 pb-1">Soporte  <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Widgets/website<p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1">Analytics (prox.) <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Colaboración  <span  class='uppercase pt-1 font-bold'> X</span></div>
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' onClick={() => this.co()}>Subscribe</button>
      </div>
      <div class='flex-1 text-gray-700 text-center box4'>
        <p class='text-4xl plan_name  pt-4'>Premium</p>
        <div  class='text-4xl price pt-4'> $ {this.calculatePrice(this.plans.premium)}</div>
        <div class="border-b pt-4"> por mes</div>
        <div class="border-b pt-4 pb-1"> <p>Periodo de pruebas</p><p  class='uppercase pt-1 font-bold'>Ilimitado</p></div>
        <div  class="border-b pt-4 pb-1" > Mensajes/Mes <span  class='uppercase pt-1 font-bold'> 500 </span></div>
        <div class="border-b pt-4 pb-1"> Chatbot Widgets <p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1"> Watson Assistant (IBM)  </div>
        <div class="border-b pt-4 pb-1"> Dialogflow (Google)</div>
        <div class="border-b pt-4 pb-1"> Lex (AWS)</div>
        <div class="border-b pt-4 pb-1"> Qna (Microsoft) </div>
        <div class="border-b pt-4 pb-1"> Web / Mobile Chatbot</div>
        <div class="border-b pt-4 pb-1">Soporte  <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Widgets/website<p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1">Analytics (prox.) <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Colaboración  <span  class='uppercase pt-1 font-bold'> X</span></div>
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' onClick={() => this.co()}>Subscribe</button>
      </div>
      <div class='flex-1 text-gray-700 text-center box5'>
        <p class='text-4xl plan_name  pt-4'>Enterprice</p>
        <div  class='text-4xl price pt-4'> CUSTOM</div>
        <div class="border-b pt-4"> por mes</div>
        <div class="border-b pt-4 pb-1"> <p>Periodo de pruebas</p><p  class='uppercase pt-1 font-bold'>Ilimitado</p></div>
        <div  class="border-b pt-4 pb-1" > Mensajes/Mes <span  class='uppercase pt-1 font-bold'> 500 </span></div>
        <div class="border-b pt-4 pb-1"> Chatbot Widgets <p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1"> Watson Assistant (IBM)  </div>
        <div class="border-b pt-4 pb-1"> Dialogflow (Google)</div>
        <div class="border-b pt-4 pb-1"> Lex (AWS)</div>
        <div class="border-b pt-4 pb-1"> Qna (Microsoft) </div>
        <div class="border-b pt-4 pb-1"> Web / Mobile Chatbot</div>
        <div class="border-b pt-4 pb-1">Soporte  <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Widgets/website<p class='uppercase pt-1 font-bold'>ilimitado</p></div>
        <div class="border-b pt-4 pb-1">Analytics (prox.) <span  class='uppercase pt-1 font-bold'> BÁSICO</span></div>
        <div class="border-b pt-4 pb-1">Colaboración  <span  class='uppercase pt-1 font-bold'> X</span></div>
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' onClick={() => this.co()}>Subscribe</button>
      </div>
    </div>
  }
}
