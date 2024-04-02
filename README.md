<br />
<p align="center">
<a><img src="image/Logo-circle.png" alt="FawnRescue" width="128" height="128" title="FawnRescue"></a>
  <h3 align="center">FawnRescue</h3>
  <p align="center">
    Bluetooth Authentication<br />
    <p align="center">
  <a href="https://github.com/FawnRescue/bluetooth/blob/main/LICENSE"><img src="https://img.shields.io/github/license/FawnRescue/bluetooth" alt="License"></a>
  <a href="https://github.com/FawnRescue/bluetooth/network/members"><img src="https://img.shields.io/github/forks/FawnRescue/bluetooth?style=social" alt="GitHub forks"></a>
  <a href="https://github.com/FawnRescue/bluetooth/stargazers"><img src="https://img.shields.io/github/stars/FawnRescue/bluetooth?style=social" alt="GitHub stars"></a>
</p>
    <p>
    <a href="https://github.com/FawnRescue/bluetooth/issues">Report Bug</a>
    ·
    <a href="https://github.com/FawnRescue/bluetooth/issues">Request Feature</a>
    </p>
    <a href="https://fawnrescue.github.io/">Website</a>
  </p>
</p>

This repository provides the Bluetooth authentication service for the FawnRescue drone, enabling secure BLE connections between the drone and the control application. It's built on Node.js and utilizes Bluetooth Low Energy (BLE) technology to facilitate a secure authentication flow.

## Getting Started

To use this service, you'll need Node.js and npm installed on your machine. The setup is straightforward:

### Prerequisites

- Node.js installed (v14.x or above recommended)
- npm (usually comes with Node.js)

### Installation

Clone the repository and install the dependencies to get started:

```bash
git clone https://github.com/FawnRescue/bluetooth.git
cd bluetooth
npm install
```

## Usage

Start the BLE server by running the main script:

```bash
node bluetooth.js
```

The `bluetooth.js` file contains the code to initialize the BLE server, allowing it to listen for connections from the FawnRescue app.

## Integration

The Bluetooth service is designed to be integrated with both the drone hardware and the control application:

- **Drone Integration**: Follow the instructions in the drone's repository to integrate the BLE service, ensuring the BLE UUIDs in the `bluetooth.js` match those expected by the drone's firmware.

- **App Integration**: The control application should implement the BLE client logic to establish a connection with the BLE service running on the drone, using the API endpoints defined in `bluetooth.js`.

## Contributing

We welcome contributions that help improve the security or functionality of the Bluetooth authentication service. Please see CONTRIBUTING.md for more information on how to submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
