// Interfaces
interface ControlField {
    URG?: boolean;
    ACK?: boolean;
    PSH?: boolean;
    RST?: boolean;
    SYN?: boolean;
    FIN?: boolean;
}

interface Tcp {
    sourcePort: number;
    desticationPost: number;
    sequenceNumber: number;
    ackNumber: number;
    HLEN: number;
    reserved: number;
    controlField: ControlField;
    windowSize: number;
    checkSum: boolean;
    urgentPointer: number;
    options?: number | undefined;
}

interface IP {
  version: number;
  headerLength: number;
  typeOfService: number;
  totalLength: number;
  flags: number;
  fragmentOffset: number;
  timeToLive: number;
  protocol: number;
  headerChecksum: number;
  sourceAddress: string;
  destinationAddress: string;
  options?: number | undefined;
}


// Types
type SocketType =  Tcp | IP;

// Socket
class Socket {
    private buffer: ArrayBuffer;
    private view: DataView;
    private offset: number;

	constructor(options?: SocketType) {
        this.buffer = new ArrayBuffer(1024);
        this.view = new DataView(this.buffer);
        this.offset = 0;

        if (options) {
            this.writeTcpHeader(options);
        }
    }

    writeTcpHeader(header: Tcp) {
        this.view.setUint16(this.offset, header.sourcePort);
        this.offset += 2;

        this.view.setUint16(this.offset, header.desticationPost);
        this.offset += 2;

        this.view.setUint32(this.offset, header.sequenceNumber);
        this.offset += 4;

        this.view.setUint32(this.offset, header.ackNumber);
        this.offset += 4;

        const HLEN_RESERVED = ((header.HLEN & 0xf) << 12) | ((header.reserved || 0) & 0x3f);
        this.view.setUint16(this.offset, HLEN_RESERVED);
        this.offset += 2;

        const controlField =
            (header.controlField.FIN ? 1 : 0) |
            (header.controlField.SYN ? 2 : 0) |
            (header.controlField.RST ? 4 : 0) |
            (header.controlField.PSH ? 8 : 0) |
            (header.controlField.ACK ? 16 : 0) |
            (header.controlField.URG ? 32 : 0);

        this.view.setUint16(this.offset, controlField);
        this.offset += 2;

        this.view.setUint16(this.offset, header.windowSize);
        this.offset += 2;

        this.view.setUint16(this.offset, 0);
        this.offset += 2;

        this.view.setUint16(this.offset, header.urgentPointer);
        this.offset += 2;
    }

	write(buffer: ArrayBuffer, cb?: (err?: Error) => void): boolean {
        // write the buffer to the socket
        return true;
      }
    
      connect() {
        // connect the socket
      }
    
      setEncoding() {
        // set encoding
      }
    
      pause() {
        // pause the socket
      }
    
      resume() {
        // resume the socket
      }
    
      end() {
        // end the socket connection
      }
    
      emit() {
        // emit events
      }
    
      on() {
        // event listener
      }
    
      once() {
        // register event listener
      }

}