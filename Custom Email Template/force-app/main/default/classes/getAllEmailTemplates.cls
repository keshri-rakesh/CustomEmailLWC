public with sharing class getAllEmailTemplates {

    @AuraEnabled(cacheable=true)
    public static List<EmailTemplate> getEmailTemplates() {
        return [SELECT Id, Name FROM EmailTemplate WHERE Name like '%Email Template%'];
    }

    @AuraEnabled(cacheable=true)
    public static String getEmailTemplateBody(Id templateId, List<Contact> contacts) {
        System.debug('Contacts Selected: '+contacts);
        EmailTemplate template = [SELECT HtmlValue FROM EmailTemplate WHERE Id = :templateId];
        String emailBody = template.HtmlValue;
        for (Contact contact : contacts) {
            emailBody = emailBody.replace('{!Contact.Name}', contact.Name);
            emailBody = emailBody.replace('{!Account.Name}', contact.Account.Name);
            emailBody = emailBody.replace('{!Contact.Email}', contact.Email);
            //emailBody = emailBody.replaceIgnoreCase('{!Contact.Email}', contact.Email);
        }
        
        return emailBody;
    }

    @AuraEnabled
    public static void sendEmailToContacts(List<String> contactIds, String templateId) {
        System.debug('----------Inside send Email method--------');
        List<Messaging.SingleEmailMessage> emailMessages = new List<Messaging.SingleEmailMessage>();

        // Retrieve the email template
        EmailTemplate emailTemplate = [SELECT Id, Subject, HtmlValue FROM EmailTemplate WHERE Id = :templateId];
        
        // Retrieve the contact records
        List<Contact> contacts = [Select Id, Name, Phone, Email, Account.Name, AccountId FROM Contact WHERE Id IN :contactIds];
        System.debug('Contacts in Apex: '+contacts);
        for (Contact contact : contacts) {
            System.debug('--for loop--');
            System.debug('Contact Name: '+contact.Name);
            
            String emailBody = emailTemplate.HtmlValue;

            emailBody = emailBody.replace('{!Contact.Name}', contact.Name);
            emailBody = emailBody.replace('{!Account.Name}', contact.Account.Name);
            emailBody = emailBody.replace('{!Contact.Email}', contact.Email);

            Messaging.SingleEmailMessage emailMessage = new Messaging.SingleEmailMessage();
            emailMessage.setTemplateId(emailTemplate.Id);
            emailMessage.setTargetObjectId(contact.Id);
            emailMessage.setSubject(emailTemplate.Subject);
            emailMessage.setHtmlBody(emailBody);
            emailMessage.setToAddresses(new List<String>{ contact.Email }); // Set the recipient email address

            emailMessages.add(emailMessage);
            System.debug('--------Email Messages-------: '+emailMessages);
        }

        // Send the email messages
        try{
            System.debug('Email Messages: '+emailMessages);
            Messaging.sendEmail(emailMessages);
        }catch(Exception e){
            System.debug('Mail not sent!!!: '+e);
        }
    }

}