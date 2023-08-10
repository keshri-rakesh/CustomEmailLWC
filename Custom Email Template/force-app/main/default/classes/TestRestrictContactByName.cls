@isTest
public class TestRestrictContactByName {
    @isTest static void testRestrictContact(){
        // Test data setup
        // Create Contact record with INVALIDNAME LastName
        Contact cnt = new Contact(LastName='INVALIDNAME');
        
        // Perform test
        Test.startTest();
        Database.UpsertResult result = Database.upsert(cnt, false);
        Test.stopTest();
        
        // Verify 
        // In case of insertion or updation it should have been stopped by the trigger,
        // so verify that we got back an error.
        System.assert(!result.isSuccess());
        System.assert(result.getErrors().size() > 0);
        System.assertEquals('The Last Name "INVALIDNAME" is not allowed for DML',
        result.getErrors()[0].getMessage());
    }
}