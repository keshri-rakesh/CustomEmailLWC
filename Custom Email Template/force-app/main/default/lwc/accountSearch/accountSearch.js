import { LightningElement } from 'lwc';

export default class AccountSearch extends LightningElement {
    searchtxt='';
    handleSearchAccount(event){
        this.searchtxt = event.detail;
    }
}