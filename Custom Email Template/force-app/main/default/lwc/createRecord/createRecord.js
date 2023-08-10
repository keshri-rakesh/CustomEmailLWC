import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class CreateRecord extends NavigationMixin(LightningElement) {
    handleClickNavigation(){
        //Navigate to Create Tab
        this[NavigationMixin.Navigate]({
            type: "standard__objectPage",
            attributes: {
              objectApiName: "LWC_Practical__c",
              actionName: "new"
            }
          });
    }
}