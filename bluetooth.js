const bleno = require('@abandonware/bleno');

// Define a custom Bluetooth service and characteristic
const BluetoothService = bleno.PrimaryService;
const BluetoothCharacteristic = bleno.Characteristic;

const DataTransferCharacteristic = new BluetoothCharacteristic({
    uuid: '502E4974-FC68-42B1-8402-33DAF244E47C', // Unique identifier for the characteristic
    properties: ['read', 'write'], // Enable read and write capabilities
    onWriteRequest: function (receivedData, offset, withoutResponse, callback) {
        console.log(receivedData.toString()); // Log the received data
        callback(this.RESULT_SUCCESS); // Signal successful write operation
        process.exit()
    }
});

const CustomService = new BluetoothService({
    uuid: 'F08A484F-8957-4F21-AA95-B58252D8D708', // Unique identifier for the service
    characteristics: [DataTransferCharacteristic] // List of characteristics in this service
});

bleno.on('stateChange', function (bluetoothState) {
    if (bluetoothState === 'poweredOn') {
        bleno.startAdvertising('FawnRescue', [CustomService.uuid]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function (advertisingError) {
    if (!advertisingError) {
        bleno.setServices([CustomService]);
    }
});

// Handle client disconnection events
bleno.on('disconnect', (clientAddress) => {
    // Reset Bluetooth to a known state
    bleno.stopAdvertising();
    bleno.startAdvertising('FawnRescue', [CustomService.uuid]);
});

// Optionally handle new client connections
bleno.on('accept', (clientAddress) => {
    setTimeout(() => {
        bleno.disconnect(); // Disconnect the inactive client
        bleno.startAdvertising('FawnRescue', [CustomService.uuid]);
    }, 5000);
});
