import { LightningElement, wire, api, track } from 'lwc';
import fetchLWCPracticalRecord from '@salesforce/apex/fetchDeleteRecords.fetchLWCPracticalRecord';
import deleteMultipleRecord from '@salesforce/apex/fetchDeleteRecords.deleteMultipleRecord';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import DeleteChannel from '@salesforce/messageChannel/DeleteChannel__c';
import {publish, MessageContext} from 'lightning/messageService'

export default class FetchRecords extends LightningElement {
    @wire(MessageContext)
    messageContext;
    message;

    @api  columns =[
        { label: 'Name', fieldName: 'Name', type:'text'}     
    ];

    connectedCallback(){
        this.setTimeInterval = setInterval(() => {
            return refreshApex(this.wireLWCPrac)
        },2000)
    }
 
    @wire (fetchLWCPracticalRecord) wireLWCPrac;
 
    @api selectedLWCPractIdList=[];
    @track errorMsg;
 
 
    getSelectedIdAction(event){
        const selectedLWCpracRows = event.detail.selectedRows;
        window.console.log('selectedLWCpracRows# ' + JSON.stringify(selectedLWCpracRows));
        this.selectedLWCpracRows=[];
        
        for (let i = 0; i<selectedLWCpracRows.length; i++){
            this.selectedLWCPractIdList.push(selectedLWCpracRows[i].Id);
        }
        publish(this.messageContext,DeleteChannel, selectedLWCpracRows);
    }
  
   
    deleteSelectedRowAction(){
        deleteMultipleRecord({lpObj:this.selectedLWCPractIdList})
        .then(()=>{
            this.template.querySelector('lightning-datatable').selectedLWCpracRows=[];
 
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record deleted successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);
 
            return refreshApex(this.wireLWCPrac);
        })
        .catch(error =>{
            this.errorMsg =error;
            window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
        });
    }
}