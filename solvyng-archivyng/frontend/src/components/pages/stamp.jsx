import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import Draggable from 'react-draggable';

const Stamp = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modifiedPdfUrl, setModifiedPdfUrl] = useState(null);
  const [stampPosition, setStampPosition] = useState({ x: 0, y: 0 });
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [isStampDropped, setIsStampDropped] = useState(false);
  const [stampType, setStampType] = useState('approved');
  const pdfCanvasRef = useRef(null);
  const stampRef = useRef(null);

  const loadPdf = async (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const pdfBytes = new Uint8Array(fileReader.result);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      console.log('PDF loaded and URL set:', url);
    };
    fileReader.readAsArrayBuffer(file);
  };

  const handleDrop = (e, data) => {
    setStampPosition({ x: data.x, y: data.y });
    setIsStampDropped(true);
    setX(data.x);
    setY(data.y);
    console.log('Stamp dropped at position:', data.x, data.y);
  };

  const addStampToPdf = async () => {
    if (!pdfUrl) return;

    console.log('Starting to add stamp to PDF...');
    const response = await fetch(pdfUrl);
    const pdfBytes = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const stampUrl = stampType === 'approved' ? 'approved_stamp.png' : 'deny_stamp.png';
    console.log('Fetching stamp image from URL:', stampUrl);
    const stampImageBytes = await fetch(stampUrl).then((res) => res.arrayBuffer());
    const stampImage = await pdfDoc.embedPng(stampImageBytes);

    const canvas = pdfCanvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const pdfX = (x / canvasRect.width) * firstPage.getWidth() - 78;
    const pdfY = firstPage.getHeight() - (y / canvasRect.height) * firstPage.getHeight() - 45;

    console.log('Drawing stamp at PDF coordinates:', pdfX, pdfY);
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
    console.log('Modified PDF URL set:', url);
  };

  return (
    <div>
      <input type="file" onChange={loadPdf} />
      <div>
        <button className='button-stamp' onClick={() => setStampType('approved')}>Select Approve Stamp</button>
        <button className='button-stamp' onClick={() => setStampType('denied')}>Select Deny Stamp</button>
        <button className='button-stamp' onClick={addStampToPdf} disabled={!isStampDropped}>
          Add Stamp to PDF
        </button>
      </div>
      <div>
      </div>
      <div style={{ position: 'relative', width: '1800px', height: '1200px', top: 18 }}>
        {pdfUrl && (
          <iframe
            ref={pdfCanvasRef}
            title="PDF Viewer"
            src={pdfUrl}
            width="1500"
            height="1200"
            style={{ position: 'absolute', zIndex: 0 }}
          ></iframe>
        )}
        <Draggable onStop={handleDrop} nodeRef={stampRef}>
          <img
            ref={stampRef}
            src={stampType === 'approved' ? 'approved_stamp.png' : 'deny_stamp.png'}
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
      {modifiedPdfUrl && (
        <iframe
          title="Modified PDF"
          src={modifiedPdfUrl}
          width="1800"
          height="1200"
          style={{ position: 'absolute', top: '93px', zIndex: 2 }}
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
//         const stampUrl = 'approved_stamp.png'; // Replace with the path to your stamp image
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
