public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        //throw new AuraHandledException('Forced error');
        try {
            return [Select FirstName, LastName, Email from Contact with security_enforced];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}