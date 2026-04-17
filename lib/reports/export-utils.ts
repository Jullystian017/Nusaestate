import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType,
} from 'docx';
import { saveAs } from 'file-saver';

/**
 * Exports a DOM element (the report card) to a high-quality PDF.
 */
export async function exportToPDF(elementId: string, filename: string = 'PropNest-Executive-Report.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    // Capture the element using html-to-image
    // Note: We use a try-catch pattern or a filter if cross-origin styles cause issues
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      // This filter helps avoid some security errors with external assets
      filter: (node) => {
        const exclusionClasses = ['remove-from-export'];
        return !exclusionClasses.some(cls => node.classList?.contains(cls));
      },
    });

    const pdf = new jsPDF('p', 'px', [element.offsetWidth * 2, element.offsetHeight * 2]);
    pdf.addImage(dataUrl, 'PNG', 0, 0, element.offsetWidth * 2, element.offsetHeight * 2);
    pdf.save(filename);
  } catch (error) {
    console.error('PDF Export Error:', error);
    alert('Maaf, gagal mengekspor PDF karena pembatasan keamanan browser pada font eksternal. Silakan gunakan fitur Print atau Export Word.');
  }
}

/**
 * Generates a professional Word document from the AI report markdown.
 */
export async function exportToWord(reportContent: string, filename: string = 'PropNest-Executive-Report.docx') {
  // Simple markdown parser to docx primitives
  const lines = reportContent.split('\n');
  const docChildren: any[] = [];

  // Add Header
  docChildren.push(
    new Paragraph({
      text: "PROPNEST EXECUTIVE REPORT",
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    })
  );

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Headings
    if (trimmed.startsWith('### ')) {
      docChildren.push(new Paragraph({ text: trimmed.replace('### ', ''), heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }));
    } else if (trimmed.startsWith('## ')) {
      docChildren.push(new Paragraph({ text: trimmed.replace('## ', ''), heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 } }));
    } else if (trimmed.startsWith('# ')) {
      docChildren.push(new Paragraph({ text: trimmed.replace('# ', ''), heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } }));
    } 
    // Bullet points
    else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      docChildren.push(
        new Paragraph({
          text: trimmed.substring(2),
          bullet: { level: 0 },
          spacing: { after: 100 }
        })
      );
    }
    // Normal text with bold support
    else {
      const parts = trimmed.split(/(\*\*.*?\*\*)/);
      const children = parts.map(part => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return new TextRun({ text: part.replace(/\*\*/g, ''), bold: true });
        }
        return new TextRun(part);
      });

      docChildren.push(new Paragraph({ children, spacing: { after: 150 } }));
    }
  });

  // Create document
  const doc = new Document({
    sections: [{
      properties: {},
      children: docChildren,
    }],
  });

  // Export
  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
