import { LightningElement, api } from 'lwc';

export default class ViewRecord extends LightningElement {

    @api recordId;
    @api objectApiName;

}