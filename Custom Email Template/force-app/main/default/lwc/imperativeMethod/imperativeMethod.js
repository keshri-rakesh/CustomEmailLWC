import { LightningElement, track } from 'lwc';
import getOpps from '@salesforce/apex/GetAllOpportunities.getOpps';

export default class ImperativeMethod extends LightningElement {
    @track stg
    @track records
    @track error
    handleChange(event){
        const stgName = event.target.value;
        getOpps({
            stg: stgName
        })
        .then(result => {
            console.log('Opp Records: ',JSON.stringify(result.data))
            this.records = result;
        })
        .catch(error => {
            console.log('Error: ',error);
            this.error = error;
        })
    }
}