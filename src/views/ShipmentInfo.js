import React, { useContext } from "react";
import { Context } from "views/wrapper";
import { FormattedDate, FormattedMessage } from "react-intl";
import { ReactComponent as TruckIcon } from "assets/truck.svg";
import { ReactComponent as PackageIcon } from "assets/package.svg";
import "styles/ShipmentInfo.css";

export default function ShipmentInfo() {
  const { trackedData } = useContext(Context);

  const renderEvents = trackedData?.TransitEvents?.map((item, index) => (
    <tr key={index}>
      <td>{item?.branch || <FormattedMessage id="unknown" />}</td>
      <td>
        <FormattedDate
          value={item?.timestamp}
          year="numeric"
          month="numeric"
          day="numeric"
        />
      </td>
      <td>
        <FormattedDate
          value={item?.timestamp}
          hour="numeric"
          minute="numeric"
        />
      </td>
      <td>
        {index + 1 === trackedData?.TransitEvents?.length ? (
          <p className={item?.state}>
            <FormattedMessage id={item?.state || " "} />
          </p>
        ) : (
          <FormattedMessage id={item?.state || " "} />
        )}
      </td>
    </tr>
  ));

  const checkProgress = (state) =>
    trackedData?.TransitEvents?.find((event) => event?.state === state);

  return (
    <div className="shipment-info">
      <div className="main-section">
        <div className="info">
          <div>
            <div>
              <span>
                <FormattedMessage id="trackingId" />{" "}
                {trackedData?.TrackingNumber}
              </span>
              <span className={trackedData?.CurrentStatus?.state}>
                <FormattedMessage
                  id={trackedData?.CurrentStatus?.state || " "}
                />
              </span>
            </div>
          </div>

          <div>
            <div>
              <span>
                <FormattedMessage id="latestUpdate" />
              </span>
              <span>
                <FormattedDate
                  value={trackedData?.CurrentStatus?.timestamp}
                  weekday="long"
                />{" "}
                <FormattedDate
                  value={trackedData?.CurrentStatus?.timestamp}
                  year="numeric"
                  month="numeric"
                  day="numeric"
                />{" "}
                <FormattedDate
                  value={trackedData?.CurrentStatus?.timestamp}
                  hour="numeric"
                  minute="numeric"
                />
              </span>
            </div>
          </div>

          <div>
            <div>
              <span>
                <FormattedMessage id="merchantName" />
              </span>
              <span>
                <FormattedMessage id={trackedData?.provider || " "} />
              </span>
            </div>
          </div>
          <div>
            <div>
              <span>
                <FormattedMessage id="deliveryDate" />
              </span>
              <span>
                <FormattedDate
                  value={trackedData?.PromisedDate}
                  year="numeric"
                  month="long"
                  day="numeric"
                />
              </span>
            </div>
          </div>
        </div>

        <div className={`progress ${trackedData?.CurrentStatus?.state}`}>
          <div className="points">
            <span className={checkProgress("TICKET_CREATED") ? "active" : ""}>
              <div className="point">✓</div>
            </span>
            <span className={checkProgress("PACKAGE_RECEIVED") ? "active" : ""}>
              <div className="point">✓</div>
            </span>
            <span className={checkProgress("IN_TRANSIT") ? "active" : ""}>
              <div className="point uncompleted">
                <TruckIcon />
              </div>
              <div className="point completed">✓</div>
            </span>
            <span className={checkProgress("DELIVERED") ? "active" : ""}>
              <div className="point uncompleted">
                <PackageIcon />
              </div>
              <div className="point completed">✓</div>
            </span>
          </div>
          <div>
            <span className={checkProgress("TICKET_CREATED") ? "active" : ""}>
              <FormattedMessage id="TICKET_CREATED" />
            </span>
            <span className={checkProgress("PACKAGE_RECEIVED") ? "active" : ""}>
              <FormattedMessage id="PACKAGE_RECEIVED" />
            </span>
            <span className={checkProgress("IN_TRANSIT") ? "active" : ""}>
              <FormattedMessage id="IN_TRANSIT" />
            </span>
            <span className={checkProgress("DELIVERED") ? "active" : ""}>
              <FormattedMessage id="DELIVERED" />
            </span>
          </div>
        </div>
      </div>
      <div className="details">
        <p className="title">
          <FormattedMessage id="shipmentDetails" />
        </p>
        <div className="table-wrapper">
          <table>
            <thead>
              <th>
                <FormattedMessage id="branch" />
              </th>
              <th>
                <FormattedMessage id="date" />
              </th>
              <th>
                <FormattedMessage id="time" />
              </th>
              <th>
                <FormattedMessage id="details" />
              </th>
            </thead>
            <tbody>{renderEvents}</tbody>
          </table>
        </div>
      </div>
      <div className="address">
        <p className="title">
          <FormattedMessage id="deliveryAddress" />
        </p>
        <div>
          {trackedData?.DeliveryAddress || (
            <FormattedMessage id="placeholderAddress" />
          )}
        </div>
      </div>
    </div>
  );
}
