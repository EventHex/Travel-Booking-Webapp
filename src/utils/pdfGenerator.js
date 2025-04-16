import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generateInsurancePDF = async (applicationData) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

  // Get the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Set up some constants for layout
  const margin = 50;
  const fontSize = 12;
  const boldFontSize = 14;
  let y = page.getHeight() - margin;

  // Add title
  page.drawText('Insurance Document', {
    x: margin,
    y,
    size: boldFontSize + 4,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 30;

  // Add personal information
  page.drawText('Personal Information:', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const personalInfo = [
    `Name: ${applicationData.name}`,
    `Passport Number: ${applicationData.passportNumber}`,
    `Country: ${applicationData.country}`,
    `Visa Type: ${applicationData.visa}`,
    `Travel Dates: ${applicationData.travelDates}`,
  ];

  personalInfo.forEach(info => {
    page.drawText(info, {
      x: margin + 10,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  // Add insurance details
  y -= 20;
  page.drawText('Insurance Details:', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const insuranceInfo = [
    'Policy Number: INS-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    'Coverage Period: ' + applicationData.travelDates,
    'Coverage Amount: $50,000',
    'Emergency Contact: +1-800-INSURANCE',
  ];

  insuranceInfo.forEach(info => {
    page.drawText(info, {
      x: margin + 10,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  // Add terms and conditions
  y -= 30;
  page.drawText('Terms and Conditions:', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const terms = [
    '1. This insurance is valid for the duration of your travel.',
    '2. Coverage includes medical emergencies, trip cancellation, and lost luggage.',
    '3. Claims must be submitted within 30 days of the incident.',
    '4. Original receipts and documentation are required for claims.',
  ];

  terms.forEach(term => {
    page.drawText(term, {
      x: margin + 10,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

export const generateInvoicePDF = async (applicationData) => {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size

  // Get the Helvetica font
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Set up some constants for layout
  const margin = 50;
  const fontSize = 12;
  const boldFontSize = 14;
  let y = page.getHeight() - margin;

  // Add header with company info
  page.drawText('TRAVEL BOOKING SERVICES', {
    x: margin,
    y,
    size: boldFontSize + 6,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const companyInfo = [
    '123 Travel Street, Suite 100',
    'New York, NY 10001',
    'Phone: (555) 123-4567',
    'Email: info@travelbooking.com',
  ];

  companyInfo.forEach(info => {
    page.drawText(info, {
      x: margin,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 15;
  });

  // Add invoice title and details
  y -= 30;
  page.drawText('INVOICE', {
    x: margin,
    y,
    size: boldFontSize + 4,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  const invoiceDate = new Date().toLocaleDateString();
  
  const invoiceDetails = [
    `Invoice Number: ${invoiceNumber}`,
    `Date: ${invoiceDate}`,
    `Customer Name: ${applicationData.name}`,
    `Passport Number: ${applicationData.passportNumber}`,
  ];

  invoiceDetails.forEach(detail => {
    page.drawText(detail, {
      x: margin,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  // Add service details
  y -= 30;
  page.drawText('Service Details:', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const serviceDetails = [
    `Service: ${applicationData.visa} Visa Application`,
    `Country: ${applicationData.country}`,
    `Travel Dates: ${applicationData.travelDates}`,
  ];

  serviceDetails.forEach(detail => {
    page.drawText(detail, {
      x: margin,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  // Add payment details
  y -= 30;
  page.drawText('Payment Details:', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const paymentDetails = [
    'Service Fee: $150.00',
    'Processing Fee: $25.00',
    'Insurance: $30.00',
    'Total Amount: $205.00',
  ];

  paymentDetails.forEach(detail => {
    page.drawText(detail, {
      x: margin,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 20;
  });

  // Add payment terms
  y -= 30;
  page.drawText('Payment Terms:', {
    x: margin,
    y,
    size: boldFontSize,
    font: helveticaBold,
    color: rgb(0, 0, 0),
  });
  y -= 20;

  const paymentTerms = [
    'Payment is due within 7 days of invoice date.',
    'Please make payment via bank transfer or credit card.',
    'Bank Details:',
    'Account Name: Travel Booking Services',
    'Account Number: 1234567890',
    'Bank: International Bank',
    'SWIFT: INTLUS33',
  ];

  paymentTerms.forEach(term => {
    page.drawText(term, {
      x: margin,
      y,
      size: fontSize,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    y -= 15;
  });

  // Add footer
  y -= 30;
  const footerText = 'Thank you for choosing our services. For any queries, please contact our customer support.';
  page.drawText(footerText, {
    x: margin,
    y,
    size: fontSize - 2,
    font: helveticaFont,
    color: rgb(0.5, 0.5, 0.5),
  });

  // Save the PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}; 