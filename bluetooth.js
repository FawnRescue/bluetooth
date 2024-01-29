const bleno = require('@abandonware/bleno');

// Define a custom service and characteristic
const PrimaryService = bleno.PrimaryService;
const Characteristic = bleno.Characteristic;

const MyCustomCharacteristic = new Characteristic({
    uuid: '502E4974-FC68-42B1-8402-33DAF244E47C', // Custom UUID for the characteristic
    properties: ['read', 'write'], // Define properties (read, write, notify)
    onWriteRequest: function(data, offset, withoutResponse, callback) {
        console.log('Data received: ' + data.toString()); // Log the received data
        callback(this.RESULT_SUCCESS); // Indicate success
    }
});

const myService = new PrimaryService({
    uuid: 'F08A484F-8957-4F21-AA95-B58252D8D708', // Custom UUID for the service
    characteristics: [MyCustomCharacteristic]
});

bleno.on('stateChange', function(state) {
    console.log('State change: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising('FawnRescue', [myService.uuid]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function(error) {
    console.log('Advertising start: ' + (error ? 'error ' + error : 'success'));
    if (!error) {
        bleno.setServices([myService]);
    }
});

// Handling disconnection
bleno.on('disconnect', (clientAddress) => {
    console.log(`Client disconnected: ${clientAddress}`);
    // Reset the BLE hardware to a known state
    bleno.stopAdvertising();
    bleno.startAdvertising('FawnRescue', [myService.uuid]);
});

// Optional: Handle new connections
bleno.on('accept', (clientAddress) => {
    console.log(`Client connected: ${clientAddress}`);
    setTimeout(() => {
        console.log('No data received for 5 seconds, disconnecting...');
        bleno.disconnect(); // Disconnect the client
        bleno.startAdvertising('FawnRescue', [myService.uuid]);
    }, 5000);
});
