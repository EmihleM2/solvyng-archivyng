import React, { useState, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Rnd } from 'react-rnd';

const Stamp = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [modifiedPdfUrl, setModifiedPdfUrl] = useState(null);
  const [stampPosition, setStampPosition] = useState({ x: 0, y: 0, width: 150, height: 150 });
  const [isStampDropped, setIsStampDropped] = useState(false);
  const [stampType, setStampType] = useState('approved');
  const pdfCanvasRef = useRef(null);

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

  const handleStop = (e, d) => {
    setStampPosition({ ...stampPosition, x: d.x, y: d.y });
    setIsStampDropped(true);
    console.log('Stamp dropped at position:', d.x, d.y);
  };

  const handleResize = (e, direction, ref, delta, position) => {
    setStampPosition({
      ...stampPosition,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      ...position,
    });
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
    const pdfX = (stampPosition.x / canvasRect.width) * firstPage.getWidth();
    const pdfY = firstPage.getHeight() - (stampPosition.y / canvasRect.height) * firstPage.getHeight();

    console.log('Drawing stamp at PDF coordinates:', pdfX, pdfY);
    firstPage.drawImage(stampImage, {
      x: pdfX,
      y: pdfY,
      width: (stampPosition.width / canvasRect.width) * firstPage.getWidth(),
      height: (stampPosition.height / canvasRect.height) * firstPage.getHeight(),
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
        <Rnd
          size={{ width: stampPosition.width, height: stampPosition.height }}
          position={{ x: stampPosition.x, y: stampPosition.y }}
          onDragStop={handleStop}
          onResize={handleResize}
          style={{ border: "1px solid black" }}
        >
          <img
            src={stampType === 'approved' ? 'approved_stamp.png' : 'deny_stamp.png'}
            alt="Stamp"
            style={{
              width: '100%',
              height: '100%',
              cursor: 'move',
              zIndex: 1,
            }}
          />
        </Rnd>
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
