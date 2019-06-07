import { Component, h, State, Prop } from '@stencil/core';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})



@Component({
  tag: 'suscription-table',
  styleUrl: 'suscription-table.css',
  shadow: true
})
export class SuscriptionTable {

  plans = {
    standar: {
      id: 'standard',
      price: 29.90
    },
    advance: {
      id: 'advance',
      price: 99.90
    },
    premium: {
      id: 'premium',
      price: 99.90
    }
  }

  @Prop() nickName: string 
  @Prop() email: string 
  @Prop() userId: string 
  @State() monthlyBilling: boolean = true

  

  togglingBillingMonthly(value) {
    this.monthlyBilling = value
  }

  

  
  co(plan) {

    if (!this.userId){
      window.location.href = 'https://devback.blahbox.net/auth'
      return
    }
    

    const TwoCoInlineCart = window['TwoCoInlineCart']
    TwoCoInlineCart.setup.setMerchant('250163802451'); // meter en variables de entorno

    //console.log(plan.id + (this.monthlyBilling ? 'M' : 'A'))
    TwoCoInlineCart.products.add({
      code: plan.id + (this.monthlyBilling ? 'M' : 'A') , // codigo de producto
      quantity: 1 //siempre 1
    }); // add products to cart

    
    TwoCoInlineCart.billing.setData({
      email: this.email, // debe tomar el mail que tenemos en el registro del usuario
      name: this.nickName // debe tomar el nombre que tenemos en el registro del usuario
    });

    TwoCoInlineCart.cart.setLanguage('es'); //poner el lenguaje que tengamos del cliente o 'us' por default

    /*  TwoCoInlineCart.cart.setReturnMethod({ //dejar comentado por ahora
             Type: 'HEADER_REDIRECT',
             URL: 'https://chatboxbackdev.mybluemix.net/dashboard'
         });  */

    TwoCoInlineCart.cart.setCurrency('USD'); //siempre USD
    TwoCoInlineCart.cart.setOrderExternalRef(this.userId); //colocar el USERID
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
        <div class="border-b  pt-4 pb-1"> {this.monthlyBilling ? 'por mes' : 'año'}</div>
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
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' >Join me</button>
      </div>
      <div class='flex-1  text-gray-700 text-center box2'>
        <p class='text-4xl plan_name  pt-4'>Standar</p>
        <div class='price text-4xl pt-4'> { formatter.format(this.calculatePrice(this.plans.standar))}</div>
        <div class="border-b pt-4">{this.monthlyBilling ? 'por mes' : 'año'}</div>
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
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' onClick={() => this.co(this.plans.standar)}>Subscribe</button>
      </div>
      <div class='flex-1 text-gray-700 text-center box3 '>
        <p class='text-4xl plan_name  pt-4'>Advance</p>
        <div class='text-4xl price pt-4'> {formatter.format(this.calculatePrice(this.plans.advance))}</div>
        <div  class="border-b pt-4"> {this.monthlyBilling ? 'por mes' : 'año'}</div>
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
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' onClick={() => this.co(this.plans.advance)}>Subscribe</button>
      </div>
      <div class='flex-1 text-gray-700 text-center box4'>
        <p class='text-4xl plan_name  pt-4'>Premium</p>
        <div  class='text-4xl price pt-4'> {formatter.format(this.calculatePrice(this.plans.premium))}</div>
        <div class="border-b pt-4"> {this.monthlyBilling ? 'por mes' : 'año'}</div>
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
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' onClick={() => this.co(this.plans.premium)}>Subscribe</button>
      </div>
      <div class='flex-1 text-gray-700 text-center box5'>
        <p class='text-4xl plan_name  pt-4'>Enterprise</p>
        <div  class='text-4xl price pt-4'> CUSTOM</div>
        <div class="border-b pt-4"> {this.monthlyBilling ? 'por mes' : 'año'}</div>
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
        <button class='border-2 mt-4 mb-8 px-6 py-4 uppercase border-black' >Contact Us</button>
      </div>
    </div>
  }
}
