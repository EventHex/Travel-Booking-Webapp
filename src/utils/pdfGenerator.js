import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// export const generateInsurancePDF = async (applicationData) => {
//   // Create a new PDF document
//   const pdfDoc = await PDFDocument.create();
//   const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

//   // Get the Helvetica font
//   const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
//   const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

//   // Set up some constants for layout
//   const margin = 50;
//   const fontSize = 12;
//   const boldFontSize = 14;
//   let y = page.getHeight() - margin;

//   // Add title
//   page.drawText('Insurance Document', {
//     x: margin,
//     y,
//     size: boldFontSize + 4,
//     font: helveticaBold,
//     color: rgb(0, 0, 0),
//   });
//   y -= 30;

//   // Add personal information
//   page.drawText('Personal Information:', {
//     x: margin,
//     y,
//     size: boldFontSize,
//     font: helveticaBold,
//     color: rgb(0, 0, 0),
//   });
//   y -= 20;

//   const personalInfo = [
//     `Name: ${applicationData.name}`,
//     `Passport Number: ${applicationData.passportNumber}`,
//     `Country: ${applicationData.country}`,
//     `Visa Type: ${applicationData.visa}`,
//     `Travel Dates: ${applicationData.travelDates}`,
//   ];

//   personalInfo.forEach(info => {
//     page.drawText(info, {
//       x: margin + 10,
//       y,
//       size: fontSize,
//       font: helveticaFont,
//       color: rgb(0, 0, 0),
//     });
//     y -= 20;
//   });

//   // Add insurance details
//   y -= 20;
//   page.drawText('Insurance Details:', {
//     x: margin,
//     y,
//     size: boldFontSize,
//     font: helveticaBold,
//     color: rgb(0, 0, 0),
//   });
//   y -= 20;

//   const insuranceInfo = [
//     'Policy Number: INS-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
//     'Coverage Period: ' + applicationData.travelDates,
//     'Coverage Amount: $50,000',
//     'Emergency Contact: +1-800-INSURANCE',
//   ];

//   insuranceInfo.forEach(info => {
//     page.drawText(info, {
//       x: margin + 10,
//       y,
//       size: fontSize,
//       font: helveticaFont,
//       color: rgb(0, 0, 0),
//     });
//     y -= 20;
//   });

//   // Add terms and conditions
//   y -= 30;
//   page.drawText('Terms and Conditions:', {
//     x: margin,
//     y,
//     size: boldFontSize,
//     font: helveticaBold,
//     color: rgb(0, 0, 0),
//   });
//   y -= 20;

//   const terms = [
//     '1. This insurance is valid for the duration of your travel.',
//     '2. Coverage includes medical emergencies, trip cancellation, and lost luggage.',
//     '3. Claims must be submitted within 30 days of the incident.',
//     '4. Original receipts and documentation are required for claims.',
//   ];

//   terms.forEach(term => {
//     page.drawText(term, {
//       x: margin + 10,
//       y,
//       size: fontSize,
//       font: helveticaFont,
//       color: rgb(0, 0, 0),
//     });
//     y -= 20;
//   });

//   // Save the PDF
//   const pdfBytes = await pdfDoc.save();
//   return pdfBytes;
// };

export const generateInvoicePDF = async (applicationData) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

  // Get the fonts
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Set up some constants for layout
  const margin = 50;
  const fontSize = 12;
  const boldFontSize = 14;
  let y = page.getHeight() - margin;

  // Add "INVOICE" text in large, blue font
  page.drawText('INVOICE', {
    x: page.getWidth() - margin - 200,
    y,
    size: 32,
    font: helveticaBold,
    color: rgb(0.4, 0.4, 1), // Blue color similar to the image
  });
  y -= 40;

  // Add invoice details on the right side
  const invoiceDetails = [
    ['Invoice', applicationData.invoiceNumber || 'ININMH0425010545'],
    ['Date', new Date().toLocaleDateString()],
    ['HSN Code', '998559']
  ];

  let rightColumnY = y;
  invoiceDetails.forEach(([label, value]) => {
    // Draw label
    page.drawText(label + ':', {
      x: page.getWidth() - margin - 200,
      y: rightColumnY,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    // Draw value
    page.drawText(value, {
      x: page.getWidth() - margin - 80,
      y: rightColumnY,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    rightColumnY -= 20;
  });

  // Add "Invoice to" section
  y = y - 20;
  page.drawText('Invoice to', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 25;

  // Customer details
  const customerDetails = [
    ['Name:', applicationData.name || 'CNN HOLIDAYS LLP'],
    ['Address:', applicationData.address || 'LII-5350, CNN HOLIDAYS, KANNUR'],
    ['', 'Kannur, Kerala, 670001'],
    ['GST:', applicationData.gst || '32AATFC0952A1ZV']
  ];

  customerDetails.forEach(([label, value]) => {
    if (label) {
      page.drawText(label, {
        x: margin,
        y,
        size: fontSize,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
    }
    page.drawText(value, {
      x: margin + (label ? 80 : 80),
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  // Add "Customer Details" section
  y -= 20;
  page.drawText('Customer Details', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 25;

  // Add destination
  page.drawText('Destination: United Arab Emirates', {
    x: margin,
    y,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0, 0, 0),
  });
  y -= 40;

  // Add table headers
  const tableHeaders = ['DESCRIPTION', 'CURRENCY', 'AMOUNT'];
  const columnWidths = [300, 100, 100];
  let xOffset = margin;

  tableHeaders.forEach((header, index) => {
    page.drawText(header, {
      x: xOffset,
      y,
      size: fontSize,
      font: helveticaBold,
      color: rgb(0.4, 0.4, 1), // Blue color for headers
    });
    xOffset += columnWidths[index];
  });
  y -= 20;

  // Add table content
  const tableContent = [
    ['Cost of Visa', 'INR', '47.00']
  ];

  tableContent.forEach(row => {
    xOffset = margin;
    row.forEach((cell, index) => {
      page.drawText(cell, {
        x: xOffset,
        y,
        size: fontSize,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      xOffset += columnWidths[index];
    });
    y -= 20;
  });

  // Add total
  y -= 20;
  page.drawText('TOTAL', {
    x: margin + columnWidths[0],
    y,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  page.drawText('47.00', {
    x: margin + columnWidths[0] + columnWidths[1],
    y,
    size: fontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });

  // Add "Thanks for your business" section
  y -= 60;
  page.drawText('Thanks for your business', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 25;

  // Add company details
  const companyDetails = [
    ['Company:', 'Atlys India Private Limited'],
    ['Address:', '#767, Vishwanand Dham, 5th road,'],
    ['', 'Khar (W), Mumbai, 400052'],
    ['GST:', '27AAWCA5942Q1ZM'],
    ['Transaction Type:', 'B2B']
  ];

  companyDetails.forEach(([label, value]) => {
    if (label) {
      page.drawText(label, {
        x: margin,
        y,
        size: fontSize,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
    }
    page.drawText(value, {
      x: margin + (label ? 100 : 100),
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  // Add the electronic generation notice
  y -= 20;
  page.drawText('This Invoice is electronically generated and requires no signature.', {
    x: margin,
    y,
    size: fontSize,
    font: helveticaFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}; 