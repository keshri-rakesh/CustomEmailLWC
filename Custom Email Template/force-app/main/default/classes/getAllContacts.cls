public class getAllContacts {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(Id contactRecordId, String searchKeys){
        if(searchKeys!=null && searchKeys!=''){
            String key = '%'+searchKeys+'%';
            List<Contact> contactSearchList = [Select Id, Name, Phone, Email, Account.Name, AccountId  from Contact
             where Name like : key];
             return contactSearchList;
        }else{
            List<Contact> contactList = [Select Id, Name, Phone, Email, Account.Name, AccountId  from Contact LIMIT 10];
            if(!contactList.isEmpty()){
                return contactList;
            }
            return null;
        }
    }

}