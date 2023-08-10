import { LightningElement } from 'lwc';

export default class AccountSearchForm extends LightningElement {
    searchtext='';
    accountNameChangeHandler(event){
        this.searchtext = event.target.value;
    }
    searchClickHandler(){
        const custEvent = new CustomEvent('searchaccount',
        {
            detail: this.searchtext
        });
        this.dispatchEvent(custEvent);
    }
}