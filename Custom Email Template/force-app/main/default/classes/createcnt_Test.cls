@isTest
public class createcnt_Test {
    @isTest
    public static void testContact(){
        Test.startTest();
        Account acc = new Account(Name = 'Hello');
        insert acc;
        Test.stopTest();
    }
}