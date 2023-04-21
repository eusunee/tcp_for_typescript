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
  version: "IPv4" | "IPv6";
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
    private encoding: string = 'utf8';
    private paused: boolean = false;
    private destroyed: boolean = false;

    constructor(options?: SocketType) {
          this.buffer = new ArrayBuffer(1024);
          this.view = new DataView(this.buffer);
          this.offset = 0;

          if (options) {
              this.writeTcpHeader(options);
          }
    }

    // Private method to write a TCP header to the buffer
    private writeTcpHeader(header: Tcp) {
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

    // Write data to the socket
    write(buffer: ArrayBuffer, cb?: (err?: Error) => void): boolean {
      if (this.destroyed) {
        throw new Error('This socket has been destrpyed');
      }
      if(this.paused) {
        return false;
      }

      // write the buffer to the socket
      // TODO: Implement writing data to socket
      console.log(`Writing data to socket: ${buffer}`);
      return true;
    }
    
    // Connect the socket
    connect(): void {
      // TODO: Implement connecting the socket
      console.log(`Connecting the socket`);
    }

    // Set encoding
    setEncoding(encoding: string): this {
      // TODO: Implement setting encoding
      console.log(`Setting encoding: ${encoding}`);
      this.encoding = encoding;
      return this;
    }

    // Pause the socket
    pause(): this {
      // TODO: Implement pausing the socket
      this.paused = true;
      console.log(`Pausing the socket`);
      return this;
    }

    // Resume the socket
    resume(): this {
      // TODO: Implement resuming the socket
      this.paused = false;
      console.log(`Resuming the socket`);
      return this;
    }

    // End the socket connection
    end(): void {
      // TODO: Implement ending the socket connection
      console.log(`Ending the socket connection`);
      this.destroyed = true;
    }

    // Emit an event
    emit(event: string | symbol, ...args: any[]): boolean {
      // TODO: Implement emitting an event
      // console.log(`Emmiting event: ${event}`);
      return true;
    }

    // Register an event listener
    on(event: string | symbol, listener: (...args: any[]) => void): this {
      // TODO: Implement registering an event listener
      return this;
    }

    // Register a one-time event listener
    once(event: string | symbol, listener: (...args: any[]) => void): this {
      // TODO: Implement registering a one-time event listener
      return this;
    }

}