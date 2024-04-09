import { createContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import Arabic from "langs/ar.json";
import English from "langs/en.json";
import Header from "components/Header";

const Wrapper = (props) => {
  const [locale, setLocale] = useState(localStorage.getItem("lang") || "ar");
  const [trackedData, setTrackedData] = useState({
    provider: "Bosta",
    CurrentStatus: {
      state: "DELIVERED",
      timestamp: "2020-07-25T12:25:31.247Z",
    },
    PromisedDate: "2020-07-22T11:08:38.483Z",
    TrackingNumber: "7234258",
    TrackingURL: "bosta.co/tracking-shipment/?track_num=7234258",
    SupportPhoneNumbers: ["19043"],
    TransitEvents: [
      {
        state: "TICKET_CREATED",
        timestamp: "2020-07-20T16:34:55.123Z",
      },
      {
        state: "PACKAGE_RECEIVED",
        timestamp: "2020-07-20T18:19:42.569Z",
      },
      {
        state: "IN_TRANSIT",
        timestamp: "2020-07-20T18:56:20.431Z",
      },
      {
        state: "PACKAGE_RECEIVED",
        timestamp: "2020-07-20T20:35:50.110Z",
        hub: "Cairo Sorting Facility",
      },
      {
        state: "IN_TRANSIT",
        timestamp: "2020-07-20T22:29:07.671Z",
      },
      {
        state: "PACKAGE_RECEIVED",
        timestamp: "2020-07-21T06:11:45.522Z",
        hub: "Tanta Hub",
      },
      {
        state: "NOT_YET_SHIPPED",
        timestamp: "2020-07-21T09:12:08.197Z",
      },
      {
        state: "OUT_FOR_DELIVERY",
        timestamp: "2020-07-21T09:12:08.609Z",
      },
      {
        state: "WAITING_FOR_CUSTOMER_ACTION",
        timestamp: "2020-07-21T09:29:14.016Z",
        reason: "تأجيل - العميل طلب التاجيل ليوم اخر",
      },
      {
        state: "PACKAGE_RECEIVED",
        timestamp: "2020-07-22T07:47:22.206Z",
        hub: "Tanta Hub",
      },
      {
        state: "NOT_YET_SHIPPED",
        timestamp: "2020-07-25T10:35:10.858Z",
      },
      {
        state: "OUT_FOR_DELIVERY",
        timestamp: "2020-07-25T10:35:11.500Z",
      },
      {
        state: "DELIVERED",
        timestamp: "2020-07-25T12:25:31.247Z",
      },
    ],
    CreateDate: "2020-07-20T16:34:55.150Z",
    isEditableShipment: false,
    nextWorkingDay: [
      {
        dayDate: "2020-07-23",
        dayName: "Thrusday",
      },
    ],
  });
  const [messages, setMessages] = useState(Arabic);

  useEffect(() => {
    const toggleModal = (e) => {
      if (
        !e.target.classList.contains("shown") &&
        !e.target.classList.contains("track-shipment") &&
        !e.target
          .closest(".custom-modal")
          ?.classList.contains("custom-modal") &&
        document.querySelectorAll(".shown")
      )
        document
          .querySelectorAll(".shown")
          ?.forEach((el) => el.classList.remove("shown"));
    };

    document.addEventListener("click", toggleModal);

    return () => document.removeEventListener("click", toggleModal);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;

    document.body.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");

    localStorage.setItem("lang", locale);

    document.querySelector("title").textContent =
      locale === "ar" ? "بوسطة" : "Bosta";

    if (locale === "ar") {
      setMessages(Arabic);
    } else {
      setMessages(English);
    }
  }, [locale]);

  return (
    <Context.Provider
      value={{ locale, setLocale, trackedData, setTrackedData }}
    >
      <IntlProvider messages={messages} locale={locale} onError={() => {}}>
        <Header />
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export const Context = createContext();
export default Wrapper;
