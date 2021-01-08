var express  = require('express');
var app      = express();
//var app      = require('express')();

//var http     = require('http');
//var server   = http.Server(app);
var http     = require('http').Server(app);

//var socketio = require('socket.io');
//var io       = socketio(server);
var io       = require('socket.io')(http);

var SerialPort = require('serialport');
var parsers    = SerialPort.parsers;
var parser     = new parsers.Readline({
  delimiter: '\r\n'
});

var sp = new SerialPort('COM4', {
  baudRate: 9600
});

var port      = 3000;
var _adcValue = 0;
var _srvValue =	0;

var   ang  =   90;
const max  =  180;
const min  =    0;
const stp  =   10;

sp.pipe(parser);

sp.on('open', () => console.log('Port open'));

parser.on('data', function(data)
{
	if(data.substring(0,3) == "Red"){
		if(data.substring(3,4) == "0")	ledStatus = "on";
		else							ledStatus = "off";
		io.emit('Red', ledStatus);
		console.log('Red status: ' + ledStatus);
	}
	else if(data.substring(0,3) == "Ylw"){
		if(data.substring(3,4) == "0")	ledStatus = "on";
		else							ledStatus = "off";
		io.emit('Ylw', ledStatus);
		console.log('Ylw status: ' + ledStatus);
	}
	else if(data.substring(0,3) == "Grn"){
		if(data.substring(3,4) == "0")	ledStatus = "on";
		else							ledStatus = "off";
		io.emit('Grn', ledStatus);
		console.log('Grn status: ' + ledStatus);
	}
	else if(data.substring(0,3) == "Blu"){
		if(data.substring(3,4) == "0")	ledStatus = "on";
		else							ledStatus = "off";
		io.emit('Blu', ledStatus);
		console.log('Blu status: ' + ledStatus);
	}
	else if(data.substring(0,3) == "All"){
		if(data.substring(3,4) == "0")	ledStatus = "on";
		else							ledStatus = "off";
		io.emit('All', ledStatus);
		console.log('All status: ' + ledStatus);
	}
	else if(data.substring(0,3) == "adc"){
		adcValue = data.substring(3);
		io.emit('adc', adcValue);
        if(_adcValue != adcValue) console.log('adc value: ' + adcValue);
        _adcValue = adcValue;
	}
	else if(data.substring(0,3) == "srv"){
		srvValue = data.substring(3);
		io.emit('srv', srvValue);
        if(_srvValue != srvValue) console.log('servo value: ' + srvValue);
        _srvValue = srvValue;
	}
});

app.get('/Red_on',function(req,res)
{
	sp.write('Red0\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: Red on');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('RED ON\n');
	});
});

app.get('/Red_off',function(req,res)
{
	sp.write('Red1\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: Red off');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('RED OFF\n');
	}); 
});

app.get('/Ylw_on',function(req,res)
{
	sp.write('Ylw0\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: Ylw on');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Ylw ON\n');
	});
});

app.get('/Ylw_off',function(req,res)
{
	sp.write('Ylw1\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: Ylw off');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Ylw OFF\n');
	}); 
});

app.get('/Grn_on',function(req,res)
{
	sp.write('Grn0\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: Grn on');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Grn ON\n');
	});
});

app.get('/Grn_off',function(req,res)
{
	sp.write('Grn1\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: Grn off');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Grn OFF\n');
	}); 
});

app.get('/Blu_on',function(req,res)
{
	sp.write('Blu0\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: Blu on');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Blu ON\n');
	});
});

app.get('/Blu_off',function(req,res)
{
	sp.write('Blu1\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: Blu off');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Blu OFF\n');
	}); 
});

app.get('/All_on',function(req,res)
{
	sp.write('All0\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: All on');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('All ON\n');
	});
});

app.get('/All_off',function(req,res)
{
	sp.write('All1\n\r', function(err){
		if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('send: All off');
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('All OFF\n');
	}); 
});

app.get('/inc_ang',function(req, res) {
  
  if(ang + stp <= max)  ang = ang + stp;
  else                  ang = max;
  
  sp.write('srv'+ ang +'\n', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('send: move servo to '+ ang +'˚');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(' Move Servo to ' + ang +'˚\n');
  });
});

app.get('/dec_ang',function(req,res) {
  
  if(ang - stp >= min)  ang = ang - stp;
  else                  ang = min;
  
  sp.write('srv'+ ang +'\n', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
	console.log('srv'+ang);
    console.log('send: move servo to '+ ang + '˚');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end(' Move Servo to ' + ang +'˚\n');
  });
});

app.use(express.static(__dirname + '/public'));

http.listen(port, function() {  // server.listen(port, function() {
    console.log('listening on *:' + port);
});