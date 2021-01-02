int counter = 0;

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
}

void loop() {

Serial.print(random(150,300), DEC);
delay(2000);
}
