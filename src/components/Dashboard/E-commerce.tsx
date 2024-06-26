"use client";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
// import ChatCard from "../Chat/ChatCard";
// import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import CardDataStats2 from "../CardDataStats2";
import CardDataStats3 from "../CardDataStats3";
import CardDataStats4 from "../CardDataStats4";
import CardDataStats5 from "../CardDataStats5";
import bom_del from "../../css/Final_Routes_BOM_DEL_Morning.json";
import del_hnd from "../../css/Final_Routes_DEL_HND_Morning.json";
import hyd_ccu from "../../css/Final_Routes_HYD_CCU_Morning.json";
import jfk_del from "../../css/Final_Routes_JFK_DEL_Morning.json";
import Link from "next/link";
// import MapOne from "../Maps/MapOne";
import Page from "../osm/page";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import DropdownDefault from "../Dropdowns/DropdownDefault";
import axios from "axios";
import { useAuth } from "@/utils/auth";

const ECommerce: React.FC = () => {
  const [flight, setFlight] = React.useState(new Set(["Flight"]));
  const [path, setPath] = React.useState(new Set(["Path"]));
  const selectedFlight = React.useMemo(
    () => Array.from(flight).join(", ").replaceAll("_", ""),
    [flight],
  );

  const selectedPath = React.useMemo(
    () => Array.from(path).join(", ").replaceAll("_", " "),
    [path],
  );

  const { setting, mounting, mount } = useAuth();

  const [fst, setfst] = useState("");

  useEffect(() => {
    let url = "";
    let dep = "";
    let arr = "";
    if (fst == "HND to DEL (08:00)") {
      url = "http://localhost:3001/api/routes_morning";
      dep = "del";
      arr = "hnd";
    } else if (fst == "JFK to DEL (08:00)") {
      url = "http://localhost:3001/api/routes_morning";
      dep = "jfk";
      arr = "del";
    } else if (fst == "BOM to DEL (08:00)") {
      url = "http://localhost:3001/api/routes_morning";
      dep = "bom";
      arr = "del";
    } else if (fst == "HYD to CCU (08:00)") {
      url = "http://localhost:3001/api/routes_morning";
      dep = "hyd";
      arr = "ccu";
    }

    let arrr: React.SetStateAction<{}>,
      depp: React.SetStateAction<{}>,
      healthh: React.SetStateAction<{}>,
      safee: React.SetStateAction<never[]>,
      reliablee: React.SetStateAction<never[]>,
      efficientt: React.SetStateAction<never[]>,
      actuall: React.SetStateAction<never[]>;

    axios
      .post(url, {
        dep_iato: dep,
        arr_iato: arr,
      })
      .then((res) => {
        arrr = res.data.arrival;
        depp = res.data.departure;
        healthh = res.data.flight_health;
        safee = res.data.routes.safe.follow;
        reliablee = res.data.routes.reliable.follow;
        efficientt = res.data.routes.efficient.follow;
        actuall = res.data.routes.actual.follow;
        setting(depp, arrr, healthh, safee, reliablee, efficientt, actuall);
      })
      .catch((err) => {
        console.log("Frontend error: ", err);
      })
      .finally(() => {
        mounting(false);
      });
  }, [fst]);

  const route_select = (route: string | undefined) => {
      if (route == "HND to DEL (08:00)") {
        setting(
          del_hnd.departure,
          del_hnd.arrival,
          del_hnd.flight_health,
          del_hnd.routes.safe.follow,
          del_hnd.routes.reliable.follow,
          del_hnd.routes.efficient.follow,
          del_hnd.routes.actual.follow,
        );
      } else if (route == "JFK to DEL (08:00)") {
        setting(
          jfk_del.departure,
          jfk_del.arrival,
          jfk_del.flight_health,
          jfk_del.routes.safe.follow,
          jfk_del.routes.reliable.follow,
          jfk_del.routes.efficient.follow,
          jfk_del.routes.actual.follow,
        );
      } else if (route == "BOM to DEL (08:00)") {
        setting(
          bom_del.departure,
          bom_del.arrival,
          bom_del.flight_health,
          bom_del.routes.safe.follow,
          bom_del.routes.reliable.follow,
          bom_del.routes.efficient.follow,
          bom_del.routes.actual.follow,
        );
      } else if (route == "HYD to CCU (08:00)") {
        setting(
          hyd_ccu.departure,
          hyd_ccu.arrival,
          hyd_ccu.flight_health,
          hyd_ccu.routes.safe.follow,
          hyd_ccu.routes.reliable.follow,
          hyd_ccu.routes.efficient.follow,
          hyd_ccu.routes.actual.follow,
        );
        mounting(false);
      }
  };

  const [test, settest] = useState("name")

  return (
    <>
      <div className="">
        <div className="xl:grid-row-4 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <div className="col-span-1 h-[80vh] md:col-span-2 md:h-auto xl:col-span-3 xl:h-auto">
            <Page />
          </div>
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="text-grey-300 w-[100%] text-xl font-normal capitalize "
                >
                  {selectedFlight}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={flight}
                // onSelectionChange={setFlight}
                // className="font-bold w-[100%]"
                style={{ width: 300 }}
              >
                {/* <DropdownItem key="AGX to DMU (08:00)">
                  AGX to DMU (08:00)
                </DropdownItem>
                <DropdownItem key="BLR to DEL (08:00)">
                  BLR to DEL (08:00)
                </DropdownItem> */}
                <DropdownItem key="BOM to DEL (08:00)">
                  <Button onPress={() => route_select("BOM to DEL (08:00)")}>
                    BOM to DEL (08:00)
                  </Button>
                </DropdownItem>
                <DropdownItem key="HND to DEL (08:00)">
                  <Button onPress={() => {route_select("HND to DEL (08:00)");}}>
                    HND to DEL (08:00)
                  </Button>
                </DropdownItem>
                <DropdownItem key="JFK to DEL (08:00)">
                  <Button onPress={() => route_select("JFK to DEL (08:00)")}>
                    JFK to DEL (08:00)
                  </Button>
                </DropdownItem>
                <DropdownItem key="HYD to CCU (08:00)">
                  <Button onPress={() => route_select("HYD to CCU (08:00)")}>
                    HYD to CCU (08:00)
                  </Button>
                </DropdownItem>
                {/* <DropdownItem key="DEL to BOM (14:00)">
                  DEL to BOM (14:00)
                </DropdownItem>
                <DropdownItem key="DMU to AGX (14:00)">
                  DMU to AGX (14:00)
                </DropdownItem>
                <DropdownItem key="CCU to AMD (20:00)">
                  CCU to AMD (20:00)
                </DropdownItem>
                <DropdownItem key="CCU to DEL (20:00)">
                  CCU to DEL (20:00)
                </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
            {/* <DropdownUser /> */}

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="text-grey-300 w-[100%] text-xl font-normal capitalize "
                >
                  {selectedPath}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={path}
                // onSelectionChange={setPath}
                // className="font-bold w-[100%]"
                style={{ width: 300 }}
              >
                <DropdownItem
                  className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  key="Safe path"
                >
                  <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-green-400">
                    <h1 className="text-2xl text-black">1</h1>
                  </div>
                  <div className="w-50">
                    <h6 className="text-sm font-medium  text-black dark:text-white">
                      This path can be consider safe with Risk Index: 2
                    </h6>
                  </div>
                </DropdownItem>
                <DropdownItem key="Efficient path">
                  <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-red">
                    <h1 className="text-2xl text-black">2</h1>
                  </div>
                  <div className="w-50">
                    <h6 className="text-sm font-medium  text-black dark:text-white">
                      This path can be consider safe with Risk Index: 5
                    </h6>
                  </div>
                </DropdownItem>
                <DropdownItem key="Reliable path">
                  <div className="flex h-12.5 w-12.5 items-center justify-center rounded-full bg-yellow-400">
                    <h1 className="text-2xl text-black">3</h1>
                  </div>
                  <div className="w-50">
                    <h6 className="text-sm font-medium  text-black dark:text-white">
                      This path can be consider safe with Risk Index: 5
                    </h6>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {/* <DropdownMessage /> */}
            {/* <DropdownDefault/> */}
            {/* <DropdownUser/> */}
            <CardDataStats
              title="Total views"
              total="Flight Route Information"
              rate="0.43%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 15.1156C4.19376 15.1156 0.825012 8.61876 0.687512 8.34376C0.584387 8.13751 0.584387 7.86251 0.687512 7.65626C0.825012 7.38126 4.19376 0.918762 11 0.918762C17.8063 0.918762 21.175 7.38126 21.3125 7.65626C21.4156 7.86251 21.4156 8.13751 21.3125 8.34376C21.175 8.61876 17.8063 15.1156 11 15.1156ZM2.26876 8.00001C3.02501 9.27189 5.98126 13.5688 11 13.5688C16.0188 13.5688 18.975 9.27189 19.7313 8.00001C18.975 6.72814 16.0188 2.43126 11 2.43126C5.98126 2.43126 3.02501 6.72814 2.26876 8.00001Z"
                  fill=""
                />
                <path
                  d="M11 10.9219C9.38438 10.9219 8.07812 9.61562 8.07812 8C8.07812 6.38438 9.38438 5.07812 11 5.07812C12.6156 5.07812 13.9219 6.38438 13.9219 8C13.9219 9.61562 12.6156 10.9219 11 10.9219ZM11 6.625C10.2437 6.625 9.625 7.24375 9.625 8C9.625 8.75625 10.2437 9.375 11 9.375C11.7563 9.375 12.375 8.75625 12.375 8C12.375 7.24375 11.7563 6.625 11 6.625Z"
                  fill=""
                />
              </svg>
            </CardDataStats>
            <CardDataStats2
              title="Total views"
              total="Flight Route Information"
              rate="0.43%"
              levelUp
            >
              <span></span>
            </CardDataStats2>
            <CardDataStats3
              title="Total views"
              total="Flight Route Information"
              rate="0.43%"
              levelUp
            >
              <span></span>
            </CardDataStats3>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 xl:grid-cols-2  2xl:mt-7.5 ">
          <div className="w-md grid h-[100vh] grid-cols-1 md:h-auto md:grid-cols-3 xl:h-auto xl:grid-cols-3">
            <CardDataStats5
              title="Total Users"
              total="3.456"
              rate="0.95%"
              levelDown
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
                  fill=""
                />
                <path
                  d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
                  fill=""
                />
                <path
                  d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
                  fill=""
                />
              </svg>
            </CardDataStats5>
            <CardDataStats4
              title="Total Product"
              total="2.450"
              rate="2.59%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                  fill=""
                />
                <path
                  d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                  fill=""
                />
              </svg>
            </CardDataStats4>
            <CardDataStats4
              title="Total Product"
              total="2.450"
              rate="2.59%"
              levelUp
            >
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                  fill=""
                />
                <path
                  d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                  fill=""
                />
              </svg>
            </CardDataStats4>
          </div>
          {/* <ChartOne /> */}
          <div>
            <ChartTwo />
          </div>
          {/* <ChartThree /> */}
          {/* <MapOne /> */}
          {/* <div className="col-span-12 xl:col-span-8">
            <TableOne />
          </div>
          <ChatCard /> */}
        </div>
      </div>
    </>
  );
};

export default ECommerce;
