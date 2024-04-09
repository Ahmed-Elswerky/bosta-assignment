import { useContext, useState } from "react";
import { Context } from "views/wrapper";
import { useIntl, FormattedMessage } from "react-intl";
import { ReactComponent as LogoArIcon } from "assets/logo-ar.svg";
import { ReactComponent as LogoEnIcon } from "assets/logo-en.svg";
import { ReactComponent as SearchIcon } from "assets/search.svg";

export default function Header() {
  const context = useContext(Context);
  const { locale } = useIntl();

  const handleChangeLangOnClick = () => {
    context.setLocale(locale === "ar" ? "en" : "ar");
  };

  const LogoIcon = () => (locale === "en" ? <LogoEnIcon /> : <LogoArIcon />);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const response = await fetch(
      `https://tracking.bosta.co/shipments/track/${data.get("id")}`
    ).then((res) => res.json());
    context.setTrackedData(response);
  };

  const handleToggle = () =>
    document.getElementById("track-id-modal").classList.toggle("shown");

  return (
    <header>
      <div>
        <LogoIcon />
      </div>

      <div className="actions">
        <button className="track-shipment" onClick={handleToggle}>
          <FormattedMessage id="track-shipment" />
        </button>

        <div id="track-id-modal" className="custom-modal">
          <h5>
            <FormattedMessage id="shipment-id" />
          </h5>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="id"
                list="trackId"
                defaultValue="7234258"
              />
              <button>
                <SearchIcon />
              </button>
            </div>
            <datalist id="trackId">
              <option value="7234258" />
              <option value="13737343" />
              <option value="67151313" />
            </datalist>
          </form>
        </div>

        <button className="btn px-0" onClick={handleChangeLangOnClick}>
          <h5>{locale === "ar" ? "EN" : "AR"}</h5>
        </button>
      </div>
    </header>
  );
}
