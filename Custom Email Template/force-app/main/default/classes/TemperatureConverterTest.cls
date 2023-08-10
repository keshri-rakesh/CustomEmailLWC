@isTest
public class TemperatureConverterTest {
    
    @isTest static void testWarmTemp(){
        Decimal celsius = TemperatureConverter.FarenheitToCelcius(70);
        System.assertEquals(21.11, celsius);
    }
    
    @isTest static void testFreezingPoint(){
        Decimal celsius = TemperatureConverter.FarenheitToCelcius(32);
        System.assertEquals(0, celsius);
    }
    
    @isTest static void testBoilingPoint(){
        Decimal celsius = TemperatureConverter.FarenheitToCelcius(212);
        System.assertEquals(100, celsius,'Boiling point temp is not expected.');
    }
    
    @isTest static void testNegativeTemp(){
        Decimal celsius = TemperatureConverter.FarenheitToCelcius(-10);
        System.assertEquals(-23.33, celsius);
    }
    
    @isTest static void testSameTemp(){
        Decimal celsius = TemperatureConverter.FarenheitToCelcius(-40);
        System.assertEquals(-40, celsius,'Same temp expected.');
    }
}