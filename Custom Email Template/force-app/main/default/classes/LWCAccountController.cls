public with sharing class LWCAccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String st){
        try {
            if(String.isEmpty(st)){
                return [Select Id, Name FROM Account LIMIT 100];
            }
            else{
                st = '%'+st+'%';
                return [Select Id, Name FROM Account WHERE Name LIKE :st];
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Contact> getAccountContacts(String accountId){
        try {
            return [Select Id, Name FROM Contact WHERE accountId=:accountId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}