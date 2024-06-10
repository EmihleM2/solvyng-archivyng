import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import Draggable from 'react-draggable';

const Stamp = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modifiedPdfUrl, setModifiedPdfUrl] = useState(null);
  const [stampPosition, setStampPosition] = useState({ x: 0, y: 0 });
  const [isStampDropped, setIsStampDropped] = useState(false);
  const pdfCanvasRef = useRef(null);

  const loadPdf = async (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const pdfBytes = new Uint8Array(fileReader.result);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleDrop = (e, data) => {
    setStampPosition({ x: data.x, y: data.y });
    setIsStampDropped(true);
  };

  const addStampToPdf = async () => {
    if (!pdfUrl) return;

    const response = await fetch(pdfUrl);
    const pdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Load the stamp image
    const stampUrl = '/stamp.png';
    const stampImageBytes = await fetch(stampUrl).then((res) => res.arrayBuffer());
    const stampImage = await pdfDoc.embedPng(stampImageBytes);

    // Convert canvas position to PDF coordinates
    const canvas = pdfCanvasRef.current;
    const { x, y, width, height } = canvas.getBoundingClientRect();
    const pdfX = stampPosition.x * (firstPage.getWidth() / width);
    const pdfY = firstPage.getHeight() - (stampPosition.y * (firstPage.getHeight() / height)) - 150;

    // Draw the stamp image on the first page
    firstPage.drawImage(stampImage, {
      x: pdfX,
      y: pdfY,
      width: 150,
      height: 150,
    });

    const pdfBytesModified = await pdfDoc.save();
    const blob = new Blob([pdfBytesModified], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setModifiedPdfUrl(url);
  };

  return (
    <div>
      <input type="file" onChange={loadPdf} />
      <div style={{ position: 'relative', width: '1800px', height: '1200px' }}>
        {pdfUrl && (
          <iframe
            ref={pdfCanvasRef}
            title="PDF Viewer"
            src={pdfUrl}
            width="1800"
            height="1200"
            style={{ position: 'absolute', zIndex: 0 }}
          ></iframe>
        )}
        <Draggable onStop={handleDrop}>
          <img
            src="/approved_stamp.png"
            alt="Stamp"
            style={{
              position: 'absolute',
              width: '150px',
              height: '150px',
              cursor: 'move',
              zIndex: 1,
            }}
          />
        </Draggable>
      </div>
      <button onClick={addStampToPdf} disabled={!isStampDropped}>
        Add Stamp to PDF
      </button>
      {modifiedPdfUrl && (
        <iframe
          title="Modified PDF"
          src={modifiedPdfUrl}
          width="600"
          height="800"
          style={{ marginTop: '20px' }}
        ></iframe>
      )}
    </div>
  );
};

export default Stamp;

// import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// const Stamp = () => {
//     const [pdfUrl, setPdfUrl] = useState(null);
//     const [modifiedPdfUrl, setModifiedPdfUrl] = useState(null);

//     const loadPdf = async (event) => {
//         const file = event.target.files[0];
//         const fileReader = new FileReader();
//         fileReader.onload = async () => {
//             const pdfBytes = new Uint8Array(fileReader.result);
//             const modifiedPdfBytes = await addStampToPdf(pdfBytes);
//             const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
//             const url = URL.createObjectURL(blob);
//             setModifiedPdfUrl(url);
//         };
//         fileReader.readAsArrayBuffer(file);
//     };

//     const addStampToPdf = async (pdfBytes) => {
//         const pdfDoc = await PDFDocument.load(pdfBytes);
//         const pages = pdfDoc.getPages();
//         const firstPage = pages[0];

//         // Load the stamp image
//         const stampUrl = 'google_symbol.png'; // Replace with the path to your stamp image
//         const stampImageBytes = await fetch(stampUrl).then((res) => res.arrayBuffer());
//         const stampImage = await pdfDoc.embedPng(stampImageBytes);

//         // Draw the stamp image on the first page
//         firstPage.drawImage(stampImage, {
//             x: 450,
//             y: 610,
//             width: 150,
//             height: 150,
//         });

//         const pdfBytesModified = await pdfDoc.save();
//         return pdfBytesModified;
//     };

//     return (
//         <div>
//             <button name='ok'>
//             <input type="file" onChange={loadPdf} />
//             {modifiedPdfUrl && (
//                 <iframe
//                     title="Modified PDF"
//                     src={modifiedPdfUrl}
//                     width="1800"
//                     height="1200"
//                 ></iframe>
//             )}
//             </button>
//         </div>
//     );
// };

// export default Stamp;
