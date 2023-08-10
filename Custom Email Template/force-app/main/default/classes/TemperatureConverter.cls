public class TemperatureConverter {
	//Take Farenheit Temperature and give Cecius as a result.
    public static Decimal FarenheitToCelcius(Decimal fh){
        Decimal cs = (fh - 32) * 5/9;
        return cs.setScale(2);
    } 
}