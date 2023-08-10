trigger createcnt on Account (after insert) {
    List<Contact> contact = new List<Contact>();
    for(Account acc : Trigger.new){
        Contact cnt = new Contact(LastName = acc.Name + 'Contact', AccountId = acc.Id, Title = 'Trigger Contact');
    	contact.add(cnt);
    }
    if(contact.size()>0){
        insert contact;
    }
}