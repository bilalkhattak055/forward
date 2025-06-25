import React, { useEffect } from "react";
import PannelData from "../Zustand/DataSender";
import * as XLSX from 'xlsx';

const ExcelReport = () => {
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

    // Helper function to apply cell styling
    const applyStyle = (ws, cell, style) => {
        if (!ws[cell]) ws[cell] = {};
        ws[cell].s = style;
    };

    // Helper function to merge cells
    const mergeCells = (ws, range) => {
        if (!ws['!merges']) ws['!merges'] = [];
        ws['!merges'].push(XLSX.utils.decode_range(range));
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        
        // Create Summary Sheet with enhanced formatting
        const summaryData = [];
        
        // Company Header Section
        summaryData.push(['AI BASED REELS INSPECTION SYSTEM']);
        summaryData.push(['COMPREHENSIVE INSPECTION REPORT']);
        summaryData.push(['']);
        summaryData.push(['Report Generated:', new Date().toLocaleDateString(), '', 'Time:', new Date().toLocaleTimeString()]);
        summaryData.push(['Inspector:', 'System AI', '', 'Status:', 'Completed']);
        summaryData.push(['']);
        summaryData.push(['']);

        // Executive Summary Section
        summaryData.push(['EXECUTIVE SUMMARY']);
        summaryData.push(['']);
        summaryData.push(['INSPECTION OVERVIEW']);
        summaryData.push(['Metric', 'Count', 'Percentage', 'Status']);
        summaryData.push(['Total Panels Inspected', InspectedPannels, '100.00%', '✓ Complete']);
        summaryData.push(['Panels Passed (OK)', OkayPannel, `${((OkayPannel / InspectedPannels) * 100).toFixed(2)}%`, OkayPannel > DefectedPannnels ? '✓ Good' : '⚠ Review']);
        summaryData.push(['Panels Failed (Defective)', DefectedPannnels, `${((DefectedPannnels / InspectedPannels) * 100).toFixed(2)}%`, DefectedPannnels === 0 ? '✓ Excellent' : '⚠ Action Required']);
        summaryData.push(['']);
        summaryData.push(['']);

        // Quality Metrics Section
        const qualityScore = ((OkayPannel / InspectedPannels) * 100).toFixed(1);
        let qualityGrade = 'F';
        if (qualityScore >= 95) qualityGrade = 'A+';
        else if (qualityScore >= 90) qualityGrade = 'A';
        else if (qualityScore >= 80) qualityGrade = 'B';
        else if (qualityScore >= 70) qualityGrade = 'C';
        else if (qualityScore >= 60) qualityGrade = 'D';

        summaryData.push(['QUALITY ASSESSMENT']);
        summaryData.push(['']);
        summaryData.push(['Quality Score', `${qualityScore}%`, '', 'Grade', qualityGrade]);
        summaryData.push(['Defect Rate', `${((DefectedPannnels / InspectedPannels) * 100).toFixed(2)}%`, '', 'Recommendation', DefectedPannnels === 0 ? 'Maintain Standards' : 'Improve Process']);
        summaryData.push(['']);
        summaryData.push(['']);

        // Defect Analysis Section
        summaryData.push(['DEFECT ANALYSIS BREAKDOWN']);
        summaryData.push(['']);
        summaryData.push(['Defect Type', 'Count', 'Percentage of Defects', 'Severity Level', 'Priority']);

        const totalDefects = Object.values(DefectedType).reduce((sum, val) => 
            sum + (typeof val === 'string' ? parseInt(val, 10) : val), 0);

        defectTypes.forEach(defect => {
            const percentage = totalDefects > 0 ? ((defect.value / totalDefects) * 100).toFixed(2) : '0.00';
            const severity = defect.isActive ? 'HIGH' : defect.value > 0 ? 'MEDIUM' : 'LOW';
            const priority = defect.isActive ? '🔴 Critical' : defect.value > 0 ? '🟡 Monitor' : '🟢 Normal';
            
            summaryData.push([
                defect.label,
                defect.value,
                `${percentage}%`,
                severity,
                priority
            ]);
        });

        summaryData.push(['']);
        summaryData.push(['']);

        // Recommendations Section
        summaryData.push(['RECOMMENDATIONS & ACTIONS']);
        summaryData.push(['']);
        if (DefectedPannnels === 0) {
            summaryData.push(['• Excellent quality control maintained']);
            summaryData.push(['• Continue current inspection protocols']);
            summaryData.push(['• Regular monitoring recommended']);
        } else {
            summaryData.push(['• Review defective panels for root cause analysis']);
            summaryData.push(['• Implement corrective measures for high-priority defects']);
            summaryData.push(['• Schedule follow-up inspection within 24 hours']);
            summaryData.push(['• Update quality control procedures if needed']);
        }

        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);

        // Apply comprehensive styling
        const range = XLSX.utils.decode_range(summarySheet['!ref']);

        // Main Title Styling
        applyStyle(summarySheet, 'A1', {
            font: { sz: 20, bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "1B365D" } },
            alignment: { horizontal: "center", vertical: "center" },
            border: {
                top: { style: "thick", color: { rgb: "1B365D" } },
                bottom: { style: "thick", color: { rgb: "1B365D" } },
                left: { style: "thick", color: { rgb: "1B365D" } },
                right: { style: "thick", color: { rgb: "1B365D" } }
            }
        });

        // Subtitle Styling
        applyStyle(summarySheet, 'A2', {
            font: { sz: 14, bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "00A04A" } },
            alignment: { horizontal: "center", vertical: "center" },
            border: {
                top: { style: "thin", color: { rgb: "00A04A" } },
                bottom: { style: "thin", color: { rgb: "00A04A" } },
                left: { style: "thin", color: { rgb: "00A04A" } },
                right: { style: "thin", color: { rgb: "00A04A" } }
            }
        });

        // Merge cells for titles
        mergeCells(summarySheet, 'A1:E1');
        mergeCells(summarySheet, 'A2:E2');

        // Section Headers Styling
        const sectionHeaders = [8, 16, 22, 32]; // Row numbers for section headers
        sectionHeaders.forEach(row => {
            const cell = `A${row + 1}`;
            applyStyle(summarySheet, cell, {
                font: { sz: 14, bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "2E75B6" } },
                alignment: { horizontal: "left", vertical: "center" },
                border: {
                    top: { style: "medium", color: { rgb: "2E75B6" } },
                    bottom: { style: "medium", color: { rgb: "2E75B6" } },
                    left: { style: "medium", color: { rgb: "2E75B6" } },
                    right: { style: "medium", color: { rgb: "2E75B6" } }
                }
            });
            mergeCells(summarySheet, `A${row + 1}:E${row + 1}`);
        });

        // Table Headers Styling
        const tableHeaderRows = [11, 18, 24];
        tableHeaderRows.forEach(row => {
            for (let col = 0; col < 5; col++) {
                const cell = XLSX.utils.encode_cell({ r: row, c: col });
                applyStyle(summarySheet, cell, {
                    font: { sz: 11, bold: true, color: { rgb: "FFFFFF" } },
                    fill: { fgColor: { rgb: "4F81BD" } },
                    alignment: { horizontal: "center", vertical: "center" },
                    border: {
                        top: { style: "thin", color: { rgb: "000000" } },
                        bottom: { style: "thin", color: { rgb: "000000" } },
                        left: { style: "thin", color: { rgb: "000000" } },
                        right: { style: "thin", color: { rgb: "000000" } }
                    }
                });
            }
        });

        // Data Rows Styling
        for (let R = 0; R <= range.e.r; R++) {
            for (let C = 0; C <= Math.min(range.e.c, 4); C++) {
                const cell = XLSX.utils.encode_cell({ r: R, c: C });
                if (!summarySheet[cell]) continue;

                // Skip styled headers
                if (sectionHeaders.includes(R) || tableHeaderRows.includes(R) || R === 0 || R === 1) continue;

                // Data rows styling
                if (R === 12 || R === 13 || R === 14 || (R >= 19 && R <= 20) || (R >= 25 && R <= 25 + defectTypes.length)) {
                    const isAlternate = (R % 2 === 0);
                    applyStyle(summarySheet, cell, {
                        font: { sz: 10, color: { rgb: "000000" } },
                        fill: { fgColor: { rgb: isAlternate ? "F2F2F2" : "FFFFFF" } },
                        alignment: { horizontal: "center", vertical: "center" },
                        border: {
                            top: { style: "thin", color: { rgb: "CCCCCC" } },
                            bottom: { style: "thin", color: { rgb: "CCCCCC" } },
                            left: { style: "thin", color: { rgb: "CCCCCC" } },
                            right: { style: "thin", color: { rgb: "CCCCCC" } }
                        }
                    });
                }

                // Info rows styling
                if (R === 4 || R === 5) {
                    applyStyle(summarySheet, cell, {
                        font: { sz: 10, italic: true, color: { rgb: "666666" } },
                        alignment: { horizontal: "left", vertical: "center" }
                    });
                }
            }
        }

        // Set column widths for better appearance
        summarySheet['!cols'] = [
            { wch: 35 }, // Column A - Labels
            { wch: 15 }, // Column B - Values
            { wch: 20 }, // Column C - Percentages
            { wch: 20 }, // Column D - Status/Severity
            { wch: 25 }  // Column E - Priority/Grade
        ];

        // Add the summary sheet
        XLSX.utils.book_append_sheet(wb, summarySheet, 'Inspection Report');

        // Create a detailed defects sheet
        const detailsData = [
            ['DETAILED DEFECT ANALYSIS'],
            [''],
            ['Defect Type', 'Count', '% of Total Defects', '% of Total Panels', 'Classification', 'Action Required'],
        ];

        defectTypes.forEach(defect => {
            const defectPercentage = totalDefects > 0 ? ((defect.value / totalDefects) * 100).toFixed(2) : '0.00';
            const panelPercentage = ((defect.value / InspectedPannels) * 100).toFixed(2);
            const classification = defect.isActive ? 'Critical Issue' : defect.value > 0 ? 'Monitor Closely' : 'Within Limits';
            const action = defect.isActive ? 'Immediate Review' : defect.value > 0 ? 'Investigate Cause' : 'Continue Monitoring';
            
            detailsData.push([
                defect.label,
                defect.value,
                `${defectPercentage}%`,
                `${panelPercentage}%`,
                classification,
                action
            ]);
        });

        const detailsSheet = XLSX.utils.aoa_to_sheet(detailsData);
        
        // Style the details sheet
        applyStyle(detailsSheet, 'A1', {
            font: { sz: 16, bold: true, color: { rgb: "FFFFFF" } },
            fill: { fgColor: { rgb: "1B365D" } },
            alignment: { horizontal: "center", vertical: "center" }
        });
        mergeCells(detailsSheet, 'A1:F1');

        // Style headers in details sheet
        for (let col = 0; col < 6; col++) {
            const cell = XLSX.utils.encode_cell({ r: 2, c: col });
            applyStyle(detailsSheet, cell, {
                font: { sz: 11, bold: true, color: { rgb: "FFFFFF" } },
                fill: { fgColor: { rgb: "4F81BD" } },
                alignment: { horizontal: "center", vertical: "center" },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            });
        }

        detailsSheet['!cols'] = [
            { wch: 25 }, { wch: 12 }, { wch: 18 }, { wch: 18 }, { wch: 20 }, { wch: 25 }
        ];

        XLSX.utils.book_append_sheet(wb, detailsSheet, 'Detailed Analysis');

        // Save the enhanced file
        XLSX.writeFile(wb, `AI_Inspection_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
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

                    .download-button {
                        position: relative;
                        background: linear-gradient(135deg,rgb(7, 168, 56) 50%,rgb(90, 226, 120) 100%);
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

                    .download-button::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                        transition: left 0.5s;
                    }

                    .download-button:hover::before {
                        left: 100%;
                    }

                    .download-button:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(39, 148, 80, 0.4);
                        background: linear-gradient(135deg,rgb(13, 184, 36) 0%,rgb(112, 192, 136) 100%);
                    }

                    .download-button:active {
                        transform: translateY(0px);
                        box-shadow: 0 4px 15px rgba(20, 121, 45, 0.3);
                    }

                    .download-arrows {
                        display: inline-block;
                        transition: all 0.3s ease;
                        font-size: 18px;
                    }

                    .download-button:hover .download-arrows {
                        animation: downloadArrow 1s ease-in-out infinite;
                    }

                    .download-text {
                        position: relative;
                        z-index: 1;
                    }

                    .download-icons{
                        position: relative;
                        z-index: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 20px;
                        height: 20px;
                    }
                        @media (max-width: 410px){
                        .download-button{
                            width: 50px!important;
                        }
        }
                `}
            </style>
            <button
                onClick={exportToExcel}
                className="download-button"
            >
                <span className="download-text"  style={{textWrap:"nowrap"}}>Excel Report</span>
                <div className="download-icons">
                    <span className="download-arrows">↓</span>
                </div>
            </button>
        </div>
    );
};

export default ExcelReport;