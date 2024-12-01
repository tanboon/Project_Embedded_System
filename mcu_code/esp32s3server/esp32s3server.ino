#include <WiFi.h>
#include <WiFiClient.h>
#define BLYNK_TEMPLATE_ID "TMPL6vAad8UXK"
#define BLYNK_TEMPLATE_NAME "GPS TRACKER"
#define BLYNK_PRINT Serial
#include <BlynkSimpleEsp32.h>
#include <TinyGPS++.h>
#include <SoftwareSerial.h>
#include <WebServer.h>
#include <HTTPClient.h>
HTTPClient http;
 
// Replace with your own network credentials
TinyGPSPlus gps;
SoftwareSerial mygps(17,16); // GPS Tx Pin - 17  GPS Rx Pin 16
BlynkTimer timer;

float latitude;     //Storing the Latitude
float longitude;    //Storing the Longitude
float velocity;     //Variable  to store the velocity
float sats;         //Variable to store no. of satellites response
String bearing;     //Variable to store orientation or direction of GPS
char auth[] = "d4N5NP2Ewo233kS38s5SaPgaW0K2FL1R";            //Blynk Authentication Token
char ssid[] = "Redmi Note 13 Pro+ 5G";            // WiFi SSID
char pass[] = "idin20cool";
String truckID[] = {"70-3910", "70-3917", "703919", "70-3920", "70-4002", "70-3957", "70-4351", "70-4556", "70-4793", "83-2031"};
// String truckAPI[] = {"2K1GYU976I6RCMV2", "LEA7D57NJRECP190", "84VSBY9Q8MZWQ3XF"};
String truckAPI[] = {"2K1GYU976I6RCMV2"};
#define lineToken "iImjc7KU3Bo02fwI2r6MoKyYeV8tZRKgWW9ue2WMlVT"
 
WebServer server(80);
 
const int led1Pin = 25;
const int led2Pin = 13;
const int speakerPin = 5;
int ledState = LOW;
int ledBrightness = 0;
int eyeState = 1;
// void handleRoot() {
//   server.send(200, "text/html", html);
// }

void handlePredict() {
  // Serial.print("Handle Predict!!!");
  //0 is open_eye,  1 is close_eye
  eyeState = server.arg("state").toInt();
  digitalWrite(speakerPin, !eyeState);
  if(eyeState == 1){
    sendLineNotification("ALERT: Driver is drownsy");
    http.begin("https://api.thingspeak.com/update?api_key=64BQ0BD5A3EKR33N&field1=" + truckID[0] + "&field2=2"); // The URL includes the query parameters
    int httpResponseCode = http.GET();
    http.end();
  }
}
 
void handleLED() {
  ledState = server.arg("state").toInt();
  digitalWrite(led1Pin, ledState);
  server.send(200, "text/plain", String(ledState));
}
 
void handleBrightness() {
  ledBrightness = server.arg("value").toInt();
  analogWrite(led2Pin, ledBrightness);
  server.send(200, "text/plain", String(ledBrightness));
}

void checkGPS()
{
  if (gps.charsProcessed() < 10)
  {
    Serial.println(F("No GPS detected: check wiring."));
    Blynk.virtualWrite(V3, "GPS ERROR");  // Value Display widget  on V3 if GPS not detected
  }
}
 
void setup() {
  Serial.begin(115200);
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
  pinMode(speakerPin, OUTPUT);
  digitalWrite(led1Pin, ledState);
  digitalWrite(speakerPin, eyeState);
  analogWrite(led2Pin, ledBrightness);
  // WiFi Configuration & Init
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  Serial.print("Connecting To WiFi Network .");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }
  // Connected Successfully
  Serial.println("\nConnected To The WiFi Network");
  Serial.print("Local ESP32 IP: ");
  Serial.println(WiFi.localIP());
  // Attach Server Handler Functions & Start WebServer
  // server.on("/", handleRoot);
  server.on("/predict", handlePredict);
  server.begin();

  Blynk.begin(auth, ssid, pass);
}
 
void loop() {
  // This sketch displays information every time a new sentence is correctly encoded.
  unsigned long start = millis();

  while (millis() - start < 1000) {
    server.handleClient();
    while (mygps.available() > 0) {
      gps.encode(mygps.read());
    }
    if (gps.location.isUpdated()) {
      sats = gps.satellites.value();       //get number of satellites
      latitude = (gps.location.lat());     //Storing the Lat. and Lon.
      longitude = (gps.location.lng());
      velocity = gps.speed.kmph();         //get velocity
      bearing = TinyGPSPlus::cardinal(gps.course.value()); 

      Serial.print("LAT: ");
      Serial.println(gps.location.lat(), 6);
      Serial.print("LONG: "); 
      Serial.println(gps.location.lng(), 6);
      Serial.print("SPEED (km/h) = "); 
      Serial.println(gps.speed.kmph()); 
      Serial.print("ALT (min)= "); 
      Serial.println(gps.altitude.meters());
      Serial.print("HDOP = "); 
      Serial.println(gps.hdop.value() / 100.0); 
      Serial.print("Satellites = "); 
      Serial.println(gps.satellites.value()); 
      Serial.print("Time in UTC: ");
      Serial.println(String(gps.date.year()) + "/" + String(gps.date.month()) + "/" + String(gps.date.day()) + "," + String(gps.time.hour()) + ":" + String(gps.time.minute()) + ":" + String(gps.time.second()));
      Serial.println("");

      Blynk.virtualWrite(V1, String(latitude, 6));
      Blynk.virtualWrite(V2, String(longitude, 6));
      Blynk.virtualWrite(V3, velocity);
      Blynk.virtualWrite(V4, String(latitude + 0.003, 6));
      Blynk.virtualWrite(V5, String(longitude + 0.002, 6));
      Blynk.virtualWrite(V6, velocity);
      Blynk.virtualWrite(V7, String(latitude + 0.003, 6));
      Blynk.virtualWrite(V8, String(longitude - 0.002, 6));
      Blynk.virtualWrite(V9, velocity);
    }
  }
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

