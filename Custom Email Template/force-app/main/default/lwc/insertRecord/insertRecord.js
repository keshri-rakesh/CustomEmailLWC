import { LightningElement, track, wire, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/LWC_Practical__c.Name';
import PHONE_FIELD from '@salesforce/schema/LWC_Practical__c.Phone__c';
import EMAIL_FIELD from '@salesforce/schema/LWC_Practical__c.Email__c';
import lwcpracRecMethod from '@salesforce/apex/createLWCPracHelper.lwcpracRecMethod';
import deleteMultipleRecord from '@salesforce/apex/fetchDeleteRecords.deleteMultipleRecord';
import fetchLWCPracticalRecord from '@salesforce/apex/fetchDeleteRecords.fetchLWCPracticalRecord';
import { refreshApex } from '@salesforce/apex';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { subscribe, MessageContext } from "lightning/messageService";
import DeleteChannel from '@salesforce/messageChannel/DeleteChannel__c';

export default class InsertRecord extends LightningElement {
    @wire(MessageContext)
    messageContext;
    
    receivedMessage='';
    subscription = null;

    @track name = NAME_FIELD;
    @track phone = PHONE_FIELD;
    @track email = EMAIL_FIELD;

    @api selectedLWCPractIdList=[];
    @track errorMsg;
    @wire (fetchLWCPracticalRecord) wireLWCPrac;

    connectedCallback() {
        this.handleSubscribe();
    }

    recLWCPractical = {

        Name : this.name,
        Phone__c : this.phone,
        Email__c : this.email
    }

    handleSubscribe(){
        console.log("in handle subscribe");
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(
            this.messageContext,
            DeleteChannel,
            (selectedLWCpracRows) => {
              this.handleMessage(selectedLWCpracRows);
            }
          );
    }

    deleteSelectedRowAction(){
        console.log('inside delete method')
        deleteMultipleRecord({lpObj:this.selectedLWCPractIdList})
        .then(()=>{
            if (this.subscription) {
                const toastEvent = new ShowToastEvent({
                    title:'Success!',
                    message:'Record deleted successfully',
                    variant:'success'
                  });
                  this.dispatchEvent(toastEvent);
                console.log('After Toast');
                return;
            }
            this.subscription = subscribe(
                this.messageContext,
                DeleteChannel,
                (selectedLWCpracRows) => {
                  this.handleMessage(selectedLWCpracRows);
                }
              );
 
            
            return refreshApex(this.wireLWCPrac);
        })
        .catch(error =>{
            this.errorMsg =error;
            window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
        });
    }

    handleMessage(selectedLWCpracRows) {
        for (let i = 0; i<selectedLWCpracRows.length; i++){
            this.selectedLWCPractIdList.push(selectedLWCpracRows[i].Id);
        }
        console.log('handle message')
        this.receivedMessage = selectedLWCpracRows
          ? JSON.stringify(selectedLWCpracRows, null, "\t")
          : "no message";
      }

    handleNamechange(event){
        this.recLWCPractical.Name = event.target.value;
        //console.log("name",this.recLWCPractical.Name);
    }
    handlePhonechange(event){
        this.recLWCPractical.Phone__c = event.target.value;
       // console.log("phone",this.recLWCPractical.Phone);
    }
    handleEmailchange(event){
        this.recLWCPractical.Email__c = event.target.value;
       // console.log("email",this.recLWCPractical.email);
    }


    createLWCPracticalRec() {
        lwcpracRecMethod({ lwcPracRec : this.recLWCPractical })
            .then(result => {
                this.message = result;
                this.error = undefined;
                if(this.message !== undefined) {
                    this.recLWCPractical.Name = '';
                    this.recLWCPractical.Email__c = '';
                    this.recLWCPractical.Phone__c = '';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Record created',
                            variant: 'success',
                        }),
                    );
                }
                
                console.log(JSON.stringify(result));
                console.log("result", this.message);
            })
            .catch(error => {
                this.message = undefined;
                this.error = error;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: 'Invalid input!',
                        variant: 'error',
                    }),
                );
                console.log("error", JSON.stringify(this.error));
            });
        this.template.querySelector('lightning-input[data-value="name"]').value = '';
        this.template.querySelector('lightning-input[data-value="email"]').value = '';
        this.template.querySelector('lightning-input[data-value="phone"]').value = '';
    }
}