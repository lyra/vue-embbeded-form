import Vue from 'vue';
import EmptyForm from './components/EmptyForm.vue';
import LyraForm from '../src/index';
import cheerio from "cheerio";

const renderer = require('vue-server-renderer').createRenderer();

const setup = {
    clientDomain: 'https://krypton.purebilling.io',
    theme: "classic",
    publicKey: '69876357:testpublickey_DEMOPUBLICKEY95me92597fd28tGD4r5',
}

Vue.use(LyraForm, setup);

describe('Test suite for empty payment form', () => {
    it("Should render the configured form without fields if token is defined", done => {
        const ClonedComponent = Vue.extend(EmptyForm);
        const NewComponent = new ClonedComponent({
            data() {
                return {
                    formToken: "01O0xI6UfrRFKb7J9_G30R_Q18AeyJhIjo5OTAsIm0iOiJFVVIiLCJvIjoiZGVtby01YmM4NjhmYzQ0MDAyIiwiYyI6eyJiIjp7InZpIjp7ImYiOnsidmFkQ2FyZFR5cGUiOnsidmFsdWUiOiJWSVNBIn19fSwibWMiOnsiZiI6eyJ2YWRDYXJkVHlwZSI6eyJ2YWx1ZSI6Ik1BU1RFUkNBUkQifX19LCJhbSI6eyJmIjp7InZhZENhcmRUeXBlIjp7InZhbHVlIjoiQU1FWCJ9fX0sImNiIjp7ImYiOnsiZGViaXRDcmVkaXQiOnsidmFsdWUiOiJjcmVkaXQifX19fX196102",
                };
            },
        }).$mount();

        renderer.renderToString(NewComponent, (err, str) => {
            let $ = cheerio.load(str);

            // the form is rendered
            let $form = $(".kr-embedded");

            expect($form.length).toBe(1);
            expect($form.find(".kr-payment-button").length).toBe(1);

            done();
        });
    });

    it("Should not render the configured form if token is not defined", done => {
        const ClonedComponent = Vue.extend(EmptyForm);
        const NewComponent = new ClonedComponent({
        }).$mount();

        renderer.renderToString(NewComponent, (err, str) => {
            let $ = cheerio.load(str);

            // the form is rendered
            let $form = $(".kr-embedded");

            expect($form.length).toBe(0);

            done();
        });
    });
});

