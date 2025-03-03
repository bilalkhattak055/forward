import React, { useEffect, useState } from 'react';
import { Card, CardBody, Progress, Tooltip } from 'reactstrap';
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import '../style/style.css';
import { errorToast } from '../../../../../../_helper/helper';
import AreaService from '../../../../../../api/areaService';

const NewBarChart = ({ progressData ,filters }) => {
    const [tooltipOpen, setTooltipOpen] = useState({});
    const [role, setrole] = useState(JSON.parse(localStorage.getItem('role')))
    const [userID, setuserID] = useState(JSON.parse(localStorage.getItem('userData'))?.id || '')
    const [factoryID, setfactoryID] = useState(JSON.parse(localStorage.getItem('userData'))?.factory?.id || '');
    const [ToolTipData, setToolTipData] = useState({}); 
    const [loading, setloading] = useState(true)

    const toggleTooltip = (id) => {
        setTooltipOpen((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle tooltip for the current progress bar
        }));
    };
    async function  fetchTooltipData (){
        try {
         setloading(true)
          console.log(filters,'current filters')
          const finalPyaload = {
            ...filters,
            shift:[filters?.shift || ''],
            user_id:userID,
            factory_id:factoryID,
            week:filters.weekly,
            "area_id": "",
            "areas": [],
            "date": "", 
            "starting": "",
            "ending": ''
          }
           
          console.log(finalPyaload)
          await AreaService.getAINewCards(finalPyaload).then((res)=>{
            const data=res?.data
            setToolTipData(data);
            setloading(false)
          })
          
         } catch (error) {
          console.log(error,'error while fetching progress bar tooltip data')
         }
    }
    const getMappedName = (name) => {
        const nameMap = {
            "Emergency Exit":'emergency_exit_blockage',
            "MMHE": 'forklift_person_in_same_aisle',
             "Machine Guard":"machine_guard_open", 
            Helmet: "Helmet",
            Vest: "Vest",
        };
        return nameMap[name] || name;
    };
    useEffect(() => { 
       fetchTooltipData()
    }, [filters])
    return (
        <Card
            className="progressbarParent p-0 m-0 custom-scroll"
            style={{ boxShadow: "none", height: "320px", overflow: "auto" }}
        >
            <style jsx>{`
                .custom-scroll {
                    scrollbar-width: thin;
                    scrollbar-color: #ECECEC;
                    background-color: white;
                }
                .custom-scroll::-webkit-scrollbar {
                    width: 8px;
                }
            `}</style>
    
            {progressData ? (
                progressData.map((item, key) => (
                    <CardBody
                        className="py-2 progressbarParentChild ps-0"
                        style={{ borderTop: "1px solid #ececec" }}
                        key={key}
                    >
                        <>
                            {item.barValue >= 0 && item.name !== 'Machine Guard' ? (
                                <>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ width: "70%" }}>
                                            <h5 style={{ fontSize: "16px" }}>
                                                {item.name === "Emergency Exit" ? "E.Exit" : item.name}
                                            </h5>
                                            <div className="mb-1" style={{ width: "100%" }}>
                                                <Progress
                                                    id={`progress_${key}`}
                                                    value={item.barValue}
                                                    color={
                                                        item.barValue >= 80
                                                            ? "success"
                                                            : item.barValue >= 50
                                                            ? "warning"
                                                            : "danger"
                                                    }
                                                    style={{ height: "8px", cursor: "pointer" }}
                                                />
                                                
                                                {role && role !== "area" ? (
                                                    <Tooltip
                                                        placement="top"
                                                        isOpen={tooltipOpen[`progress_${key}`]}
                                                        target={`progress_${key}`}
                                                        toggle={() => toggleTooltip(`progress_${key}`)}
                                                        style={{
                                                            background: "#333333",
                                                            color: "white",  
                                                            borderRadius: "5px", 
                                                            padding:'5px' 
                                                        }}
                                                    >
                                                        {loading?'Retrieving data...':<>
                                                        
                                                        {ToolTipData[getMappedName(item.name)] ? (
                                                            <> 
                                                                <p className='text-start m-0' style={{fontSize:'12px'}}>
                                                                    Total Frames:  {ToolTipData[getMappedName(item.name)].total_frames}
                                                                </p>
                                                                <p className='text-start m-0' style={{fontSize:'12px'}}>
                                                                    Total Events:  {ToolTipData[getMappedName(item.name)].total_event}
                                                                </p> 
                                                                <p className='text-start m-0' style={{fontSize:'12px'}}>
                                                                   Compliance:   {ToolTipData[getMappedName(item.name)].total_compliance}
                                                                </p> 
                                                                <p className='text-start m-0' style={{fontSize:'12px'}}>
                                                                    Non Compliance:  {ToolTipData[getMappedName(item.name)].total_alerts}
                                                                </p>
                                                            </>
                                                        ) : (
                                                            <div>No data available</div>
                                                        )}
                                                        </>}
                                                    </Tooltip>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {/* {item.trend === "uptrend" ? (
                                                <IoIosArrowRoundUp style={{ fontSize: "25px", color: "#54ba4a" }} />
                                            ) : (
                                                <IoIosArrowRoundDown style={{ fontSize: "25px", color: "#ff0000" }} />
                                            )} */}
                                            <span>{item.barValue}%</span>
                                        </div>
                                    </div>
                                    <section>
                                        <div className="d-flex justify-content-between flex-wrap">
                                            <p className="m-0" style={{ color: "#8C8C8C", fontSize: "12px" }}>
                                                Max Alerts by: <span style={{ color: "black" }}>{item.area_owner || "N/A"}</span>
                                            </p>
                                            <p className="m-0" style={{ color: "#8C8C8C", fontSize: "12px" }}>
                                                Total Alerts: <span style={{ color: "black" }}>{item.alerts || "0"}</span>
                                            </p>
                                        </div>
                                        <p className="m-0 p-0" style={{ color: "#8C8C8C", fontSize: "12px" }}>
                                            Sub Area: <span style={{ color: "black" }}>{item.subarea_with_max_alerts || "N/A"}</span>
                                        </p>
                                        <p className="m-0 p-0" style={{ color: "#8C8C8C", fontSize: "12px" }}>
                                            Sub Area Max-alerts: <span style={{ color: "black" }}>{item.max_alerts || item.alerts}</span>
                                        </p>
                                    </section>
                                </>
                            ) : (
                                <>
                                    <h5 style={{ fontSize: "16px" }}>
                                        {item.name === "Emergency Exit" ? "E.Exit" : item.name}
                                    </h5>
                                    <p className="f-light">Module not available</p>
                                </>
                            )}
                        </>
                    </CardBody>
                ))
            ) : (
                "No data found"
            )}
        </Card>
    );
    
    
};

export default NewBarChart;
