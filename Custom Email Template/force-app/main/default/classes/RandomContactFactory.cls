public class RandomContactFactory {
    public static List<Contact> generateRandomContacts(Integer cntFirstName, String contactLastName){
        List<Contact> contact = new List<Contact>();
        for(Integer i=0;i<cntFirstName;i++){
           Contact cnt = new Contact(FirstName = 'Test '+(i+1),LastName = contactLastName);
            contact.add(cnt);
        }
        insert contact;
        return contact;
    }
}