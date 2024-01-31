const bleno = require('@abandonware/bleno');

// Define a custom Bluetooth service and characteristic
const BluetoothService = bleno.PrimaryService;
const BluetoothCharacteristic = bleno.Characteristic;

const DataTransferCharacteristic = new BluetoothCharacteristic({
    uuid: '502E4974-FC68-42B1-8402-33DAF244E47C',
    properties: ['read', 'write'],
    onWriteRequest: function (receivedData, offset, withoutResponse, callback) {
        // Initialize a buffer to store received data if it doesn't exist
        if (!this._dataBuffer) {
            this._dataBuffer = Buffer.alloc(0);
        }

        // Append the received data to the buffer
        this._dataBuffer = Buffer.concat([this._dataBuffer, receivedData]);

        // Convert buffer to string to check for newline
        const dataStr = this._dataBuffer.toString();

        // Check if data contains newline
        if (dataStr.includes('\n')) {
            console.log(dataStr); // Log the complete data string
            this._dataBuffer = Buffer.alloc(0); // Reset the buffer
            callback(this.RESULT_SUCCESS); // Signal successful write operation
        } else {
            callback(this.RESULT_SUCCESS); // Signal successful write operation, waiting for more data
        }
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
