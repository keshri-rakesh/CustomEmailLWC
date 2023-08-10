@isTest
public class TestVerifyDate {
    @isTest static void testCheckDates(){                                               //(YYYY, MM, DD)
        Date date1 = Date.today();    //For manual date:     Date date1 = Date.newInstance(2022, 04, 06)
        Date date2 = date1.addDays(10);   //Alternate way:   Date date2 = Date.parse('06/04/22')
      																			  //('MM/DD/YY')						
        Date result = VerifyDate.CheckDates(date1,date2);
        System.assertEquals(date2.format(), result.format());
    }
    
    @isTest static void testEndOfMonthDate(){
        Date date1 = Date.today();
        Date date2 = date1.addDays(30);
        
        //End of the Month
        Integer totalDays = Date.daysInMonth(date1.year(), date1.month());
        Date lastDay = Date.newInstance(date1.year(), date1.month(), totalDays);
        
        Date newresult = VerifyDate.CheckDates(date1,date2);
        System.assertEquals(lastDay.format(), newresult.format());
    }
}