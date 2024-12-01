#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define echoPin 18 // attach pin GPIO18 to pin Echo of JSN-SR04
#define trigPin 5  // attach pin GPIO5 ESP32 to pin Trig of JSN-SR04
#define lineToken "iImjc7KU3Bo02fwI2r6MoKyYeV8tZRKgWW9ue2WMlVT"

String WIFI_SSID = "Redmi Note 13 Pro+ 5G";
String WIFI_PASS = "idin20cool";

String API = "64BQ0BD5A3EKR33N"; // Write API KEY
String HOST = "api.thingspeak.com";
String PORT = "80";
String SERVER = "https://api.thingspeak.com/update?api_key=";
String truckID[] = {"70-3910", "70-3917", "703919", "70-3920", "70-4002", "70-3957", "70-4351", "70-4556", "70-4793", "83-2031"};
// String truckAPI[] = {"2K1GYU976I6RCMV2", "LEA7D57NJRECP190", "84VSBY9Q8MZWQ3XF"};
String truckAPI[] = {"2K1GYU976I6RCMV2"};

double duration = 0.0; // Time taken for the pulse to reach the receiver
double distance = 0;
float tankRadius =  17;
float lenght_from_sensor_to_bottom = 44;
float tankwidth = 22;
float tankLength = 22;
float memory = 0;
float fuelLevel = 0;
float consumeRate = 0;

HTTPClient http;

void setup()
{
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  delay(500);
}

void loop()
{
  if (WiFi.status() == WL_CONNECTED)
  { 
    for (int i = 0; i < sizeof(truckAPI) / sizeof(truckAPI[0]); i++)
    {
      unsigned long mostDuration = 0;
      unsigned long sumDuration = 0;
      for (int i = 0; i < 100; i++)
      {
        digitalWrite(trigPin, LOW);
        delayMicroseconds(5);

        digitalWrite(trigPin, HIGH); // turn on the Trigger to generate pulse
        delayMicroseconds(100); // keep the trigger "ON" for 10 ms to generate pulse
        digitalWrite(trigPin, LOW); // Turn off the pulse trigger to stop pulse

        unsigned long readDuration = pulseIn(echoPin, HIGH);
        sumDuration += readDuration;
        // Serial.println(readDuration);
        delay(10);
      }

      duration = sumDuration / 100;
      distance = duration * 0.0344 / 2;

      Serial.print("Distance: ");
      Serial.print(distance);
      Serial.println(" cm");

      float oldFuelLevel = fuelLevel;

      // fuelLevel = (lenght_from_sensor_to_bottom - distance) * tankwidth * tankLength; // rectangle tank
      fuelLevel = M_PI * tankRadius * tankRadius * (lenght_from_sensor_to_bottom - distance);
      // int fuelLevel = (tankHight - distance) * (M_PI * tankRadius * tankRadius);

      consumeRate = oldFuelLevel - fuelLevel;
      Serial.print("Cousume Rate: ");
      Serial.println(consumeRate); 



      // Serial.println("Send req:" + SERVER + truckAPI[i] + "&field1=" + String(fuelLevel + i));
      http.begin(SERVER + truckAPI[i] + "&field1=" + String(fuelLevel)); // The URL includes the query parameters
      int httpResponseCode = http.GET();

      if (httpResponseCode > 0)
      {
        Serial.println("TruckID:" + truckID[i]);
        Serial.println("Fuel Level:" + String(fuelLevel));
      }
      else
      {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }

      http.end();

      if (consumeRate >= 10){
        http.begin("https://api.thingspeak.com/update?api_key=64BQ0BD5A3EKR33N&field1=" + truckID[i] + "&field2=1"); // The URL includes the query parameters
        int httpResponseCode = http.GET();
        http.end();

        sendLineNotification("ALERT: Significant fuel drain detected!");
      }
    }

  }
  Serial.println("----------------------------------");
  delay(1000); // Delay between requests
}

void sendLineNotification(String message) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("https://notify-api.line.me/api/notify");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    http.addHeader("Authorization", "Bearer " + String(lineToken));

    String postData = "message=" + message;
    int httpResponseCode = http.POST(postData);

    if (httpResponseCode > 0) {
      Serial.println("Notification sent successfully");
    } else {
      Serial.println("Error sending notification");
    }

    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
}
