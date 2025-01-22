import { Component } from '@angular/core';
import ZebraBrowserPrintWrapper from "zebra-browser-print-wrapper";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  handleClick(){
    const type = " EMPLOYEE ";
    const name = "Daniel Tellez";
    const enterprise = "OT Services";
    const host = "Jorge Perez";
    this.printBarcode(type, name, enterprise, host)
  }

  printBarcode = async (
    type: string,
    name: string,
    enterprise: string,
    host: string,
  ) => {
    try {
        const browserPrint = new ZebraBrowserPrintWrapper(); // Create wrapper instance
        const printers = await browserPrint.getAvailablePrinters();
        console.log(printers)
        const defaultPrinter = await browserPrint.getDefaultPrinter(); // Get default printer
        browserPrint.setPrinter(defaultPrinter); // Set printer
 
        console.log("Default Printer:", defaultPrinter);
 
        const printerStatus = await browserPrint.checkPrinterStatus(); // Check status
        console.log("Printer Status:", printerStatus);
 
        if (printerStatus.isReadyToPrint) {
            const zpl = `^XA
 
^FO10,10^GFA,665,665,19,,::03NF03KF03F807F83FC001JFC,::::::03F81FE07F03FC07F03F807F83FC001FE,:::03F81FE07F03FC07F03KF83FC001JFC,:::03F81FE07F03KF03KF83FC001JFC,::03F81FE07F03KF03F807F83FC001FE,:::03F81FE07F03FC0FF03F807F83FE001FE,03F81FE07F03FC07F03F807F83JF1JFC,:::::,::^FS
 
^FO10,55 ^GB590,3,3 ^FS
^CFA,40 ^FO180,70 ^FD${type}^FS
^FO10,120 ^GB590,3,3 ^FS
 
^FX Second section with recipient address and permit information.
^CFA,45 ^FO10,145^FD${name}^FS
^CFA,45 ^FO10,195^FD${enterprise}^FS
^CFA,25 ^FO10,265^FDHost: ^FS
^CFA,25 ^FO120,265^FD ${host}^FS
 
^FO10,300 ^GB590,3,3 ^FS
 
^CFA,45 ^FO130,325^FD BIENVENIDO ^FS
 
^FO70,700^GB390,3,3^FS
^XZ`;
 
            console.log("Sending ZPL to printer:", zpl);
            browserPrint.print(zpl);
        } else {
            console.error("Printer is not ready. Errors:", printerStatus.errors);
        }
    } catch (e: any) {
        console.error("Error while printing:", e.message || e);
    }
  };
}
