const Base64Util = require('./base64-util');

/**
 * This class provides a ScratchLinkBluetooth implementation using Web Bluetooth.
 *
 * You must implement all of the public methods in this class.
 * - open()
 * - close()
 * - setOn[Open|Close|Error]
 * - setHandleMessage
 * - sendMessage(msgObj)
 * - isOpen()
 */
class ScratchLinkBluetooth {
    constructor (type) {
        this._type = type;
        this._onOpen = null;
        this._onClose = null;
        this._onError = null;
        this._handleMessage = null;
        this._runtime = null;
        this._extensionId = null;

        this._service = null;
        this._prefix = null;
        this._device = null;
        this._primary = null;
		this._rx = {},
		this._tx = null,

        this._encoder = new TextEncoder('utf-8');
		this._decoder = new TextDecoder('utf-8');
        this._onNotify = this._onNotify.bind(this);
        this._onDisconnect = this._onDisconnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
    }

    open () {
        if (this._onOpen && this._onClose && this._onError && this._handleMessage) {
        } else {
            throw new Error('Must set open, close, message and error handlers before calling open on the Web Bluetooth');
        }
        this._onOpen();
	}

    _connect(message) {
		//const params = {peripheralId: id}
		this._onMessage(message.id, null, "OK");
	}

	_discover(message) {
		this._option = message.params;
		const service = this._option.filters[0].services[0];
		//const _this = this;
		navigator.bluetooth.requestDevice(this._option).then(device => {
			device.gatt.connect().then(server => {
				server.getPrimaryService(service).then(primary => {
					this._primary = primary;
					this._device = primary.device;
					this._device.addEventListener("gattserverdisconnected", this._onDisconnect);
					this._onMessage(message.id, "connectedPeripheral", {peripheralId:this._device.id, name:this._device.name});
				});
			});
		})
		.catch(e => {
			if(this._onError != null) {
				this._onError(e);
			}
		});
    }

    close () {
        if(this._device != null) {
	        if(this._onClose != null) {
		        this._onClose();
			}
			let device = this._device;
	        this._device = null;
			device.gatt.disconnect();
		}
        this._primary = null;
		this._rx = {};
		this._tx = null;
    }

    _read(message) {
        //const params = { serviceId, characteristicId };
		// params.startNotifications = true;
		if(message.params.startNotifications) {
			this._startNotifications(message);
		}
		this._onMessage(message.id, null, "OK");
	}

	_startNotifications(message) {
        //const params = { serviceId, characteristicId };
		if(this._tx != null) return;
		let service = this._option.filters[0].services[0];
		let uuid = message.params.characteristicId;
		this._primary.getCharacteristic(uuid).then((tx) => {
			this._tx = uuid;
			tx.addEventListener("characteristicvaluechanged", this._onNotify);
			tx.startNotifications();
		}).catch((e) => {
			if(this._onError != null) {
				this._onError(e);
			}
		});
    }

	_write(message) {
        //const params = {serviceId, characteristicId, message};
		let service = this._option.filters[0].services[0];
        const uuid = message.params.characteristicId;
		const output = Base64Util.base64ToUint8Array(message.params.message);
		//console.log("_write:" + this._decoder.decode(output));
		if(this._rx[uuid] == undefined) {
			this._primary.getCharacteristic(uuid).then((rx) => {
				this._rx[uuid] = rx;
				this._rx[uuid].writeValue(output);
			}).catch((e) => {
				if(this._onError != null) {
					this._onError(e);
				}
			});
		} else {
			this._rx[uuid].writeValue(output)
			.catch((e) => {
				if(this._onError != null) {
				this._onError(e);
				}
			});
		}
	}

    sendMessage (message) {
        const text = JSON.stringify(message);
		if(message.method == "write") {
			this._write(message);
			return;
		}
		if(message.method == "startNotifications") {
			this._startNotifications(message);
			return;
		}
		if(message.method == "read") {
			this._read(message);
			return;
		}
		if(message.method == "discover") {
			this._discover(message);
			return;
		}
		if(message.method == "connect") {
			this._connect(message);
			return;
		}
    }

    setOnOpen (fn) {
        this._onOpen = fn;
    }

    setOnClose (fn) {
        this._onClose = fn;
    }

    setOnError (fn) {
        this._onError = fn;
    }

    setHandleMessage (fn) {
        this._handleMessage = fn;
    }

    isOpen () {
        return (this._device != null);
    }

    _onDisconnect () {
        if(this._device != null) {
	        if(this._onClose != null) {
		        this._onClose();
			}
		}
        this._device = null;
        this._primary = null;
		this._rx = {};
		this._tx = null;
	}

    _onNotify(event) {
		const message = this._decoder.decode(event.target.value);
		//console.log("_onNotify:" + message);
        const array = new Uint8Array(message.length);
        for (let i = 0; i < message.length; i++) {
            array[i] = message.charCodeAt(i);
        }
		const data = Base64Util.uint8ArrayToBase64 (array);
		this._onMessage(null, "characteristicDidChange",
			{ characteristicId: this._tx, message: data });
	}
    _onMessage (id, method, params) {
	    let json = { jsonrpc: '2.0' };
		if(id != null) json.id = id;
		if(method != null) json.method = method;
		if(params != null) json.params = params;
        this._handleMessage(json);
    }
}

module.exports = ScratchLinkBluetooth;
