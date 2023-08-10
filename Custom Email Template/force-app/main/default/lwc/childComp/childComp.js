import { LightningElement, api, track } from 'lwc';

export default class ChildComp extends LightningElement {

    @api message
    @track date = new Date();

    @api 
    childMethod(){
        this.date = new Date();
    }

    handleEvent(){
        const eventS = new CustomEvent('simple',
        {
            //detail: {message: this.message, msg: "Hi There"}
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(eventS);
    }
}