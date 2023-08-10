import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {

    handleSimpleEvent(event){
        //const msg = event.detail.msg;
        //const message = event.detail.message;
        //alert("Message: "+message+"\nChild: "+msg);
        alert('Message: '+event.target.message);
    }

    handleClick(){
        this.template.querySelector('c-child-comp').childMethod();
    }
}