public with sharing class createLWCPracHelper {
    @AuraEnabled
    public static LWC_Practical__c lwcpracRecMethod(LWC_Practical__c lwcPracRec){
        try {   
            insert lwcPracRec;
            return lwcPracRec;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }       
    }
}