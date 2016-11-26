import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TestDriver {

    public static void main(String[] args) {
    	
    	//loading with 
    	System.setProperty("webdriver.gecko.driver", "/home/cheriejw/repositories/ATDDproject/AutomatedHeadlessBrowser/geckodriver");
    	
        // declaration and instantiation of objects/variables
        WebDriver driver = new FirefoxDriver();
        String baseUrl = "http://newtours.demoaut.com";
        String expectedTitle = "Welcome: Mercury Tours";
        String actualTitle = "";

        // launch Firefox and direct it to the Base URL
        driver.get(baseUrl);

        // get the actual value of the title
        actualTitle = driver.getTitle();

        /*
         * compare the actual title of the page with the expected one and print
         * the result as "Passed" or "Failed"
         */
        if (actualTitle.contentEquals(expectedTitle)){
            System.out.println("Test Passed!");
        } else {
            System.out.println("Test Failed");
        }
        //close Firefox; this did not work for me to close.
        //driver.close();
        
        driver.quit();
       
        // exit the program explicitly
        System.exit(0);
    }
}