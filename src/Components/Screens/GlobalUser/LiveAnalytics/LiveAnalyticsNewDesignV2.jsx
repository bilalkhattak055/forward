import React, {
    Fragment,
    useContext,
    useEffect,
    useRef,
    useState,
  } from "react";
  import {
    Card,
    Container,
    Row,
    Col,
    CardBody,
    CardHeader,
  } from "react-bootstrap";
  import Loader3 from "../../../../CommonElements/Spinner/loader3";
  import { RecentOrderChart } from "./analytics_data_temp";
  import ReactApexChart from "react-apexcharts";
  import { ArrowDown, ArrowUp, Filter } from "react-feather";
  import "../AIModelReports/custom.css";
  import { errorToast, getWeek, infoToast, showConfirmationAlert, successToast } from "../../../../_helper/helper";
  import { dummyJSON, Shifts } from "../../../../Data/staticData/data";
  import ApexInteractiveHeatmap from "./components/HeatMap";
  import ProgressBars from "./components/ProgressBars";
  import AlertsTrendChart from "./components/AlertsTrendChart";
  import AreaService from "../../../../api/areaService";
  import { getCurrentWeekNumber } from "../../../../utils/getCurrentWeekNumber";
  import CameraService from "../../../../api/cameraService";
  import { getCurrentWeekWithYear } from "../../../../utils/currentWeekWithYear";
  import { analyticsPageService } from "../../../../api/analyticsPageService";
  import CommonFIlterButton from "../../../Common/commonFilterButton/CommonFIlterButton";
  import { Input } from "reactstrap";
  import "./components/alertTrend.css";
  import { LuBuilding2 } from "react-icons/lu";
  import { TiLocationArrowOutline } from "react-icons/ti";
  import { GoLocation } from "react-icons/go";
  import { MdAccessTime } from "react-icons/md";
  import { IoIosInformationCircleOutline } from "react-icons/io";
  import { TbAlertSquareRounded } from "react-icons/tb";
  import { FaCamera } from "react-icons/fa";
  import { GiCctvCamera } from "react-icons/gi";
  import { formatMonth, formatWeek } from "../../../../utils/formatDate";
  import LiveAnalyticsContext from "../../../../_helper/formData/LiveAnalytics/LiveAnalytics";
  import NewCommonFIlterButton from "../../../Common/commonFilterButton/NewCommonFIlterButton";
  import FactoryService from "../../../../api/factoryService";
import NewCameraCount from "./New componens/Cards/NewCameraCount";
import NewAIAccuracy from "./New componens/Cards/NewAIAccuracy";
import HighestOrHighSeverity from "./New componens/Cards/highestOrHighSeverity";
import NewDonutChart from './New componens/Grapgh/NewDonutChart'
import NewBarChart from "./New componens/Grapgh/NewBarChart";
import NewHeatmap from './New componens/Grapgh/NewHeatMap'
import { useWindowSize } from './New componens/CustomHook/Check_Screen_Width'
  
  const LiveAnalyticsScreen = ({FactoryID,GlobalSummaryFlag,GlobalHeading,GlobalSubHeading}) => {
    const { width } = useWindowSize(); 
    const [loadingForDonut, setLoadingForDonut] = useState(true)
    const [loadingForBars, setLoadingForBars] = useState(false)
    const [heatmapLoader, setHeatmapLoader] = useState(true)
    const [connectivityLoader, setConnectivityLoader] = useState(true)
    const [acuuracyLoader, setAccuracyLoader] = useState(true)
    const [accuracyPercent, setAccuracyPercent] = useState();
    const [week, setWeek] = useState(null)
    const [accuracySectionData, setAccuracySectionData] = useState({
      aiAccuracy: undefined,
      connectivity: undefined,
      highSeverityAlerts: undefined,
      maxAlerts: undefined,
    });
    const {
      overAllComplaince,
      setOverAllComplaince,
      progressContext,
      setProgressContext,
      aiAccuracyContext,
      setAiAccuracyContext,
      cameraCountContext,
      setCameraCountContext,
      highestAlerts,
      setHighestAlerts,
      highSeverityContext,
      sethighSeverityContext,
     heatmapcontext,
    alerttrendcontext,
      setheatdatacontext, 
      wholePageSS,
      
      setdashfiltercontext
  } = useContext(LiveAnalyticsContext)
  
  
  
    const [HeatmapLoaderForConnect, setHeatmapLoaderForConnect] = useState(true);
    const [focusClass, setFocusClass] = useState("");
    const [correctPercent, setCorrectPercent] = useState();
    const [severityAlertsData, setSevirityAlertsData] = useState();
    const [severityLoader, setSevirityLoader] = useState(true);
    const [recentOrderChart, setRecentOrderChart] = useState(RecentOrderChart);
    const [DonutSeries, setDonutSeries] = useState();
    const [extractedData, setExtractedData] = useState({
      maxAlerts: 0,
      module: "",
      camera: "",
      owner: "",
      subArea: "",
    });
    const [heatmapData, setHeatmapData] = useState({
      areas: [],
      subAreas: [],
      areaOwner: [],
      data: [],
    });
    const [selectedFactory, setSelectedFactory] = useState("");
    const [factoryList, setFactoryList] = useState([]);
    const [progressData, setProgressData] = useState(undefined);
    const [chartData, setChartData] = useState({
      categories: [],
      series: [],
    });
    const [loader, setLoader] = useState(false);
    const [userData, setUserData] = useState({});
  
    //heatmap filter states 
    const [filters, setFilters] = useState(JSON.parse(localStorage.getItem("dashfilters")) || {
      weekly: getCurrentWeekWithYear(),
      month: "",
      shift: "",
    });
  
    const [highseverityCardData, sethighseverityCardData] = useState({
      max_alerts: '',
      highSeverity: ''
    })

    const [highseverityCardLoader, sethighseverityCardLoader] = useState(true)
    const [factoryID, setfactoryID] = useState(FactoryID? FactoryID : JSON.parse(localStorage.getItem('userData')).factory.id || 0)
  
    const initialSync = useRef(false);
    const initialLoad = useRef(true); 
    // useEffect(() => {
    //   let fils = JSON.parse(localStorage.getItem('dashfilters'))
    //   if(!fils){
    //    fils = localStorage.setItem('dashfilters',JSON.stringify(filters))
    //   }
    //   else{
    //     setFilters(fils)
    //   }
    
     
    // }, [])
    
   
    useEffect(() => {
      let fils = JSON.parse(localStorage.getItem('dashfilters'))
      if(!fils){
        localStorage.setItem('dashfilters', JSON.stringify(filters))
      }
      setHeatmapLoader(true);
      fetchAnalyticsBars();
      modelAccuracy();
      getHighSeverityCardData();
      setLoader(true);
      fetchHeatmapData();
      getfactorycamerascount(); 
     
      // fetchSevirityData()xsx
      // fetchFactories();
      // fetchAnlyticsData()
      // fetchHeatmapDataForConnetivity()
      // return () => unsubscribe;
    }, [filters]);
  
    
  
    const getHighSeverityCardData = async () => {
      sethighseverityCardLoader(true);
      const fils = JSON.parse(localStorage.getItem("dashfilters"));
      try {
        const payload = {
          area: "",
          factory_id: factoryID,
          ...fils,
        };
        const res = await AreaService.highseverityAlerts(payload);
        if (res.status == 200) {
          console.log(res.data, "current high severity card");
          sethighseverityCardData({
            max_alerts: res?.data?.highest_alert_card,
            highSeverity: res?.data?.highest_severity_alert_card,
          });
          setHighestAlerts({
            max_alerts: res?.data?.highest_alert_card,
            highSeverity: res?.data?.highest_severity_alert_card,
          });
          sethighseverityCardLoader(false);
        }
      } catch (error) {
        errorToast("Error while fetching high severity alert data");
      }
    };
     
    async function fetchAnalyticsBars() {
      setLoadingForBars(true);
      setLoadingForDonut(true);
      const userID = JSON.parse(localStorage.getItem("userData"))?.id;
      const fils = JSON.parse(localStorage.getItem("dashfilters"));
      console.log('api fils', filters)
      try {
        const payload = {
          ...fils,
          areaname: "",
          area_ids: [],
          user_id: userID,
          factory_id: factoryID,
        };
        const res = await AreaService.fetchAnalyticsProgressGbl(payload);
        console.log("resresres", res);
        console.log(res?.data, "progressss barr for factoryy");
        if (res.status == 200) {
          const validBarValues = res?.data?.progressData.filter(
            (item) => item.barValue > 0
          );
          const totalBarValue = validBarValues.reduce(
            (sum, item) => sum + item.barValue,
            0
          );
          const averageBarValue =
            validBarValues.length > 0 ? totalBarValue / validBarValues.length : 0;
          console.log("Average Bar Value:", averageBarValue);
  
          // Store the average in an array
          // const totalNumber = [Math.round(res?.data?.overall_compliance)];
          setRecentOrderChart((recentOrderChart) => ({
            ...recentOrderChart,
            series: [Math.round(averageBarValue).toFixed(0)], // Update series with parsed data
          }));
  
          setOverAllComplaince(Math.round(averageBarValue).toFixed(0));
  
          const updatedData = res?.data?.progressData.map((item) => ({
            ...item,
            tooltipContent: [
              {
                label: "Max alerts by",
                value: `${
                  item.area_with_max_alerts ? item.area_with_max_alerts : "N/A"
                } ${item.area_owner ? `(${item.area_owner})` : ""} `,
              },
              { label: "Sub Area", value: `${item.subarea_with_max_alerts}` },
              { label: "Max Alerts", value: `${item.max_alerts}` },
              { label: "Total Alerts", value: `${item.alerts}` },
            ],
          }));
  
          setProgressData(updatedData);
          setProgressContext(updatedData);
        }
        setLoadingForBars(false);
        setLoadingForDonut(false);
      } catch (err) {
        console.log("Analytics page, Progress bars section error", err);
        setLoadingForBars(false);
        setLoadingForDonut(false);
      }
    } 
    const hasActiveFilter = (fil) => { 
      const { weekly, month } = fil;
      return weekly !== "" || month !== "";
    }; 
    async function fetchHeatmapData() {
      const userID = JSON.parse(localStorage.getItem("userData"))?.id || "";
      setUserData(JSON.parse(localStorage.getItem('userData')))
      let fils = JSON.parse(localStorage.getItem("dashfilters"));
  
      if (!fils) {
        localStorage.setItem("dashfilters", JSON.stringify(filters));
        fils = JSON.parse(localStorage.getItem("dashfilters"));
      } 
      // else{
      //   setFilters(fils)
      // }
      let payload = {
        ...fils,
        user_id: userID,
        factory_id: factoryID,
      };
      try {
        setHeatmapLoader(true);
        setdashfiltercontext((prev)=>({
          ...prev,
          month:payload.month,
          weekly:payload.weekly,
          shift:payload.shift
        }))
        const res = await AreaService.fetchAnalyticsHeatmapGbl(payload)
        if (res.status == 200) {
          setHeatmapData(res?.data?.heatmapData);
          setheatdatacontext(res?.data?.heatmapData)
         
        }
        setHeatmapLoader(false);
      } catch (err) {
        console.log("Analytics page, Heatmap chart error", err);
        setHeatmapLoader(false);
      }
    } 
    const [connectivityFactoryLoader, setconnectivityFactoryLoader] =
      useState(true);
    const [factoryCamerasCount, setfactoryCamerasCount] = useState();
    const getfactorycamerascount = async () => {
      setconnectivityFactoryLoader(true);
      try {
        const res = await CameraService.factoryCameras(factoryID);
        if (res) {
          setfactoryCamerasCount(res.data.data);
          setCameraCountContext(res?.data?.data);
          setconnectivityFactoryLoader(false);
        }
      } catch (error) {
        console.log(error);
        errorToast("Error while fetching factory cameras");
      }
    };
 
  
    async function modelAccuracy() {
      setAccuracyLoader(true);
      const pID = JSON.parse(localStorage.getItem("userData"))?.id;
      const fils = JSON.parse(localStorage.getItem("dashfilters"));
  
      const payload = {
        user_id: pID,
        identifier: fils.weekly ? "week" : "month",
        factory_id: factoryID,
        filters: {
          approval: "Select Approval",
          module: "",
          severity: "",
          shift: [fils.shift],
          date: "",
          week: fils.weekly,
          month: fils.month,
          starting: "",
          ending: "",
          area: "",
          subarea: "",
        },
        pagination: {
          page_no: 1,
          per_page: 21,
        },
      };
  
      try {
        // const res = await AreaService.getModelAccuracyChart(payload);
        const res = await AreaService.getFilterAlerts(payload);
        if (res?.statusText?.toLocaleLowerCase() == "ok") { 
          const accepted = res?.data?.data?.accepted_records;
          const rejected = res?.data?.data?.rejected_records;
          const percentage_new = (accepted / (accepted + rejected)) * 100;
  
          setAccuracyPercent(Math.round(percentage_new));
          setAiAccuracyContext(Math.round(percentage_new));
        }
        setAccuracyLoader(false);
      } catch (err) {
        console.log("Ai accuracy error", err);
        setAccuracyLoader(false);
      }
    }
  
    //heatmap filters logic
    const handleInputChange = (e, field) => {
      const { value } = e.target;
  
      setFilters((prev) => {
        const update = {
          ...prev,
          [field]: value,
        };
  
        localStorage.setItem("dashfilters", JSON.stringify(update));
        return update;
      });
    };
    const handleWeekChange = (e) => {
      const { value } = e.target;
  
      // setFilters({
      //   ...filters,
      //   month: '',
      //   weekly: value,
      // });
  
      setFilters((prev) => {
        const update = {
          ...prev,
          month: "",
          weekly: !value ? getCurrentWeekWithYear() : value,
        };
  
        localStorage.setItem("dashfilters", JSON.stringify(update));
        return update;
      });
    };
    const handleMonthChange = (e) => {
      const { name, value } = e.target;
  
      // console.log(name, 'name', value, 'value')
      // setFilters({
      //   ...filters,
      //   weekly: '',
      //   [name]: value,
      // });
  
      setFilters((prev) => {
        const update = {
          ...prev,
          weekly: !value ? getCurrentWeekWithYear() : "",
          [name]: value,
        };
  
        localStorage.setItem("dashfilters", JSON.stringify(update));
        return update;
      });
    };
  
    //filters new code
    //filters states
    const [showFilters, setShowFilters] = useState(false);
    const filterCardRef = useRef(null);
    const filterButton = useRef(null);
  
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          filterCardRef.current &&
          filterButton.current &&
          !filterCardRef.current.contains(event.target) &&
          !filterButton.current.contains(event.target)
        ) {
          setShowFilters(false);
        }
      }
  
      // Add event listener to detect clicks outside of the element
      document.addEventListener("mousedown", handleClickOutside);
  
      // Cleanup listener on component unmount
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [showFilters]);
  
    const renderFilters = () => {
      const transformFilterValue = (value, key) => {
        if (key === "month") {
          return formatMonth(value);
        }
        if (key === "weekly") {
          return formatWeek(value);
        }
        return value;
      };
  
      const activeFilters = Object.entries(filters)
        .filter(
          ([key, value]) =>
            ["shift", "month", "weekly"].includes(key) && Boolean(value)
        )
        .map(([key, value]) => transformFilterValue(value, key));
  
      return activeFilters.length >= 2
        ? `${activeFilters[0]} and ${activeFilters[1]}`
        : activeFilters.length === 1
        ? activeFilters[0]
        : "";
    }; 
    const filterButtonstyle = {
      width: "155px",
      height: "38px",
      fontSize: 13,
      margin: "0",
    }; 
    
    // factory change dropdown --------------x---------------------------x-------------
    // const fetchFactories = () => {
    //   FactoryService.getAllFactories()
    //     .then((res) => {
    //       setFactoryList(res.data?.data);
    //       const user = JSON.parse(localStorage.getItem("userData"));
    //       setSelectedFactory(user ?user?.factory?.id: 0)
    //     })
    //     .catch((e) => {});
    // };
    // const handleFilterChangeNew = (e) => {
    //   const val=parseInt(e.target.value)
    //   setSelectedFactory(val);
    //   if(val !== 0){
    //   var get_user_data=JSON.parse(localStorage.getItem('userData')) 
    //   showConfirmationAlert("Are you sure you want to change your factory?","Yes")
    //   .then((result) => {
    //     if (result.value) {
    //       const payload = {
    //         user_id: get_user_data?.id,
    //         factory_id: val,
    //       };
  
    //       FactoryService.updateUserFactory(payload)
    //         .then((res) => {
    //           if (res?.status === 200) {
    //             successToast(res?.data?.message);
    //             get_user_data.factory={ id:res?.data?.data?.factory_id, name:res?.data?.data?.factory_name}
    //             localStorage.setItem('userData',JSON.stringify(get_user_data)) 
    //             window.location.reload();
                
    //           } else {
    //             infoToast(res?.data?.message);
    //           }
    //         })
    //         .catch((err) => {
    //           if (err?.status === 404) {
    //             errorToast(err?.statusText);
    //           } else {
    //             errorToast(err?.response?.data?.message);
    //           }
    //         });
    //     }
    //   })
    //   .catch((error) => {});
    // }
  
    //   // console.log('e.target.value', e.target.value)
    //   // setFilters((prevFilters) => {
    //   //   const newFilter = {
    //   //     ...prevFilters,
    //   //     [field]: e.target.value,
    //   //   };
    //   //   return newFilter;
    //   // });
    //   // fetchDropdownOptions(e.target.value.split('-')[1])
    //   // setDropdownOptions((prevOptions) => ({
    //   //   ...prevOptions,
    //   //   area_list: prevOptions.area_list.filter((f) => f.factory_id !== e.target.value.split('-')[1])
    //   // }));
    // };
  // factory change dropdown end --------------x---------------------------x-------------
    return (
      <Fragment>
        <br />
        <Container ref={wholePageSS} fluid={true}>
          {GlobalSummaryFlag?<> 
          {GlobalHeading?<h4 className="mb-3" style={{fontSize:'24px'}}>Summary {renderFilters() ? renderFilters() : 'Year 2025'}</h4>:null}
          </>:
          <Row className="d-flex justify-content-center mb-2 px-1">
            <Col xs="12" sm="7" md="6" className=" pt-1">
              <h5 className="">
               {GlobalSummaryFlag?<span style={{ fontSize: '24px' }}>Summary</span>:null} {renderFilters() ? renderFilters() : 'Year 2025'}
              </h5>
            </Col>
            <Col
              xs="12"
              sm="5"
              md="6"
              className=" d-flex flex-row flex-md-row flex-column mt-2 mt-sm-0 flex-wrap justify-content-end align-items-end filter-container align-self-end"
            >
              {/* <NewCommonFIlterButton
                data={factoryList?.map((f) => f.name + "-" + f.factory_id)}
                handleInputChange={handleFilterChangeNew}
                style={style}
                selectedItem={selectedFactory}
                firstOption={"Select Factory"}
                inputChangeOption={"factory"}
                className={""}
              /> */}
  
              {/* Factory dropdown */}
  
            {/* {userData?.id === 129 &&  <Input
                className={`rounded-3`}
                type="select"
                name="factory"
                id="factory"
                style={style}
                value={selectedFactory}
                onChange={handleFilterChangeNew}
              >
                <option value="0">Select Factory</option>
                
  
                {factoryList &&
                  factoryList?.map((item, index) => (
                    <option
                      style={{ width: "80%" }}
                      className="ellipsis-textt"
                      key={index}
                      value={item?.factory_id}
                    >
                      {item?.name}
                    </option>
                  ))}
              </Input>} */}
  
               {/* Factory dropdown end */}
              <div
                type="button"
                className={`d-flex justify-content-center filter-btnn  ${
                  showFilters && "border_R"
                }`}
                ref={filterButton}
                onClick={() => setShowFilters(!showFilters)}
              >
                <p className="m-0" style={{ fontSize: "16px" }}>
                  Filters
                </p>
                <span className="d-flex">
                  <Filter color="#fff" size={16} className="ms-2 " />
                </span>
              </div>
              <div className="w-100 d-flex justify-content-end position-relative">
                {showFilters && (
                  <div
                    className={`d-flex align-items-center justify-content-center py-3 gap-2 filter-card flex-wrap shadow-sm`}
                    ref={filterCardRef}
                  >
                    <CommonFIlterButton
                      data={Shifts}
                      handleInputChange={handleInputChange}
                      style={filterButtonstyle}
                      selectedItem={filters?.shift}
                      firstOption={"Select Shift"}
                      inputChangeOption={"shift"}
                      clName={` ${
                        filters?.shift && focusClass
                      } filter-button-size`}
                    />
                    <div className="d-flex rounded-3 position-relative flex-column justify-content-center gap-2 flex-md-row flex-wrap">
                      {!filters?.weekly && (
                        <span className="filters-weekly-span">Select Week</span>
                      )}
                      <Input
                        className={`filter-button-size margin-for-weekly input-border-class-weekly m-0
                            //  ${
                              filters.weekly && focusClass ? focusClass : ""
                            }`}
                        type="week"
                        name="week"
                        id="week"
                        max={getCurrentWeekWithYear()}
                        value={filters.weekly || ""}
                        placeholder="Select Week"
                        style={{ ...filterButtonstyle }} // Remove right border-radius for the first button
                        onChange={handleWeekChange}
                      />
                      {!filters.month && (
                        <span className="filter-month-span">Select Month</span>
                      )}
                      <Input
                        className={`filter-button-size input-border-class-month m-0 ${
                          filters.month && focusClass ? focusClass : ""
                        }`}
                        type="month"
                        name="month"
                        id="month"
                        max={new Date().toISOString().slice(0, 7)}
                        value={filters.month || ""}
                        style={{ ...filterButtonstyle }}
                        onChange={handleMonthChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row> 
          }
          {GlobalSummaryFlag?
          <>
           <p className="f-light" style={{fontSize:'18px',fontWeight:'500'}}> {GlobalSubHeading} </p>
            <Row>
              {width>1499?
              <>
                <Col xl='2'>  
              <NewCameraCount loader={connectivityFactoryLoader} data={factoryCamerasCount}/> 
              </Col>
              <Col xl='2'>  
                    <NewAIAccuracy loader={acuuracyLoader} data={accuracyPercent}/> 
              </Col> 
              <Col xl='4'> 
                {highseverityCardLoader ?
                  <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>

                    <Loader3 />
                  </CardBody></Card>
                  : <>
                    {highseverityCardData?.max_alerts !== null ?
                      <HighestOrHighSeverity
                        heading={'Highest Non Compliance Area'}
                        highestboolean={true}
                        area={highseverityCardData?.max_alerts?.area}
                        subarea={highseverityCardData?.max_alerts?.sub_area}
                        module={highseverityCardData?.max_alerts?.object === "forklift_person_in_same_aisle" ? "MMHE"
                          : highseverityCardData?.max_alerts?.object === "emergency_exit_blockage" ? "E.Exit"
                            : highseverityCardData?.max_alerts?.object === "Emergency Exit" ? "E.Exit"
                              : highseverityCardData.max_alerts.object
                        }
                        owner={highseverityCardData?.max_alerts?.area_owner}
                        loader={highseverityCardLoader}
                        shift={highseverityCardData?.max_alerts?.shift_name}
                        alert={highseverityCardData?.max_alerts?.alert_count}
                      />
                      : <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        <p className="f-light">No highest alerts</p>
                      </CardBody></Card>
                    }

                  </>}

              </Col>
              <Col xl='4'>
              {highseverityCardLoader?<Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <Loader3 />
                      </CardBody></Card>:<>
                {highseverityCardData?.highSeverity !== null ?
                  <HighestOrHighSeverity
                    highestboolean={false}
                    loader={highseverityCardLoader}
                    data={highseverityCardData?.highSeverity}
                    heading={'High Severity Alerts'}
                    area={highseverityCardData?.highSeverity?.area}
                    subarea={highseverityCardData?.highSeverity?.sub_area}
                    module={highseverityCardData?.highSeverity?.object == "forklift_person_in_same_aisle" ? "MMHE" :
                      highseverityCardData?.highSeverity?.object == "Emergency Exit" ? "E.Exit" : highseverityCardData?.highSeverity?.object}
                    owner={highseverityCardData?.highSeverity?.area_owner}
                    alert={highseverityCardData?.highSeverity?.alert_count}
                    shift={highseverityCardData?.highSeverity?.shift_name}
                  />
                  : <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <p className="f-light">No high severity alerts</p>
                  </CardBody></Card>
                }     
                </>}
              </Col>
            
            <Col xl='12' xxl='6' >
              <Card style={{ height:'399px',borderRadius:'32px' }}>
              <h5 className="px-4 py-3" style={{fontWeight:'500',color:'#383838',}}>Overall Compliance Score </h5>
                { 
                  loadingForDonut ? <span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>
                    :
                    <> 
                      <CardBody className="position-relative p-0">
                        <Row>
                        <Col md='5' className="d-flex justify-content-center align-items-center  pe-0" style={{height:'320px'}}>
                        <NewDonutChart seriess={recentOrderChart.series} height={240} tooltip={progressData} />
                        </Col>
                        <Col md='7' >
                          <NewBarChart  
                           progressData={progressData}
                           week={week}
                           loadingForBars={loadingForBars}
                           filters={filters}
                          />
                        </Col>

                        </Row>
                        {/* <div className="">
                          <ReactApexChart
                            type="radialBar"
                            height={290}
                            options={recentOrderChart.options}
                            series={recentOrderChart.series}
                          />
                        </div> */}
                      
                    </CardBody>
                  </>
                }
              </Card>
            </Col>
              </>:
              <>
              <Col sm='6'>   
                    <NewCameraCount loader={connectivityFactoryLoader} data={factoryCamerasCount}/> 
              </Col>
              <Col sm='6'>  
                    <NewAIAccuracy loader={acuuracyLoader} data={accuracyPercent}/> 
              </Col> 
              <Col md='6'> 
                {highseverityCardLoader ?
                  <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>

                    <Loader3 />
                  </CardBody></Card>
                  : <>
                    {highseverityCardData?.max_alerts !== null ?
                      <HighestOrHighSeverity
                        heading={'Highest Non Compliance Area'}
                        highestboolean={true}
                        area={highseverityCardData?.max_alerts?.area}
                        subarea={highseverityCardData?.max_alerts?.sub_area}
                        module={highseverityCardData?.max_alerts?.object === "forklift_person_in_same_aisle" ? "MMHE"
                          : highseverityCardData?.max_alerts?.object === "emergency_exit_blockage" ? "E.Exit"
                            : highseverityCardData?.max_alerts?.object === "Emergency Exit" ? "E.Exit"
                              : highseverityCardData.max_alerts.object
                        }
                        owner={highseverityCardData?.max_alerts?.area_owner}
                        loader={highseverityCardLoader}
                        shift={highseverityCardData?.max_alerts?.shift_name}
                        alert={highseverityCardData?.max_alerts?.alert_count}
                      />
                      : <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        <p className="f-light">No highest alerts</p>
                      </CardBody></Card>
                    }

                  </>}

              </Col>
              <Col md='6'>
              {highseverityCardLoader?<Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <Loader3 />
                      </CardBody></Card>:<>
                {highseverityCardData?.highSeverity !== null ?
                  <HighestOrHighSeverity
                    highestboolean={false}
                    loader={highseverityCardLoader}
                    data={highseverityCardData?.highSeverity}
                    heading={'High Severity Alerts'}
                    area={highseverityCardData?.highSeverity?.area}
                    subarea={highseverityCardData?.highSeverity?.sub_area}
                    module={highseverityCardData?.highSeverity?.object == "forklift_person_in_same_aisle" ? "MMHE" :
                      highseverityCardData?.highSeverity?.object == "Emergency Exit" ? "E.Exit" : highseverityCardData?.highSeverity?.object}
                    owner={highseverityCardData?.highSeverity?.area_owner}
                    alert={highseverityCardData?.highSeverity?.alert_count}
                    shift={highseverityCardData?.highSeverity?.shift_name}
                  />
                  : <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <p className="f-light">No high severity alerts</p>
                  </CardBody></Card>
                }     
                </>}
              </Col>
            <Col md='12'>
              <Card style={{minHeight:'399px', borderRadius:'32px' }}>
              <h5 className="px-4 py-3" style={{fontWeight:'500',color:'#383838',}}>Overall Compliance Score </h5>
                { 
                  loadingForDonut ? <span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>
                    :
                    <> 
                      <CardBody className="pe-0">
                        <Row>
                        <Col md='5' sm='6' className="d-flex justify-content-center align-items-center " >
                        <NewDonutChart seriess={recentOrderChart.series} height={240}  tooltip={progressData}/>
                        </Col>
                        <Col md='7' sm='6' >
                          <NewBarChart  
                           progressData={progressData}
                           week={week}
                           loadingForBars={loadingForBars}
                           filters={filters}
                          />
                        </Col>

                        </Row>
                        {/* <div className="">
                          <ReactApexChart
                            type="radialBar"
                            height={290}
                            options={recentOrderChart.options}
                            series={recentOrderChart.series}
                          />
                        </div> */}
                      
                    </CardBody>
                  </>
                }
              </Card>
            </Col>
              </>}
         
          </Row>
          
          </>:<>
          <Row>
            
            {width>1499?
            <>
              <Col xl='2'>  
              <NewCameraCount loader={connectivityFactoryLoader} data={factoryCamerasCount}/> 
              </Col>
              <Col xl='2'>  
                    <NewAIAccuracy loader={acuuracyLoader} data={accuracyPercent}/> 
              </Col> 
              <Col xl='4'> 
                {highseverityCardLoader ?
                  <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>

                    <Loader3 />
                  </CardBody></Card>
                  : <>
                    {highseverityCardData?.max_alerts !== null ?
                      <HighestOrHighSeverity
                        heading={'Highest Non Compliance Area'}
                        highestboolean={true}
                        area={highseverityCardData?.max_alerts?.area}
                        subarea={highseverityCardData?.max_alerts?.sub_area}
                        module={highseverityCardData?.max_alerts?.object === "forklift_person_in_same_aisle" ? "MMHE"
                          : highseverityCardData?.max_alerts?.object === "emergency_exit_blockage" ? "E.Exit"
                            : highseverityCardData?.max_alerts?.object === "Emergency Exit" ? "E.Exit"
                              : highseverityCardData.max_alerts.object
                        }
                        owner={highseverityCardData?.max_alerts?.area_owner}
                        loader={highseverityCardLoader}
                        shift={highseverityCardData?.max_alerts?.shift_name}
                        alert={highseverityCardData?.max_alerts?.alert_count}
                      />
                      : <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        <p className="f-light">No highest alerts</p>
                      </CardBody></Card>
                    }

                  </>}

              </Col>
              <Col xl='4'>
              {highseverityCardLoader?<Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <Loader3 />
                      </CardBody></Card>:<>
                {highseverityCardData?.highSeverity !== null ?
                  <HighestOrHighSeverity
                    highestboolean={false}
                    loader={highseverityCardLoader}
                    data={highseverityCardData?.highSeverity}
                    heading={'High Severity Alerts'}
                    area={highseverityCardData?.highSeverity?.area}
                    subarea={highseverityCardData?.highSeverity?.sub_area}
                    module={highseverityCardData?.highSeverity?.object == "forklift_person_in_same_aisle" ? "MMHE" :
                      highseverityCardData?.highSeverity?.object == "Emergency Exit" ? "E.Exit" : highseverityCardData?.highSeverity?.object}
                    owner={highseverityCardData?.highSeverity?.area_owner}
                    alert={highseverityCardData?.highSeverity?.alert_count}
                    shift={highseverityCardData?.highSeverity?.shift_name}
                  />
                  : <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <p className="f-light">No high severity alerts</p>
                  </CardBody></Card>
                }     
                </>}
              </Col>
            <Col xl='12' xxl='6' >
              <Card style={{ height:'399px',borderRadius:'32px' }}>
              <h5 className="px-4 py-3" style={{fontWeight:'500',color:'#383838',}}>Overall Compliance Score </h5>
                { 
                  loadingForDonut ? <span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>
                    :
                    <> 
                      <CardBody className="position-relative p-0">
                        <Row>
                        <Col md='5' className="d-flex justify-content-center align-items-center  pe-0" style={{height:'320px'}}>
                        <NewDonutChart seriess={recentOrderChart.series} height={240} tooltip={progressData} />
                        </Col>
                        <Col md='7' >
                          <NewBarChart  
                           progressData={progressData}
                           week={week}
                           loadingForBars={loadingForBars}
                           filters={filters}
                          />
                        </Col>

                        </Row>
                        {/* <div className="">
                          <ReactApexChart
                            type="radialBar"
                            height={290}
                            options={recentOrderChart.options}
                            series={recentOrderChart.series}
                          />
                        </div> */}
                      
                    </CardBody>
                  </>
                }
              </Card>
            </Col>
            <Col md={12} xxl='6'>
              {/* <ProgressBars
                progressData={progressData}
                week={week}
                loadingForBars={loadingForBars}
                filters={filters}
              /> */}
              <AlertsTrendChart
                ref={alerttrendcontext}
                chartData={chartData}
                filters={filters}
              />
            </Col>
            <Col xs='12'>
            <NewHeatmap 
             heatmapData={heatmapData}
             moduleLength={progressData?.length}
             loader={heatmapLoader}
             filters={filters}
            />
            </Col>
            </>:<>
            <Col sm='6'>   
                    <NewCameraCount loader={connectivityFactoryLoader} data={factoryCamerasCount}/> 
              </Col>
              <Col sm='6'>  
                    <NewAIAccuracy loader={acuuracyLoader} data={accuracyPercent}/> 
              </Col> 
              <Col md='6'> 
                {highseverityCardLoader ?
                  <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>

                    <Loader3 />
                  </CardBody></Card>
                  : <>
                    {highseverityCardData?.max_alerts !== null ?
                      <HighestOrHighSeverity
                        heading={'Highest Non Compliance Area'}
                        highestboolean={true}
                        area={highseverityCardData?.max_alerts?.area}
                        subarea={highseverityCardData?.max_alerts?.sub_area}
                        module={highseverityCardData?.max_alerts?.object === "forklift_person_in_same_aisle" ? "MMHE"
                          : highseverityCardData?.max_alerts?.object === "emergency_exit_blockage" ? "E.Exit"
                            : highseverityCardData?.max_alerts?.object === "Emergency Exit" ? "E.Exit"
                              : highseverityCardData?.max_alerts?.object
                        }
                        owner={highseverityCardData?.max_alerts?.area_owner}
                        loader={highseverityCardLoader}
                        shift={highseverityCardData?.max_alerts?.shift_name}
                        alert={highseverityCardData?.max_alerts?.alert_count}
                      />
                      : <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                        <p className="f-light">No highest alerts</p>
                      </CardBody></Card>
                    }

                  </>}

              </Col>
              <Col md='6'>
              {highseverityCardLoader?<Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <Loader3 />
                      </CardBody></Card>:<>
                {highseverityCardData?.highSeverity !== null ?
                  <HighestOrHighSeverity
                    highestboolean={false}
                    loader={highseverityCardLoader}
                    data={highseverityCardData?.highSeverity}
                    heading={'High Severity Alerts'}
                    area={highseverityCardData?.highSeverity?.area}
                    subarea={highseverityCardData?.highSeverity?.sub_area}
                    module={highseverityCardData?.highSeverity?.object == "forklift_person_in_same_aisle" ? "MMHE" :
                      highseverityCardData?.highSeverity?.object == "Emergency Exit" ? "E.Exit" : highseverityCardData?.highSeverity?.object}
                    owner={highseverityCardData?.highSeverity?.area_owner}
                    alert={highseverityCardData?.highSeverity?.alert_count}
                    shift={highseverityCardData?.highSeverity?.shift_name}
                  />
                  : <Card style={{ borderRadius: '24px', minHeight: '170px', maxHeight: 'auto' }}><CardBody className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <p className="f-light">No high severity alerts</p>
                  </CardBody></Card>
                }     
                </>}
              </Col>
            <Col md='12'>
              <Card style={{minHeight:'399px', borderRadius:'32px' }}>
              <h5 className="px-4 py-3" style={{fontWeight:'500',color:'#383838',}}>Overall Compliance Score </h5>
                { 
                  loadingForDonut ? <span className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute"><Loader3 /></span>
                    :
                    <> 
                      <CardBody className="pe-0">
                        <Row>
                        <Col md='5' sm='6' className="d-flex justify-content-center align-items-center " >
                        <NewDonutChart seriess={recentOrderChart.series} height={240} tooltip={progressData} />
                        </Col>
                        <Col md='7' sm='6' >
                          <NewBarChart  
                           progressData={progressData}
                           week={week}
                           loadingForBars={loadingForBars}
                           filters={filters}
                          />
                        </Col>

                        </Row>
                        {/* <div className="">
                          <ReactApexChart
                            type="radialBar"
                            height={290}
                            options={recentOrderChart.options}
                            series={recentOrderChart.series}
                          />
                        </div> */}
                      
                    </CardBody>
                  </>
                }
              </Card>
            </Col>
            <Col md={12} >
              {/* <ProgressBars
                progressData={progressData}
                week={week}
                loadingForBars={loadingForBars}
                filters={filters}
              /> */}
              <AlertsTrendChart
                ref={alerttrendcontext}
                chartData={chartData}
                filters={filters}
                height={'350px'}
              />
            </Col>
            <Col xs='12'>
           <NewHeatmap 
             heatmapData={heatmapData}
             moduleLength={progressData?.length}
             loader={heatmapLoader}
             filters={filters}
            />
            
            </Col>
            </>}
          
            {/* old design */}
            {/* <Col
              xs="12"
              sm="mb-4"
              md={12}
              xxl={4}
              style={{
                justifyContent: "center",
                alignItems: "center",
                margin: "0",
                padding: "0 12px",
              }}
              className="AiAccuracy-section"
            >
              <Col
                className="AiAccuracy-section-cards d-flex gap-sm-4"
                xs="12"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              > 
                <Card
                  className="anlyticsTopCards"
                  style={{ padding: "20px 10px", width: "50%" }}
                >
                  <CardBody className={`${cardClass}`}> 
                    {acuuracyLoader ? (
                      <>
                        <Loader3 />
                      </>
                    ) : (
                      <>
                        <h6 className="ellipsis-text">AI Accuracy</h6>
                      
                        <h4 className="mb-0">
                          {!accuracyPercent ? (
                            ""
                          ) : accuracyPercent === "NaN" ? (
                            ""
                          ) : accuracyPercent < 80 ? (
                            <ArrowDown color="red" size={20} />
                          ) : (
                            <ArrowUp color="green" size={20} />
                          )}
                          {accuracyPercent === "NaN"
                            ? "N/A"
                            : !accuracyPercent
                            ? "N/A"
                            : accuracyPercent + "%"}
                        </h4> 
                      </>
                    )} 
                  </CardBody>
                </Card>
                <Card
                  className="anlyticsTopCards"
                  style={{ padding: "20px 10px", width: "50%" }}
                >
                  <CardBody className={`${cardClass}`}> 
                    {connectivityFactoryLoader ? (
                      <Loader3 />
                    ) : (
                      <>
                        <h6 className="ellipsis-text">Cameras Count</h6>
                        <p className=" ellipsis-text mb-0 d-flex">
                          <span className="f-light">
                            <FaCamera size={22} className="me-3" />
                          </span>
                          <h5>
                            {Number.isInteger(factoryCamerasCount?.active_cameras)
                              ? factoryCamerasCount.active_cameras
                              : "N/A"}{" "}
                            /{" "}
                            {Number.isInteger(factoryCamerasCount?.total_cameras)
                              ? factoryCamerasCount.total_cameras
                              : "N/A"}{" "}
                          </h5>
                        </p>
                        
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
              <Row>
                <Col sm="6" xs="12">
                  <Card className="anlyticsBottomCard">
                    <CardBody>
                      {highseverityCardLoader ? (
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                          <Loader3 />
                        </div>
                      ) : (
                        <>
                          <h6 className="ellipsis-text  py-2"> Highest Alerts</h6>
                          {highseverityCardData?.max_alerts !== null ? (
                            <ul>
                              <li>
                                <p className="f-light ellipsis-text mb-1">
                                  {" "}
                                  <span>
                                    <TbAlertSquareRounded className="me-1" />
                                  </span>{" "}
                                  Alerts:{" "}
                                  <span
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "16px",
                                      color: "black",
                                    }}
                                  >
                                    {
                                      highseverityCardData?.max_alerts
                                        ?.alert_count
                                    }
                                  </span>
                                </p>
                              </li>
                              <li>
                                {highseverityCardData?.max_alerts && (
                                  <p className="f-light ellipsis-text mb-1">
                                    <span>
                                      <LuBuilding2 className="me-1" />
                                    </span>
                                    Module:{" "}
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        fontSize: "16px",
                                        color: "black",
                                      }}
                                    >
                                      {highseverityCardData?.max_alerts
                                        ?.object ===
                                      "forklift_person_in_same_aisle"
                                        ? "MMHE"
                                        : highseverityCardData?.max_alerts
                                            ?.object === "emergency_exit_blockage"
                                        ? "E.Exit"
                                        : highseverityCardData?.max_alerts
                                            ?.object === "Emergency Exit"
                                        ? "E.Exit"
                                        : highseverityCardData.max_alerts.object}
                                    </span>
                                  </p>
                                )}
                              </li>
                              <li>
                                <p className="f-light ellipsis-text mb-1">
                                  <span>
                                    <TiLocationArrowOutline className="me-1" />
                                  </span>{" "}
                                  {highseverityCardData?.max_alerts?.area},{" "}
                                  {highseverityCardData?.max_alerts?.area_owner}
                                </p>
                              </li>
                              <li> 
                                <p className="f-light ellipsis-text mb-1">
                                  <span>
                                    <MdAccessTime className="me-1" />
                                  </span>{" "}
                                  {"Shift " +
                                    highseverityCardData?.max_alerts
                                      ?.shift_name || "Shift A"}{" "}
                                </p>
                              </li>
                              <li>
                                <p className="f-light ellipsis-text mb-1">
                                  {" "}
                                  <span>
                                    <GoLocation className="me-1" />
                                  </span>{" "}
                                  {highseverityCardData?.max_alerts?.sub_area}
                                </p>
                              </li>
                            </ul>
                          ) : (
                            <p className="f-light text-center py-3">
                              {" "}
                              Zero Alerts
                            </p>
                          )}
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
  
                <Col sm="6" xs="12">
                  <Card className="anlyticsBottomCard">
                    <CardBody>
                      {highseverityCardLoader ? (
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                          <Loader3 />
                        </div>
                      ) : (
                        <>
                          <h6 className="ellipsis-text py-2">
                            High Severity Alerts
                          </h6>
                          {highseverityCardData?.highSeverity !== null ? (
                            <ul>
                              <li>
                                <p className="f-light ellipsis-text mb-1">
                                  {" "}
                                  <span>
                                    <TbAlertSquareRounded className="me-1" />
                                  </span>{" "}
                                  Alerts:{" "}
                                  <span
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "16px",
                                      color: "black",
                                    }}
                                  >
                                    {
                                      highseverityCardData?.highSeverity
                                        ?.alert_count
                                    }
                                  </span>
                                </p>
                              </li>
                              <li>
                                <p className="f-light ellipsis-text mb-1">
                                  <span>
                                    <LuBuilding2 className="me-1" />
                                  </span>
                                  Module:{" "}
                                  <span
                                    style={{
                                      fontWeight: "500",
                                      fontSize: "16px",
                                      color: "black",
                                    }}
                                  >
                                    {" "}
                                    {highseverityCardData?.highSeverity?.object ==
                                    "forklift_person_in_same_aisle"
                                      ? "MMHE"
                                      : highseverityCardData?.highSeverity
                                          ?.object == "Emergency Exit"
                                      ? "E.Exit"
                                      : highseverityCardData?.highSeverity
                                          ?.object}{" "}
                                  </span>
                                </p>
                              </li>
                              <li>
                                <p className="f-light ellipsis-text mb-1">
                                  <span>
                                    <TiLocationArrowOutline className="me-1" />
                                  </span>{" "}
                                  {highseverityCardData?.highSeverity?.area},{" "}
                                  {highseverityCardData?.highSeverity?.area_owner}
                                </p>
                              </li>
                              <li> 
                                <p className="f-light ellipsis-text mb-1">
                                  <span>
                                    <MdAccessTime className="me-1" />
                                  </span>{" "}
                                  {"Shift " +
                                    highseverityCardData?.highSeverity
                                      ?.shift_name || "Shift A"}{" "}
                                </p>
                              </li>
                              <li>
                                <p className="f-light ellipsis-text mb-1">
                                  {" "}
                                  <span>
                                    <GoLocation className="me-1" />
                                  </span>{" "}
                                  {highseverityCardData?.highSeverity?.sub_area}
                                </p>
                              </li>
                            </ul>
                          ) : (
                            <p className="f-light text-center py-3">
                              {" "}
                              Zero Alerts
                            </p>
                          )}
                        </>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col> */}
          </Row>
  
          <Row className=" ">
           
            {/* <Col xs={12} lg={12} md={12} sm={12} xl={12}>
              <Card ref={heatmapcontext} className="shadow-sm w-100">
                <CardHeader className="text-black">
                  <Row className="">
                    <Col xs="12" sm="6" md="5" className="">
                      <h5 className="mb-0">Area Intensity Heatmap</h5>
                    </Col>
  
                    
                  </Row>
                </CardHeader>
                <Card.Body className="p-0 p-md-3 p-lg-4 w-100">
                  <div className="table-responsive w-100">
                    <div className="mb-4 w-100">
                      {heatmapLoader ? (
                        <div
                          className="d-flex align-items-center justify-content-center"
                          style={{ height: "436px" }}
                        >
                          <Loader3 />
                        </div>
                      ) : (
                        <ApexInteractiveHeatmap
                          heatmapData={heatmapData}
                          moduleLength={progressData?.length}
                          filters={filters}
                        />
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
          {/* <Row>
            <Col xs="12">
              <AlertsTrendChart
                ref={alerttrendcontext}
                chartData={chartData}
                filters={filters}
              />
            </Col>
          </Row> */}
          </>}
         
        </Container>
      </Fragment>
    );
  };
  
  export default LiveAnalyticsScreen;
  