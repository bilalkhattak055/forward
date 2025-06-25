import React, { useEffect } from "react";
import PannelData from "../Zustand/DataSender";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PDFReport = () => {
    const InspectedPannels = PannelData((state) => state.inspectedPanels);     
    const OkayPannel = PannelData((state) => state.okayPanels);
    const DefectedPannnels = PannelData((state) => state.defectedPanels);     
    const ConnectSocket = PannelData((state) => state.connectSocket);
    const DefectedType = PannelData((state) => state.defectedType);

    const defectTypes = Object.entries(DefectedType).map(([key, value]) => {
        const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
        const highestValue = Math.max(...Object.values(DefectedType).map(v => 
            typeof v === 'string' ? parseInt(v, 10) : v
        ));
        
        return {
            label: key,
            value: value,
            isActive: numValue === highestValue && numValue > 0,
            color: numValue === highestValue && numValue > 0 ? "#00A04A" : "#52526CCC"
        };
    });

    // Calculate metrics for the dashboard-style layout
    const overallAccuracy = ((OkayPannel / InspectedPannels) * 100).toFixed(1);
    const passPercentage = ((OkayPannel / InspectedPannels) * 100).toFixed(0);
    const defectivePercentage = ((DefectedPannnels / InspectedPannels) * 100).toFixed(0);

    // Performance metrics calculations
    const qualityScore = ((OkayPannel / InspectedPannels) * 100).toFixed(1);
    const defectRate = ((DefectedPannnels / InspectedPannels) * 100).toFixed(2);
    const efficiency = InspectedPannels > 0 ? ((InspectedPannels / (InspectedPannels + 10)) * 100).toFixed(1) : '0'; // Simulated efficiency
    const throughput = Math.round(InspectedPannels / 8); // Panels per hour (assuming 8-hour shift)

    // Quality grade calculation
    let qualityGrade = 'F';
    if (qualityScore >= 95) qualityGrade = 'A+';
    else if (qualityScore >= 90) qualityGrade = 'A';
    else if (qualityScore >= 80) qualityGrade = 'B';
    else if (qualityScore >= 70) qualityGrade = 'C';
    else if (qualityScore >= 60) qualityGrade = 'D';

    // Performance status
    const performanceStatus = qualityScore >= 95 ? 'Excellent' : qualityScore >= 80 ? 'Good' : qualityScore >= 60 ? 'Fair' : 'Poor';

    const exportToPDF = () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        // Colors matching the dashboard theme
        const primaryColor = [27, 54, 93]; // Dark blue
        const secondaryColor = [0, 160, 74]; // Green
        const accentColor = [46, 117, 182]; // Light blue
        const darkBg = [30, 30, 30]; // Dark background
        const lightGray = [242, 242, 242];
        
        // Header Section with dark theme
        doc.setFillColor(...darkBg);
        doc.rect(0, 0, pageWidth, 40, 'F');
        
        // Title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('AI Visual Inspection System', 20, 20);
        
        // Admin info (top right)
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Admin', pageWidth - 30, 15);
        doc.text('Ameer Hamza', pageWidth - 30, 20);
        
        // Date and time
        const currentDate = new Date();
        doc.setFontSize(8);
        doc.text(`Generated: ${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`, 20, 35);

        let yPosition = 50;

        // Overall Accuracy Card (Large metric like in the image)
        doc.setFillColor(...lightGray);
        doc.roundedRect(20, yPosition, 60, 40, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text('AI Accuracy', 95, yPosition + 10);
        doc.setFontSize(32);
        doc.setFont('helvetica', 'bold');
        doc.text(`${overallAccuracy}%`, 25, yPosition + 25);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('OVERALL ACCURACY', 25, yPosition + 35);

        // Hourly Performance (Circular progress simulation)
        doc.setFillColor(...lightGray);
        doc.roundedRect(90, yPosition, 60, 40, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text('HOURLY PERFORMANCE', 95, yPosition + 10);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text(`${passPercentage}%`, 95, yPosition + 25);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('Pass', 95, yPosition + 30);
        doc.setTextColor(...secondaryColor);
        doc.text('● Pass', 95, yPosition + 35);
        doc.setTextColor(255, 165, 0);
        doc.text('● Defective', 120, yPosition + 35);

        yPosition += 50;

        // Performance Metrics Section
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(...darkBg);
        doc.rect(20, yPosition, pageWidth - 40, 15, 'F');
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PERFORMANCE METRICS', 25, yPosition + 10);

        yPosition += 20;

        // Performance Cards Row 1
        // Quality Score Card
        doc.setFillColor(...lightGray);
        doc.roundedRect(20, yPosition, 45, 35, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Quality Score', 25, yPosition + 10);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...secondaryColor);
        doc.text(`${qualityScore}%`, 25, yPosition + 25);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`Grade: ${qualityGrade}`, 25, yPosition + 30);

        // Defect Rate Card
        doc.setFillColor(...lightGray);
        doc.roundedRect(70, yPosition, 45, 35, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Defect Rate', 75, yPosition + 10);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 69, 0);
        doc.text(`${defectRate}%`, 75, yPosition + 25);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text(`Status: ${performanceStatus}`, 75, yPosition + 30);

        // Efficiency Card
        doc.setFillColor(...lightGray);
        doc.roundedRect(120, yPosition, 45, 35, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('System Efficiency', 125, yPosition + 10);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...accentColor);
        doc.text(`${efficiency}%`, 125, yPosition + 25);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('Operational', 125, yPosition + 30);

        yPosition += 45;

        // Performance Cards Row 2
        // Throughput Card
        doc.setFillColor(...lightGray);
        doc.roundedRect(20, yPosition, 45, 35, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Throughput', 25, yPosition + 10);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryColor);
        doc.text(`${throughput}`, 25, yPosition + 25);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('Panels/Hour', 25, yPosition + 30);

        // Inspection Speed Card
        const inspectionSpeed = InspectedPannels > 0 ? (60 / (InspectedPannels / 8)).toFixed(1) : '0';
        doc.setFillColor(...lightGray);
        doc.roundedRect(70, yPosition, 45, 35, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Avg Speed', 75, yPosition + 10);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...secondaryColor);
        doc.text(`${inspectionSpeed}s`, 75, yPosition + 25);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('Per Panel', 75, yPosition + 30);

        // System Uptime Card
        const uptime = '99.2'; // Simulated uptime
        doc.setFillColor(...lightGray);
        doc.roundedRect(120, yPosition, 45, 35, 3, 3, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('System Uptime', 125, yPosition + 10);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...secondaryColor);
        doc.text(`${uptime}%`, 125, yPosition + 25);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        doc.text('Availability', 125, yPosition + 30);

        yPosition += 45;

        // Performance Summary Section
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(...primaryColor);
        doc.rect(20, yPosition, pageWidth - 40, 15, 'F');
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('PERFORMANCE SUMMARY', 25, yPosition + 10);

        yPosition += 20;

        // Performance summary table
        const performanceSummaryData = [
            ['Performance Indicator', 'Current Value', 'Target', 'Status', 'Trend'],
            ['Overall Accuracy', `${overallAccuracy}%`, '95%', overallAccuracy >= 95 ? '✓ Target Met' : '⚠ Below Target', overallAccuracy >= 95 ? '↗ Excellent' : '→ Monitor'],
            ['Quality Score', `${qualityScore}%`, '90%', qualityScore >= 90 ? '✓ Good' : '⚠ Needs Improvement', qualityScore >= 90 ? '↗ Good' : '↘ Review'],
            ['Defect Rate', `${defectRate}%`, '<5%', defectRate <= 5 ? '✓ Within Limits' : '⚠ High', defectRate <= 5 ? '↘ Good' : '↗ Concern'],
            ['System Efficiency', `${efficiency}%`, '85%', efficiency >= 85 ? '✓ Efficient' : '⚠ Low Efficiency', efficiency >= 85 ? '↗ Good' : '→ Stable'],
            ['Throughput Rate', `${throughput} panels/hr`, '50 panels/hr', throughput >= 50 ? '✓ Target Met' : '⚠ Below Target', throughput >= 50 ? '↗ Good' : '→ Monitor']
        ];

        doc.autoTable({
            startY: yPosition,
            head: [performanceSummaryData[0]],
            body: performanceSummaryData.slice(1),
            theme: 'grid',
            headStyles: {
                fillColor: accentColor,
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 8,
                textColor: [0, 0, 0]
            },
            alternateRowStyles: {
                fillColor: lightGray
            },
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 25 },
                2: { cellWidth: 25 },
                3: { cellWidth: 35 },
                4: { cellWidth: 25 }
            },
            margin: { left: 20, right: 20 }
        });

        yPosition = doc.lastAutoTable.finalY + 20;

        // Check if we need a new page
        if (yPosition > pageHeight - 100) {
            doc.addPage();
            yPosition = 20;
        }

        // Detailed Statistics Table
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(...primaryColor);
        doc.rect(20, yPosition, pageWidth - 40, 15, 'F');
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('INSPECTION STATISTICS', 25, yPosition + 10);

        yPosition += 20;

        // Statistics table
        const tableData = [
            ['Metric', 'Count', 'Percentage', 'Status'],
            ['Total Panels Inspected', InspectedPannels.toString(), '100.00%', '✓ Complete'],
            ['Panels Passed (OK)', OkayPannel.toString(), `${((OkayPannel / InspectedPannels) * 100).toFixed(2)}%`, OkayPannel > DefectedPannnels ? '✓ Good' : '⚠ Review'],
            ['Panels Failed (Defective)', DefectedPannnels.toString(), `${((DefectedPannnels / InspectedPannels) * 100).toFixed(2)}%`, DefectedPannnels === 0 ? '✓ Excellent' : '⚠ Action Required']
        ];

        doc.autoTable({
            startY: yPosition,
            head: [tableData[0]],
            body: tableData.slice(1),
            theme: 'grid',
            headStyles: {
                fillColor: accentColor,
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 9,
                textColor: [0, 0, 0]
            },
            alternateRowStyles: {
                fillColor: lightGray
            },
            margin: { left: 20, right: 20 }
        });

        yPosition = doc.lastAutoTable.finalY + 20;

        // Defect Analysis Table
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(...primaryColor);
        doc.rect(20, yPosition, pageWidth - 40, 15, 'F');
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('DEFECT ANALYSIS', 25, yPosition + 10);

        yPosition += 20;

        const totalDefects = Object.values(DefectedType).reduce((sum, val) => 
            sum + (typeof val === 'string' ? parseInt(val, 10) : val), 0);

        const defectTableData = [
            ['Defect Type', 'Count', '% of Defects', 'Severity', 'Action Required']
        ];

        defectTypes.forEach(defect => {
            const percentage = totalDefects > 0 ? ((defect.value / totalDefects) * 100).toFixed(2) : '0.00';
            const severity = defect.isActive ? 'HIGH' : defect.value > 0 ? 'MEDIUM' : 'LOW';
            const action = defect.isActive ? 'Critical Review' : defect.value > 0 ? 'Monitor' : 'Normal';
            
            defectTableData.push([
                defect.label,
                defect.value.toString(),
                `${percentage}%`,
                severity,
                action
            ]);
        });

        doc.autoTable({
            startY: yPosition,
            head: [defectTableData[0]],
            body: defectTableData.slice(1),
            theme: 'grid',
            headStyles: {
                fillColor: accentColor,
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 9,
                textColor: [0, 0, 0]
            },
            alternateRowStyles: {
                fillColor: lightGray
            },
            margin: { left: 20, right: 20 }
        });

        yPosition = doc.lastAutoTable.finalY + 20;

        // Recommendations Section
        doc.setTextColor(255, 255, 255);
        doc.setFillColor(...primaryColor);
        doc.rect(20, yPosition, pageWidth - 40, 15, 'F');
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('RECOMMENDATIONS & ACTION ITEMS', 25, yPosition + 10);

        yPosition += 20;

        // Generate recommendations based on performance
        const recommendations = [];
        if (qualityScore < 90) {
            recommendations.push('• Review inspection parameters and calibration settings');
            recommendations.push('• Implement additional quality control checkpoints');
        }
        if (defectRate > 5) {
            recommendations.push('• Investigate root causes of high defect rate');
            recommendations.push('• Consider process optimization and training updates');
        }
        if (efficiency < 85) {
            recommendations.push('• Optimize system performance and reduce bottlenecks');
            recommendations.push('• Schedule preventive maintenance to improve efficiency');
        }
        if (throughput < 50) {
            recommendations.push('• Analyze workflow for potential speed improvements');
            recommendations.push('• Consider system upgrades for higher throughput');
        }

        // Add positive recommendations if performance is good
        if (qualityScore >= 95 && defectRate <= 3) {
            recommendations.push('• Excellent performance - maintain current standards');
            recommendations.push('• Document best practices for knowledge sharing');
            recommendations.push('• Consider this as a benchmark for other systems');
        }

        // Default recommendations
        if (recommendations.length === 0) {
            recommendations.push('• Continue monitoring system performance regularly');
            recommendations.push('• Maintain current inspection protocols');
            recommendations.push('• Schedule routine system health checks');
        }

        // Add general recommendations
        recommendations.push('• Generate weekly performance reports for trend analysis');
        recommendations.push('• Update defect classification models as needed');

        doc.setFillColor(...lightGray);
        doc.roundedRect(20, yPosition, pageWidth - 40, recommendations.length * 6 + 10, 3, 3, 'F');

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');

        recommendations.forEach((recommendation, index) => {
            doc.text(recommendation, 25, yPosition + 8 + (index * 6));
        });

        yPosition += recommendations.length * 6 + 20;

        // Footer
        const finalY = yPosition;
        if (finalY < pageHeight - 30) {
            doc.setFillColor(...darkBg);
            doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.text('AI Visual Inspection System - Comprehensive Report', 20, pageHeight - 10);
            doc.text(`Page 1 of 1 | Generated on ${currentDate.toLocaleDateString()}`, pageWidth - 80, pageHeight - 10);
        }

        // Save the PDF
        doc.save(`AI_Visual_Inspection_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    useEffect(() => {
        ConnectSocket();
    }, [ConnectSocket]);

    return (
        <div>
            <style>
                {`
                    @keyframes downloadArrow {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(3px); }
                        100% { transform: translateY(0px); }
                    }

                    .download-btn {
                        position: relative;
                        background: linear-gradient(135deg,rgba(235, 43, 43, 0.92) 50%,rgb(197, 92, 106) 100%);
                        border: none;
                        border-radius: 12px;
                        padding: 14px 24px;
                        color: white;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        overflow: hidden;
                        min-width: 200px;
                        justify-content: center;
                    }

                    .download-btn::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                        transition: left 0.5s;
                    }

                    .download-btn:hover::before {
                        left: 100%;
                    }

                    .download-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(167, 32, 22, 0.97);
                        background: linear-gradient(135deg,rgb(211, 13, 13) 0%,rgb(207, 34, 48) 100%);
                    }

                    .download-btn:active {
                        transform: translateY(0px);
                        box-shadow: 0 4px 15px rgba(187, 45, 45, 0.71);
                    }

                    .download-arrow {
                        display: inline-block;
                        transition: all 0.3s ease;
                        font-size: 18px;
                    }

                    .download-btn:hover .download-arrow {
                        animation: downloadArrow 1s ease-in-out infinite;
                    }

                    .download-text {
                        position: relative;
                        z-index: 1;
                    }

                    .download-icon {
                        position: relative;
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 20px;
                        height: 20px;
                    }
                        @media (max-width: 410px){
                        .download-btn{
                            width: 90px!important;
                        }
                `}
            </style>
            <button
                onClick={exportToPDF}
                className="download-btn"
            >
                <span className="download-text" style={{textWrap:"nowrap"}}>PDF Report</span>
                <div className="download-icon">
                    <span className="download-arrow">↓</span>
                </div>
            </button>
        </div>
    );
};

export default PDFReport;
