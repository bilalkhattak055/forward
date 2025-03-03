import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useWeekFilter } from "../../../../../Contexts/WeakGlobal";

const ModelAnalyticsHeader = ({ heading, hideWeekText = false, currentWeekDisable }) => {
 
  const { selectedWeek, setSelectedWeek,CurrentweekForLeaderBoard,setCurrentweekForLeaderBoard } = useWeekFilter(); 
  const getCurrentWeek = () => {
    const now = new Date();
    const oneJan = new Date(now.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      (((now.getTime() - oneJan.getTime()) / 86400000) + oneJan.getDay() + 1) / 7
    );
  
    if (currentWeekDisable) {
      // If currentWeekDisable is true, return the previous week
      const previousWeekNumber = weekNumber - 1;
      return previousWeekNumber > 0
        ? `${now.getFullYear()}-W${previousWeekNumber.toString().padStart(2, "0")}`
        : `${now.getFullYear() - 1}-W52`; // Handles edge case for the first week of the year
    }
  
    return `${now.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
  };
  

  const handleWeekChange = (e) => { 
    // setSelectedWeek(e.target.value);
    if(e.target.value !== '') { setCurrentweekForLeaderBoard(e.target.value)}
    else{ setCurrentweekForLeaderBoard(getCurrentWeek()) }
  };

  return (
    <>
      <style>
        {`
          .week-selector:focus {
            border-color: #80bdff;
            box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
          }

          .header-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          @media (max-width: 575.98px) {
            .header-container {
              flex-direction: column;
            }
            .week-selector {
              margin-top: 10px !important;
              width: auto !important;
            }
            .heading {
              font-size: 15px !important;
            }
          }
        `}
      </style>

      <Container fluid className="py-3">
        <Row className="header-container">
          <Col xs={12} className="d-flex align-items-center justify-content-between">
            <h4 className="heading">
              {heading} {!hideWeekText && `- ${CurrentweekForLeaderBoard}`}
            </h4> 
            <input
              type="week"
              id="weekSelector"
              value={CurrentweekForLeaderBoard}
              onChange={handleWeekChange} 
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                border: "1px solid #e2e8f0",
                width: "180px",
                fontSize: "0.875rem",
                backgroundColor: "#fff",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                outline: "none",
                transition: "all 0.2s ease",
              }}
              min="2024-W01"
              max={getCurrentWeek()}
              className="week-selector"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ModelAnalyticsHeader;