import React, { useState, useEffect } from "react";
import { Table, Stack } from "@mui/material/";
import { connect } from "react-redux";
import {
  DeparturesHeader,
  DeparturesBody,
  DeparturesFooter,
  NoDepartures,
  Loading,
} from "./TableModules";
import { useParams } from "react-router-dom";

const DeparturesTable = ({ departures, __stopId, dispatch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { routeID, directionID, stopID } = useParams();

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    dispatch({
      type: "FETCH_DEPARTURES",
      payload: { routeID, directionID, stopID },
    });

    return () => {
      dispatch({ type: "CLEAR_DEPARTURES" });
      dispatch({ type: "CLEAR_STOPID" });
    };
  }, [dispatch, routeID, directionID, stopID]);

  return (
    <Stack alignItems="center" sx={{ pb: 6, m: "0 auto" }}>
      {__stopId ? (
        <Table
          aria-label="departures table"
          sx={{ width: ["80%", 660, 770, 1140], bgcolor: "#f5f5f4" }}
        >
          <DeparturesHeader __stopId={__stopId} />
          {departures.length ? (
            <>
              <DeparturesBody
                departures={isExpanded ? departures : departures.slice(0, 3)}
              />
            </>
          ) : (
            <>{__stopId.StopLabel ? <NoDepartures /> : <Loading />}</>
          )}
          <DeparturesFooter
            handleExpand={handleExpand}
            isExpanded={isExpanded}
          />
        </Table>
      ) : null}
    </Stack>
  );
};

const mapStateToProps = (reduxState) => ({
  departures: reduxState.departuresData.departures,
  __stopId: reduxState.departuresData.stopID,
});

export default connect(mapStateToProps)(DeparturesTable);
