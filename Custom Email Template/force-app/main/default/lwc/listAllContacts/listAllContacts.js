import { LightningElement, track, wire, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import getContactList from '@salesforce/apex/getAllContacts.getContactList';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getEmailTemplates from '@salesforce/apex/getAllEmailTemplates.getEmailTemplates';
import getEmailTemplateBody from '@salesforce/apex/getAllEmailTemplates.getEmailTemplateBody';
import sendEmailToContacts from '@salesforce/apex/getAllEmailTemplates.sendEmailToContacts';


const columns = [
    {label : 'Name', fieldName: 'Name'}
]

export default class ListAllContacts extends LightningElement {

    @track showContacts = 'Show Contacts'
    @track isVisible = false;
    columns = columns;
    @api recordId;
    @track data=[];
    @api searchKey='';
    @track showModal = false;
    @track emailTemplates = [];
    @track selectedTemplate = '';
    @track contactList = [];
    @track contactIds = [];
    @track templatePreview ;
    @track selectedContactIndex = 0;
    @track contactListwithIndex = [];

    connectedCallback(){
        getContactList({contactRecordId : this.recordId, searchKeys : this.searchKey })
        .then( response => {
            this.data = response;
            console.log('Data: ',Json.stringify(response));
        })
        .catch(err=>{
            console.log('Error occured: ',err);
        })
    }

    handleChange(event){
        this.searchKey = event.target.value;
        getContactList({contactRecordId : this.recordId, searchKeys : this.searchKey })
        .then( res => {
            this.data = res;
        })
        .catch(err=>{
            console.log('Error occured: ',err);
        })
    }

    handleClick(event){
        const label = event.target.label;
        if(label === 'Show Contacts'){
            this.showContacts = 'Hide Contacts';
            this.isVisible = true;
        }
        else if(label === 'Hide Contacts'){
            this.showContacts = 'Show Contacts';
            this.isVisible = false;
        }
    }

    getSelectedRows(event){
        this.contactList = event.detail.selectedRows;
        this.contactIds = event.detail.selectedRows.map(contact => contact.Id);
        console.log('Contact List: '+JSON.stringify(this.contactList));
        console.log('Contact Ids: '+JSON.stringify(this.contactIds));
        //window.alert(JSON.stringify(contactLists));
    }

    get selectedContact() {
        console.log('Selected Contact Index: ',this.selectedContactIndex);
        console.log('Selected Contact Result: '+JSON.stringify(this.contactList[this.selectedContactIndex]));
        return this.contactList[this.selectedContactIndex];
    }

    get disablePrevious() {
        return this.selectedContactIndex === 0;
    }

    get disableNext() {
        return this.selectedContactIndex === this.contactList.length - 1;
    }
    
    get templatePreviewStyle() {
        return `transform: translateX(-${this.selectedContactIndex * 100}%);`;
    }

    @wire(getObjectInfo, { objectApiName: 'EmailTemplate' })
    objectInfo;

    handleTemplateChange(event) {
        this.selectedTemplate = event.detail.value;
        console.log('Selected Template Id: '+this.selectedTemplate);
        if (this.selectedTemplate) {
            this.retrieveEmailTemplateBody();
        } else {
            this.contactList = [];
            this.templatePreview = {};
            this.selectedContactIndex = 0;
        }
    }

    handleNext(){
        this.showModal = true;
        this.retrieveEmailTemplates();
    }

    closeModal() {
        this.showModal = false;
    }


    retrieveEmailTemplates() {
        getEmailTemplates()
            .then((result) => {
                this.emailTemplates = result.map((template) => ({
                    label: template.Name,
                    value: template.Id
                }));
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                    })
                );
            });
    }

    retrieveEmailTemplateBody() {
        console.log('Contacts: '+JSON.stringify(this.contactList));
        console.log('Selected Template Id: '+this.selectedTemplate);
        if (this.contactList.length > 0 && this.selectedTemplate) {
        getEmailTemplateBody({ templateId: this.selectedTemplate, contacts : this.contactList })
            .then((result) => {
                console.log('Inside retrieve Email template Result: '+JSON.stringify(result));
                this.templatePreview = result;
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                    })
                );
            });
        }
    }

    sendEmail() {
        console.log('Sending Email....');
        console.log('Contact Ids: '+JSON.stringify(this.contactIds));
        console.log('Selected Template Id: '+this.selectedTemplate);
        sendEmailToContacts({ templateId: this.selectedTemplate, contactIds : this.contactIds })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Email sent successfully',
                        variant: 'success',
                    })
                );
                console.log('Email Sent...');
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                    })
                );
                console.log('Error while sending mail: ',error);
            });
    }

    showPreviousContact() {
        if (this.selectedContactIndex > 0) {
            this.selectedContactIndex--;
            const selectedContactInd = this.contactList[this.selectedContactIndex];
        
            getEmailTemplateBody({templateId: this.selectedTemplate, contacts : [selectedContactInd] })
            .then((result) => {
                console.log('Result: '+JSON.stringify(result));
                this.templatePreview = result;
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                    })
                );
                console.log('Error while preview: ',error);
            });
        }
    }
 
    showNextContact() {
        this.selectedContactIndex++;
        console.log('Inside Next with Index: ',this.selectedContactIndex);
        console.log('Inside Next with Contacts: ',JSON.stringify(this.contactList));
        //this.contactListwithIndex = this.contactList[this.selectedContactIndex];
        const selectedContactInd = this.contactList[this.selectedContactIndex];
        
            getEmailTemplateBody({templateId: this.selectedTemplate, contacts : [selectedContactInd] })
            .then((result) => {
                console.log('Result: '+JSON.stringify(result));
                this.templatePreview = result;
            })
            .catch((error) => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: error.message,
                        variant: 'error',
                    })
                );
                console.log('Error while preview: ',error);
            });
    }

}