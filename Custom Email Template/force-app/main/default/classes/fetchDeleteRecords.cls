public with sharing class fetchDeleteRecords {
    //delete multiple contact record in LWC
    @AuraEnabled(cacheable=true)
    public static List<LWC_Practical__c> fetchLWCPracticalRecord(){
        List<LWC_Practical__c> lwcpracList = [Select Id, Name, Email__c, Phone__c From LWC_Practical__c LIMIT 200];
        return lwcpracList;
    }
 
    @AuraEnabled
    public static List<LWC_Practical__c> deleteMultipleRecord(List<String> lpObj){
        List<LWC_Practical__c> lwcpracObjItem = new   List<LWC_Practical__c>();
      List<LWC_Practical__c> lwcpracObjList = [Select Id, Name  From LWC_Practical__c Where Id IN:lpObj];
      for(LWC_Practical__c lp:lwcpracObjList){
        lwcpracObjItem.add(lp);
      }
      if(lwcpracObjItem.size()>0){
          try{
            delete lwcpracObjItem;           
          }
          catch (Exception exp) {
            throw new AuraHandledException(exp.getMessage());
        }
      }
      return fetchLWCPracticalRecord();
    }
}