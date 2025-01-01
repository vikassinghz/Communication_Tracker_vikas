import { jsPDF } from 'jspdf';
import { Company } from '../../types';
import { COMMUNICATION_TYPES } from '../../store/communications';

export function generatePDF(companies: Company[]): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Title
  doc.setFontSize(16);
  doc.text('Communications Report', pageWidth / 2, 20, { align: 'center' });
  
  // Content
  doc.setFontSize(10);
  let yPos = 40;
  
  companies.forEach((company, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.text(`Company: ${company.name}`, 10, yPos);
    doc.text(`Location: ${company.location}`, 10, yPos + 5);
    
    if (company.lastCommunication) {
      const type = COMMUNICATION_TYPES.find(t => t.value === company.lastCommunication?.type)?.label;
      doc.text(`Last Communication: ${new Date(company.lastCommunication.date).toLocaleDateString()} via ${type}`, 10, yPos + 10);
      doc.text(`Notes: ${company.lastCommunication.notes}`, 10, yPos + 15);
    } else {
      doc.text('No communication recorded', 10, yPos + 10);
    }
    
    yPos += 25;
  });
  
  return doc;
}