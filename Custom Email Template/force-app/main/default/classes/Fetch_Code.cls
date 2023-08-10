public class Fetch_Code {
    public String Bill_code { get; set; }
    
    public List<Account> getAccounts(){
        List<Account> records = [Select Name,Phone,Type from Account Where BillingPostalCode = :Bill_code]; 
        return records;
    }
}