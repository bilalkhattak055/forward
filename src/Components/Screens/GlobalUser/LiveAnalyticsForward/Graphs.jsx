import React, { useState, useRef } from 'react';
import ComplianceTargetsChart from '../Target and Controal V2/Component/ComplianceTarget';
import AlertCountsChart from '../Target and Controal V2/Component/AlertCount';
import { Row, Col, Button, Spinner } from 'reactstrap';
import WeekFilterProvider from '../../../../Contexts/WeakGlobal';
import ModelAnalyticsHeader from './ModelAnalytics';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import download from './asset/download.svg';
import ExcelReport from './Reports/ExcelReport';
import PDFReport from './Reports/PDFReport';

const Graphs = () => {
  const [exporting, setExporting] = useState(false);
  const [loading, setLoading] = useState(false); 
  const pageRef = useRef(null);

  const exportToPDF = async () => {
    try {
      setExporting(true);
      if (loading) {
        await new Promise(resolve => {
          const checkLoading = setInterval(() => {
            if (!loading) {
              clearInterval(checkLoading);
              resolve();
            }
          }, 500);
        });
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;

      pdf.setFontSize(16);
      pdf.text("AI Based Reels Inspection System Report", pageWidth / 2, margin, { align: 'center' });

      const today = new Date();
      pdf.setFontSize(8);
      pdf.text(`(Generated: ${today.toLocaleDateString()})`, pageWidth - margin, margin, { align: 'right' });

      const filterDisplay = "12/02/2025";
      if (filterDisplay) {
        pdf.text(`Filter: ${filterDisplay}`, margin, margin + 8);
      }

      let yPosition = margin + 15;
      const chartElements = pageRef.current.querySelectorAll('.apexcharts-canvas');

      for (let i = 0; i < chartElements.length; i++) {
        const chart = chartElements[i];

        let chartTitle = "Chart " + (i + 1);
        const parentCard = chart.closest('.card');
        if (parentCard) {
          const heading = parentCard.querySelector('.card-title, h5, h4, h3');
          if (heading) {
            chartTitle = heading.textContent.trim();
          }
        }

        const canvas = await html2canvas(chart, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = pageWidth - (margin * 2);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (yPosition + imgHeight + 10 > pageHeight) {
          pdf.addPage();
          yPosition = margin;
        }

        pdf.setFontSize(12);
        pdf.text(chartTitle, margin, yPosition);
        yPosition += 7;

        pdf.addImage(imgData, 'PNG', margin, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 15;
      }

      pdf.save('Forward Inspection Report.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <>
    
    <WeekFilterProvider>
      <Row className='pt-5 '>
        <Col xs={12}>
          <ModelAnalyticsHeader
            heading="Live Results"
            hideWeekText={true}
            currentWeek={false}
            shifts={false}
            multiShift={false}
            months={false}
            modules={false}
            severity={false}
            timeFilterOption={true}
            areas={false}
            showActions={true}
            onAccept={"handleFilterAccept"}
            onReset={""}
          />
        </Col>
      </Row>
      <div className="mb-1 btn-ali" style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <ExcelReport />
        <PDFReport />
        {/*<Button 
          className="bg-secondary p-2 shadow-md"
          onClick={exportToPDF}
          disabled={loading || exporting}
          style={{ backgroundColor: "#00A04A", display: "flex", alignItems: "center", gap: "8px", borderRadius: "6px", marginRight: "10px", boxShadow: "0px 0px 5px rgba(226, 224, 224, 0.32)"}}
        >
          {exporting ? (
            <>
              <Spinner size="sm" />
              Downloading...
            </>
          ) : (
            <>
              <img src={download} alt="download pdf" />
              Download PDF Report
            </>
          )}
        </Button>**/}
      </div>

      {/* ✅ Wrap charts with ref */}
      <div ref={pageRef}>
        <Row>
          <Col xs={12} lg={6}>
            <div className="p-3">
              <ComplianceTargetsChart />
            </div>
          </Col>
          <Col xs={12} lg={6}>
            <div className="p-3">
              <AlertCountsChart />
            </div>
          </Col>
        </Row>
      </div>
    </WeekFilterProvider>
    </>
  );
};

export default Graphs;
