#include <Servo.h>
Servo  srv;


const unsigned int pinRed = 13;
const unsigned int pinYlw = 12;
const unsigned int pinGrn = 10;
const unsigned int pinBlu = 9;

const unsigned int pinSrv = 11;

const unsigned int potPin = A0;

/* Red0, red1, Ylw0, Ylw1, Grn0, Grn1, Blu0, Blu1 */
String  inputString    = "";
String  redState       = "Red1";
String  ylwState       = "Ylw1";
String  grnState       = "Grn1";
String  bluState       = "Blu1";
String  allState       = "All1";
boolean stringComplete = false;

String rcv_str   = "srv0";
String srvState = "srv0";
unsigned int pos = 90;

unsigned int prevAdcVal = 0;

void setup() 
{
  pinMode(pinRed,OUTPUT);
  pinMode(pinYlw,OUTPUT);
  pinMode(pinGrn,OUTPUT);
  pinMode(pinBlu,OUTPUT);
  digitalWrite(pinRed, redState.substring(3,4).toInt());
  digitalWrite(pinYlw, ylwState.substring(3,4).toInt());
  digitalWrite(pinGrn, grnState.substring(3,4).toInt());
  digitalWrite(pinBlu, bluState.substring(3,4).toInt());
  
  srv.attach(pinSrv); srv.write(pos); 
  
  inputString.reserve(10);
  rcv_str.reserve(10);
  prevAdcVal = analogRead(potPin);
  
  Serial.begin(9600);
}

void loop()
{
  unsigned int adcVal = analogRead(potPin);
  if(adcVal != prevAdcVal){
    Serial.print("adc");  Serial.println(adcVal);
    prevAdcVal = adcVal;
  }
  
  /* "adc768\n" */
  if(stringComplete) 
  {
    if(inputString.substring(0,3) == "Red")
    {
      digitalWrite(pinRed, inputString.substring(3,4).toInt());
      redState = "Red" + inputString.substring(3,4);
      Serial.println(redState);
    }
    else if(inputString.substring(0,3) == "Ylw")
    {
      digitalWrite(pinYlw, inputString.substring(3,4).toInt());
      ylwState = "Ylw" + inputString.substring(3,4);
      Serial.println(ylwState);
    }
    else if(inputString.substring(0,3) == "Grn")
    {
      digitalWrite(pinGrn, inputString.substring(3,4).toInt());
      grnState = "Grn" + inputString.substring(3,4);
      Serial.println(grnState);
    }
    else if(inputString.substring(0,3) == "Blu")
    {
      digitalWrite(pinBlu, inputString.substring(3,4).toInt());
      bluState = "Blu" + inputString.substring(3,4);
      Serial.println(bluState);
    }
    else if(inputString.substring(0,3) == "All")
    {
      digitalWrite(pinRed, inputString.substring(3,4).toInt());
      digitalWrite(pinYlw, inputString.substring(3,4).toInt());
      digitalWrite(pinGrn, inputString.substring(3,4).toInt());
      digitalWrite(pinBlu, inputString.substring(3,4).toInt());
      allState = "All" + inputString.substring(3,4);
      Serial.println(allState);
    }
    else if(inputString.substring(0,3) == "srv") {
        srv.write(inputString.substring(3).toInt()); delay(15);
        srvState = "srv" + inputString.substring(3);
        Serial.println(srvState);
    }
    inputString = "";
    stringComplete = false;
  }
  delay(250);
}

void serialEvent()
{
  while (Serial.available() > 0)
  {
    char inChar = Serial.read();
    
    inputString = inputString + inChar;
    
    if(inChar == '\n') stringComplete = true;
  }
}
