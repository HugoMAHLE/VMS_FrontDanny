import ZebraBrowserPrintWrapper from 'zebra-browser-print-wrapper';

export class ZebraPrinter {

  printLabel(type: any, name: any, enterprise: any, host: any, date: any, code: any ){
    const font_width_per_char = 45
    const label_width = 804
    const label_height = 402
    const type_width = type.length
    const code_width = code.length
    const positionType = (label_width - type_width) /2
    const positionCode = (label_width - code_width) /2

    const mahleZpl = `^XA
      ^FO10,10^GFA,665,665,19,,::03NF03KF03F807F83FC001JFC,::::::03F81FE07F03FC07F03F807F83FC001FE,:::03F81FE07F03FC07F03KF83FC001JFC,:::03F81FE07F03KF03KF83FC001JFC,::03F81FE07F03KF03F807F83FC001FE,:::03F81FE07F03FC0FF03F807F83FE001FE,03F81FE07F03FC07F03F807F83JF1JFC,:::::,::^FS
      ^A0N,30,30 ^FO510,10^FDNumeros de emergencia^FS
      ^A0N,25,25 ^FO560,35^FD111/6566491600^FS
      ^FO10,55 ^GB790,3,3 ^FS
      ^A0N,40,40^FO${positionType},70 ^FD${type}^FS
      ^FO10,120 ^GB790,3,3 ^FS
      ^A0N,65,65 ^FO10,145^FD${name}^FS
      ^A0N,45,45 ^FO10,235^FD${enterprise}^FS
      ^A0N,30,30 ^FO10,305^FDHost: ^FS
      ^A0N,30,30 ^FO90,305^FD ${host}^FS
      ^A0N,30,30 ^FO420,305^FD Fecha: ^FS
      ^A0N,30,30 ^FO540,305^FD ${date}^FS
      ^FO10,340 ^GB790,3,3 ^FS
      ^A0N,50,50 ^FO${positionCode},360^FD ${code} ^FS
      ^XZ`;

      this.zebraPrint(mahleZpl)

  };

  private zebraPrint = async (
    zpl: string,
  ) => {
    try {
        console.log("printers: fetching...")
        const browserPrint = new ZebraBrowserPrintWrapper();
        const printers = await browserPrint.getAvailablePrinters();
        console.log(printers)
        const defaultPrinter = await browserPrint.getDefaultPrinter();
        browserPrint.setPrinter(defaultPrinter);

        console.log("Default Printer:", defaultPrinter);

        const printerStatus = await browserPrint.checkPrinterStatus();
        console.log("Printer Status:", printerStatus);

        if (printerStatus.isReadyToPrint) {
            console.log("Sending ZPL to printer:", zpl);
            browserPrint.print(zpl);
        } else {
            console.error("Printer is not ready. Errors:", printerStatus.errors);
        }
    } catch (e: any) {
        console.error("Error while printing:", e.message || e);
        //this.textChange.emit(this.text);
    }
  };

}
