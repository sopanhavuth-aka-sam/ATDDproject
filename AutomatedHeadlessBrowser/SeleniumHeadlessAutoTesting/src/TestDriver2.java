import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class TestDriver2 {
  private WebDriver driver;
  @Before
  
  public void setUp() throws Exception {
  	System.setProperty("webdriver.gecko.driver", "/home/cheriejw/repositories/ATDDproject/AutomatedHeadlessBrowser/geckodriver");
    driver = new FirefoxDriver();
  }

  // Search using keyword through Google search

  @Test
  public void testtestclass() throws Exception {
    //Open Home Page
    driver.get("http://www.google.com");
    //Enter text in search box
    driver.findElement(By.name("q")).sendKeys("selenium");
    Thread.sleep(1000);
    //Click Search button
    driver.findElement(By.name("btnG")).click(); //found button name and clicked.
    Thread.sleep(10000);
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
  }
  
}