import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFReader = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageDimensions, setPageDimensions] = useState({
    width: Math.min(window.innerWidth * 0.8, 1200),
    height: Math.min(window.innerWidth * 0.8, 600),
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // set size when window size changed
  useEffect(() => {
    const updatePageDimensions = () => {
      const maxWidth = 1200;
      const maxHeight = 600;
      let screenWidth = Math.min(window.innerWidth * 0.8, maxWidth);
      let screenHeight = Math.min(window.innerWidth * 0.8, maxHeight);
      // based on the smaller one calculate the width and height with ratio 12:8
      if (screenWidth / 12 > screenHeight / 8) {
        screenWidth = (screenHeight / 8) * 12;
      } else {
        screenHeight = (screenWidth / 12) * 8;
      }

      setPageDimensions({ width: screenWidth, height: screenHeight });
    };

    updatePageDimensions();
    window.addEventListener("resize", updatePageDimensions);
    return () => window.removeEventListener("resize", updatePageDimensions);
  }, []);

  return (
    <div className="pdf-reader flex items-center justify-center w-full bg-black text-white">
      <button
        className="mr-10 text-white text-3xl"
        disabled={pageNumber <= 1}
        onClick={goToPrevPage}
      >
        <FaChevronLeft />
      </button>

      <div className="flex flex-col items-center">
        <div className="mb-4 text-white">
          Page {pageNumber} / {numPages}
        </div>

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) =>
            console.error("Error loading document:", error)
          }
          onError={(error) => console.error("Error with document:", error)}
        >
          <Page
            pageNumber={pageNumber}
            width={pageDimensions.width}
            height={pageDimensions.height}
          />
        </Document>
      </div>

      <button
        className="ml-10 text-white text-3xl"
        disabled={pageNumber >= numPages}
        onClick={goToNextPage}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default PDFReader;
