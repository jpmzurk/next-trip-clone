import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* getDepartures(action) {
  try {
    const { routeID, directionID, stopID } = action.payload;
    const response = yield axios.get(
      `api/departures/${routeID}/${directionID}/${stopID}`
    );
    // const __stopID = response.data.pop();
    const departures = response.data.departures;
    yield put({ type: "SET_DEPARTURES", payload: departures });
    // yield put({ type: "SET_STOPID", payload: __stopID });
  } catch (error) {
    console.log("error in get departures" + error);
  }
}

function* departuresSaga() {
  yield takeLatest("FETCH_DEPARTURES", getDepartures);
}

export default departuresSaga;
