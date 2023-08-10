import { LightningElement, wire, api , track} from 'lwc';
import getOpps from '@salesforce/apex/GetAllOpportunities.getOpps';

export default class WiredMethod extends LightningElement {
    @api records
    @api errors
    @track stgName
    @wire(getOpps, {
        stg: '$stgName'
    }) 
    allOpportunities({data,error}){
        if(data){
            this.records = data;
            console.log('Data: ',JSON.stringify(this.records))
        }
        if(error){
            this.errors = error;
        }
    };

    handleChange(event){
        this.stgName = event.target.value;
    }
}