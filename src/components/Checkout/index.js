import { Apis } from "../../services/Api/config";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GetUser, Orders } from "../../services";
import config from "../config";
import { cartActions } from "../../store/shopping-cart/cartSlice";
import { useDispatch } from "react-redux";
import { GetProducts, Tarif } from "../../services";
import wilayasData from "./wilayas.json"; // Importez vos données de wilayas et communes ici
import communeData from "./commune.json"; // Importez vos données de wilayas et communes ici

import i18n from "../../i18n";
// import { MDBCheckbox } from 'mdb-react-ui-kit';

const Checkout = () => {
  const subtotal = useSelector((state) => state.cart.totalAmount);
  const totalq = useSelector((state) => state.cart.totalQuantity);
  let items = useSelector((state) => state.cart.cartItems);
  const [user, setUser] = useState({});
  const [tarif, setTarif] = useState([]);
  const [message, setMessage] = useState("");
  const [conditions, setCondition] = useState(0);
  const [saleproduct, setsaleproduct] = useState([]);

  // console.log(wilayasData)
  // const [facilatedorder, setfacilatedorder] = useState()
  // const [checked, setChecked] = useState(false);
  const simulatorStorge = JSON.parse(localStorage.getItem("simulator"));
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [tarifmode, setTarifMode] = useState();
  const [paymentmode, setPaymentMode] = useState();

  // const [selectedCommune, setSelectedCommune] = useState('');
  const [communes, setCommunes] = useState(
    user?.commune?.id
      ? communeData.filter((e) => e.wilaya_id === user?.wilaya.id)
      : []
  );
  const [file, setFile] = useState(null);
  let somme = 0;
  let itemsArray = [];
  const handleWilayaChange = (event) => {
    const selectedWilaya = event.target.value;
    setSelectedWilaya(wilayasData.find((e) => e.id === selectedWilaya));
    // Filtrer les communes correspondantes
    // const wilayaData = wilayasData.find(w => w.wilaya === selectedWilaya);
    const communeList = communeData.filter(
      (e) => e.wilaya_id === selectedWilaya
    );
    setUser({
      ...user,
      wilaya: wilayasData.find((e) => e.id === selectedWilaya),
    });
    setCommunes(communeList);

    // Réinitialiser la commune sélectionnée
    //setSelectedCommune('');
    //setUser({ ...user, "commune": "" })
  };

  const handleCommuneChange = (event) => {
    setUser({
      ...user,
      commune: communeData.find((e) => e.id === event.target.value),
    });
    //setSelectedCommune(communeData.find(e => e.id === event.target.value));
  };

  const handleMessageChange = (event) => {
    // 👇️ access textarea value
    setMessage(event.target.value);
    //console.log(event.target.value);
  };

  const getUser = async () => {
    let t = await GetUser.isAuthenticate();
    //console.log(t)
    if (t) {
      // console.log('t',t)
      setUser(t.user);
    }
    // console.log(token)
  };
  const setuserinformation = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF file.");
    }
  };
  const dispatch = useDispatch();
  const addOrders = async () => {
    let data = {};
    simulatorStorge
      ? (data = {
          id: user?.id,
          paymentmethod: paymentmode,
          items: itemsArray,
          tarif_delivery:
            tarifmode === "tarif_delivery" && user.wilaya.id
              ? tarif.find((t) => t.wilaya === user.wilaya.name)?.tarif_delivery
              : tarifmode === "tarif_delivery" && !user.wilaya.id
              ? tarif.find((t) => t.wilaya === user.wilaya)?.tarif_delivery
              : null,
          tarif_stop_desk:
            tarifmode === "tarif_stop_desk" && user.wilaya.id
              ? tarif.find((t) => t.wilaya === user.wilaya.name)
                  ?.tarif_stock_desk
              : tarifmode === "tarif_stop_desk" && !user.wilaya.id
              ? tarif.find((t) => t.wilaya === user.wilaya)?.tarif_stock_desk
              : null,
          subtotal: somme.toFixed(2),
          // (somme + config.livraison).toFixed(2) + " DA"
          // somme + config.livraison,
          totalq: totalq,
          duration: simulatorStorge.sale_number,
          order_facilated: 1,
        })
      : (data = {
          id: user?.id,
          paymentmethod: paymentmode,
          items: items,
          note: message,
          tarif_delivery:
            tarifmode === "tarif_delivery" && user.wilaya.id
              ? tarif.find((t) => t.wilaya === user.wilaya.name)?.tarif_delivery
              : tarifmode === "tarif_delivery" && !user.wilaya.id
              ? tarif.find((t) => t.wilaya === user.wilaya)?.tarif_delivery
              : null,
          tarif_stop_desk:
            tarifmode === "tarif_stop_desk" && user.wilaya.id
              ? tarif.find((t) => t.wilaya === user.wilaya.name)
                  ?.tarif_stock_desk
              : tarifmode === "tarif_stop_desk" && !user.wilaya.id
              ? tarif.find((t) => t.wilaya === user.wilaya)?.tarif_stock_desk
              : null,
          subtotal: subtotal,
          totalq: totalq,
          duration: 0,
          order_facilated: 0,
        });
    console.log("somme", data);
    const userData = {
      ...user,
      wilaya: user.wilaya?.name,
      commune: user.commune?.name,
      salary: simulatorStorge?.value,
      date_birth: new Date(simulatorStorge?.date),
    };
    if (conditions === 1) {
      const formData = new FormData();
      formData.append("pdf", file);
      // console.log("user", formData)
      var upload = await GetUser.uploadFile(user.id, formData);
      var adding = await GetUser.userUpdate(user.id, userData);
      //console.log("adding",adding,upload)

      if (adding && upload) {
        simulatorStorge && localStorage.removeItem("simulator");
        localStorage.setItem("user", JSON.stringify(userData));
      }
      let t = await Orders.addOrders(data);
      //console.log(t)
      if (t) {
        items.forEach((e) => {
          dispatch(cartActions.deleteItem(e.id));
        });

        setTimeout(function () {
          window.location.href = "/profile";
        }, 1000);
      }
    }
  };
  const getList = async () => {
    var list1 = await GetProducts.getAllProductByfacilated();
    //console.log("list1", list1)
    if (list1) {
      setsaleproduct(list1.data);
    }
  };
  const getTarif = async () => {
    var t = await Tarif.TarifIndex();
    console.log("tarif", t);
    if (t) {
      setTarif(t.data);
    }
  };
  const TarifMode = (value) => {
    console.log("user.wilaya", user?.wilaya);
    console.log("user.wilaya", user.wilaya);
    setTarifMode(value);
  };
  useEffect(() => {
    simulatorStorge && getList();
    getTarif();
    getUser();
    setCommunes(communeData.filter((e) => e.wilaya_id === user.wilaya?.id));
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-6 col-lg-6 " style={{ padding: "30px" }}>
          <div className="row justify-content-center">
            {simulatorStorge ? (
              <div className="customer register col-md-8 col-12">
                <h2 style={{ fontWeight: "400" }}>
                  {i18n.t("contact information")}
                </h2>

                <div className="field">
                  <input
                    disabled
                    type="email"
                    name="email"
                    value={user?.email}
                    id="RegisterForm-email"
                    autocomplete="email"
                    placeholder={i18n.t("email")}
                  />
                  <label for="RegisterForm-email">{i18n.t("email")}</label>
                </div>

                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6">
                    <div className="field">
                      <input
                        type="text"
                        name="first_name"
                        id="RegisterForm-FirstName"
                        value={user?.first_name}
                        autocomplete="given-name"
                        placeholder={i18n.t("first_name")}
                        onChange={(e) => setuserinformation(e, "first_name")}
                        // aria-required="true"
                      />
                      <label for="RegisterForm-FirstName">
                        {i18n.t("first_name")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <input
                        type="text"
                        name="last_name"
                        id="RegisterForm-LastName"
                        value={user?.last_name}
                        autocomplete="family-name"
                        placeholder={i18n.t("last_name")}
                        onChange={(e) => setuserinformation(e, "last_name")}

                        // aria-required="true"
                      />
                      <label for="RegisterForm-LastName">
                        {i18n.t("last_name")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6">
                    <div className="field">
                      <input
                        type="date"
                        name="date_of_borth"
                        id="RegisterForm-LastName"
                        value={simulatorStorge?.date}
                        autocomplete="family-name"
                        placeholder={i18n.t("Date of birth")}
                        disabled
                        // aria-required="true"
                      />
                      <label for="RegisterForm-LastName">
                        {i18n.t("Date of birth")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <input
                        type="text"
                        name="phone"
                        id="RegisterForm-LastName"
                        value={user?.phone}
                        autocomplete="family-name"
                        placeholder={i18n.t("phone")}
                        onChange={(e) => setuserinformation(e, "phone")}

                        // aria-required="true"
                      />
                      <label for="RegisterForm-LastName">
                        {i18n.t("phone")}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6">
                    <div className="field">
                      <div class="select">
                        <select
                          class="facet-filters__sort select__select caption-large"
                          value={
                            wilayasData.find((e) => e.name === user.wilaya)?.id
                          }
                          onChange={handleWilayaChange}
                        >
                          <option value="">-- {i18n.t("wilaya")} --</option>
                          {wilayasData.map((wilaya, index) => (
                            <option key={index} value={wilaya.id}>
                              {wilaya.name}
                            </option>
                          ))}
                        </select>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-caret"
                          viewBox="0 0 10 6"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <div class="select">
                        <select
                          class="facet-filters__sort select__select caption-large"
                          value={
                            communeData.find((c) => c.name === user.commune)?.id
                          }
                          onChange={handleCommuneChange}
                        >
                          <option value="">-- {i18n.t("commune")} --</option>
                          {user.commune && communes.length === 0
                            ? communeData
                                .filter(
                                  (c) =>
                                    c.wilaya_id ===
                                    wilayasData.find(
                                      (e) => e.name === user.wilaya
                                    )?.id
                                )
                                .map((commune, index) => (
                                  <option key={index} value={commune.id}>
                                    {commune.name}
                                  </option>
                                ))
                            : communes.map((commune, index) => (
                                <option key={index} value={commune.id}>
                                  {commune.name}
                                </option>
                              ))}
                        </select>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-caret"
                          viewBox="0 0 10 6"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <input
                    type="text"
                    name="address"
                    id="RegisterForm-LastName"
                    value={user?.address}
                    autocomplete="family-name"
                    placeholder={i18n.t("address")}
                    // aria-required="true"
                    onChange={(e) => setuserinformation(e, "address")}
                  />
                  <label for="RegisterForm-LastName">{i18n.t("address")}</label>
                </div>
                <h2 style={{ fontWeight: "400", marginTop: "8px" }}>
                  {i18n.t("Information professionnel")}
                </h2>
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6">
                    <div className="field">
                      <div class="select">
                        <select
                          class="facet-filters__sort select__select caption-large"
                          value={user?.activity_sector}
                          onChange={(e) =>
                            setuserinformation(e, "activity_sector")
                          }
                        >
                          <option value="">
                            {i18n.t("Secteur d'activité")}
                          </option>
                          <option value="Public">{i18n.t("Public")}</option>
                          <option value="Privé">{i18n.t("Privé")}</option>
                          <option value="Retraité">{i18n.t("Retraité")}</option>
                          <option value="Indépendant">
                            {i18n.t("Indépendant")}
                          </option>
                        </select>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-caret"
                          viewBox="0 0 10 6"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <div class="select">
                        <select
                          class="facet-filters__sort select__select caption-large"
                          value={user?.contract_type}
                          onChange={(e) =>
                            setuserinformation(e, "contract_type")
                          }
                        >
                          <option value="">{i18n.t("Type de contrat")}</option>
                          <option value="CDI">{i18n.t("CDI")}</option>
                          <option value="CDD">{i18n.t("CDD")}</option>
                          <option value="Autre">{i18n.t("Autre")}</option>
                        </select>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-caret"
                          viewBox="0 0 10 6"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6">
                    <div className="field">
                      <input
                        type="text"
                        name="profession"
                        value={user?.profession}
                        onChange={(e) => setuserinformation(e, "profession")}
                        placeholder={i18n.t("Profession")}
                      />
                      <label for="RegisterForm-LastName">
                        {i18n.t("Profession")}
                      </label>
                    </div>
                  </div>
                </div>
                <h2 style={{ fontWeight: "400", marginTop: "8px" }}>
                  {i18n.t("Votre dossier")}
                </h2>
                <div className="col-md-6">
                  <div className="field">
                    <input
                      type="file"
                      name="upload_file"
                      placeholder={i18n.t("upload file")}
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    <label for="RegisterForm-email">
                      {i18n.t("upload file")}
                    </label>
                  </div>
                </div>
                <button onClick={() => addOrders()}>
                  {i18n.t("shipping")}
                </button>
              </div>
            ) : (
              <div className="customer register col-md-8 col-12">
                <h2 style={{ fontWeight: "400" }}>
                  {i18n.t("contact information")}
                </h2>

                <div className="field">
                  <input
                    disabled
                    type="email"
                    name="email"
                    value={user?.email}
                    id="RegisterForm-email"
                    autocomplete="email"
                    placeholder={i18n.t("email")}
                  />
                  <label for="RegisterForm-email">{i18n.t("email")}</label>
                </div>

                {/* <h2 style={{ fontWeight: "400", marginTop: "10px" }}>Shipping address</h2> */}
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6">
                    <div className="field">
                      <input
                        type="text"
                        name="first_name"
                        id="RegisterForm-FirstName"
                        value={user?.first_name}
                        autocomplete="given-name"
                        placeholder={i18n.t("first_name")}
                        onChange={(e) => setuserinformation(e, "first_name")}
                        // aria-required="true"
                      />
                      <label for="RegisterForm-FirstName">
                        {i18n.t("first_name")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <input
                        type="text"
                        name="last_name"
                        id="RegisterForm-LastName"
                        value={user?.last_name}
                        autocomplete="family-name"
                        placeholder={i18n.t("last_name")}
                        onChange={(e) => setuserinformation(e, "last_name")}

                        // aria-required="true"
                      />
                      <label for="RegisterForm-LastName">
                        {i18n.t("last_name")}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <input
                    type="text"
                    name="phone"
                    id="RegisterForm-LastName"
                    value={user?.phone}
                    autocomplete="family-name"
                    placeholder={i18n.t("phone")}
                    onChange={(e) => setuserinformation(e, "phone")}

                    // aria-required="true"
                  />
                  <label for="RegisterForm-LastName">{i18n.t("phone")}</label>
                </div>
                <div className="row" style={{ marginTop: "10px" }}>
                  <div className="col-md-6">
                    <div className="field">
                      <div class="select">
                        <select
                          class="facet-filters__sort select__select caption-large"
                          value={
                            wilayasData.find((e) => e.name === user.wilaya)?.id
                          }
                          onChange={handleWilayaChange}
                        >
                          <option value="">-- {i18n.t("wilaya")} --</option>
                          {wilayasData.map((wilaya, index) => (
                            <option key={index} value={wilaya.id}>
                              {wilaya.name}
                            </option>
                          ))}
                        </select>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-caret"
                          viewBox="0 0 10 6"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <div class="select">
                        <select
                          class="facet-filters__sort select__select caption-large"
                          value={
                            communeData.find((c) => c.name === user.commune)?.id
                          }
                          onChange={handleCommuneChange}
                        >
                          <option value="">-- {i18n.t("commune")} --</option>
                          {user.commune && communes.length === 0
                            ? communeData
                                .filter(
                                  (c) =>
                                    c.wilaya_id ===
                                    wilayasData.find(
                                      (e) => e.name === user.wilaya
                                    )?.id
                                )
                                .map((commune, index) => (
                                  <option key={index} value={commune.id}>
                                    {commune.name}
                                  </option>
                                ))
                            : communes.map((commune, index) => (
                                <option key={index} value={commune.id}>
                                  {commune.name}
                                </option>
                              ))}
                        </select>
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-caret"
                          viewBox="0 0 10 6"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="field">
                                    <input
                                        type="text"
                                        name="city"
                                        id="RegisterForm-LastName"
                                        value={user?.city}
                                        autocomplete="family-name"
                                        placeholder={i18n.t("city")}
                                        onChange={(e) => setuserinformation(e, "city")}

                                    // aria-required="true"


                                    />
                                    <label for="RegisterForm-LastName">
                                        {i18n.t("city")}
                                    </label>
                                </div> */}
                <div className="field">
                  <input
                    type="text"
                    name="address"
                    id="RegisterForm-LastName"
                    value={user?.address}
                    autocomplete="family-name"
                    placeholder={i18n.t("address")}
                    // aria-required="true"
                    onChange={(e) => setuserinformation(e, "address")}
                  />
                  <label for="RegisterForm-LastName">{i18n.t("address")}</label>
                </div>
                <div className="field">
                  <textarea
                    style={{
                      maxWidth: "100%",
                      width: "100%",
                      minHeight: "100px",
                    }}
                    name="note"
                    placeholder={i18n.t("note")}
                    value={message}
                    onChange={handleMessageChange}

                    // aria-required="true"
                  ></textarea>
                </div>
                <button onClick={() => addOrders()}>
                  {i18n.t("shipping")}
                </button>
              </div>
            )}
          </div>
        </div>
        <div
          className="col-12  col-md-6 col-lg-6  checkout-cart"
          style={{ padding: "30px" }}
        >
          <cart-items className=" is-empty">
            <div id="webi-main-cart-items" data-id="cart-icon-bubble">
              <div class="js-contents">
                {items.map((e, key) => {
                  const productFacilated = saleproduct?.find(
                    (sale) =>
                      sale?.sale_number === simulatorStorge?.sale_number &&
                      sale?.id_product === e.id
                  );
                  let x = {
                    ...e,
                    sale_price: productFacilated?.sale_price,
                    sale_totalPrice: (
                      productFacilated?.sale_price * e.quantity
                    ).toFixed(2),
                  };
                  somme += productFacilated?.sale_price * e.quantity;
                  itemsArray.push(x);
                  // console.log("somme",items[key])

                  return (
                    <div class="wbheadcartdrop" id="WbCartItem-1">
                      <div class="wbcartdimg" style={{ position: "relative" }}>
                        <img
                          class="img-fluid mx-auto"
                          src={Apis.slug + e.image}
                          alt="RDP smart laptops"
                          loading="lazy"
                          width="100"
                          height="100"
                        />
                        <div className="quantity-style">
                          <p style={{ color: "#ffffff" }}>{e.quantity}</p>
                        </div>
                      </div>
                      <div class="wbcartddesc">
                        <p style={{ color: "#000000" }} class="wbcrtname">
                          {e.name}
                        </p>
                        { e?.color && <dl>
                          <div className="product-option">
                            <dt>{i18n.t("Color")}: </dt>
                            <dd>{e?.color}</dd>
                          </div>
                        </dl>}
                        <dl>
                          <div class="product-option">
                            {simulatorStorge ? (
                              <dt>{productFacilated?.sale_price + " DA"} </dt>
                            ) : (
                              ""
                            )}

                            {simulatorStorge ? (
                              <dd>
                                {i18n.t("/Mois jusqu'à") +
                                  " " +
                                  simulatorStorge?.sale_number +
                                  " " +
                                  i18n.t("month")}
                              </dd>
                            ) : (
                              ""
                            )}
                          </div>
                        </dl>
                      </div>
                      <div class="wbcartddesc">
                        <div class="cart-item__price-wrapper">
                          <p
                            class="price price--end"
                            style={{ color: "#2b2b2b", fontWeight: "500" }}
                          >
                            {simulatorStorge
                              ? (productFacilated?.sale_price * e.quantity).toFixed(2) +
                                " DA"
                              : e.totalPrice + " DA"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div
                class=""
                id="webi-main-cart-footer"
                data-id="cart-icon-bubble"
                style={{ paddingTop: "20px" }}
              >
                <div class="cart__blocks">
                  <div class="totals wbheadcartdrop">
                    <div class="wbcartddesc">
                      <p>
                        {simulatorStorge
                          ? i18n.t("Subtotal") + "/" + i18n.t("month")
                          : i18n.t("Subtotal")}
                        :
                      </p>
                    </div>
                    <div class="wbcartddesc">
                      <div class="cart-item__price-wrapper">
                        <p style={{ color: "#2b2b2b", fontWeight: "500" }}>
                          {" "}
                          {simulatorStorge
                            ? somme.toFixed(2) + " DA"
                            : subtotal.toFixed(2) + " DA"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="totals wbheadcartdrop">
                    <div class="wbcartddesc">
                      <p>{i18n.t("shipping2")}:</p>
                    </div>
                    <div class="wbcartddesc">
                      <div class="cart-item__price-wrapper">
                        <p style={{ color: "#2b2b2b", fontWeight: "500" }}>
                          {" "}
                          {tarifmode === "tarif_delivery" && user?.wilaya?.id
                            ? tarif.find((t) => t.wilaya === user?.wilaya?.name)
                                ?.tarif_delivery + " DA"
                            : tarifmode === "tarif_delivery" && !user?.wilaya?.id
                            ? tarif.find((t) => t?.wilaya === user.wilaya)
                                ?.tarif_delivery + " DA"
                            : tarifmode === "tarif_stop_desk" && user?.wilaya?.id
                            ? tarif.find((t) => t?.wilaya === user?.wilaya?.name)
                                ?.tarif_stock_desk + " DA"
                            : tarifmode === "tarif_stop_desk" && !user?.wilaya?.id
                            ? tarif.find((t) => t?.wilaya === user?.wilaya)
                                ?.tarif_stock_desk + " DA"
                            : 0 + " DA"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  class=""
                  style={{
                    listStyle: "none",
                    paddingLeft: "unset",
                    marginTop: "20px",
                  }}
                >
                  <li class="payment_methods">
                    <input
                      id="payment_method_cod"
                      type="radio"
                      class="input-radio"
                      name="tarifmode"
                      onChange={(e) =>
                        e.target.checked && TarifMode("tarif_delivery")
                      }
                    />

                    <label
                      for="payment_method_cod"
                      style={{
                        verticalAlign: "middle",
                        fontWeight: "400",
                        marginLeft: "8px",
                      }}
                    >
                      {i18n.t("Tarif à livraison")}{" "}
                    </label>
                    <div
                      class="payment_box"
                      style={{
                        display:
                          tarifmode === "tarif_delivery" ? "block" : "none",
                      }}
                    >
                      <p>
                        {tarifmode === "tarif_delivery" && user?.wilaya?.id
                          ? tarif.find((t) => t?.wilaya === user?.wilaya?.name)
                              ?.tarif_delivery + " DA"
                          : tarifmode === "tarif_delivery" && !user?.wilaya?.id
                          ? tarif.find((t) => t?.wilaya === user?.wilaya)
                              ?.tarif_delivery + " DA"
                          : ""}
                      </p>
                    </div>
                  </li>
                  <li class="payment_methods">
                    <input
                      id="payment_method_cc_ctp"
                      type="radio"
                      class="input-radio"
                      name="tarifmode"
                      onChange={(e) =>
                        e.target.checked && TarifMode("tarif_stop_desk")
                      }
                    />

                    <label
                      for="payment_method_cod"
                      style={{
                        verticalAlign: "middle",
                        fontWeight: "400",
                        marginLeft: "8px",
                      }}
                    >
                      {i18n.t("Tarif stop-desk")}{" "}
                    </label>
                    <div
                      class="payment_box"
                      style={{
                        display:
                          tarifmode === "tarif_stop_desk" ? "block" : "none",
                      }}
                    >
                      <p>
                        {tarifmode === "tarif_stop_desk" && user?.wilaya?.id
                          ? tarif.find((t) => t.wilaya === user?.wilaya?.name)
                              ?.tarif_stock_desk + " DA"
                          : tarifmode === "tarif_stop_desk" && !user?.wilaya?.id
                          ? tarif.find((t) => t?.wilaya === user?.wilaya)
                              ?.tarif_stock_desk + " DA"
                          : ""}
                      </p>
                    </div>
                  </li>
                </ul>
                <div class="cart__blocks">
                  <div class="totals wbheadcartdrop">
                    <div class="wbcartddesc">
                      <p>
                        {simulatorStorge
                          ? i18n.t("Total") + "/" + i18n.t("month")
                          : i18n.t("Total")}
                        :
                      </p>
                    </div>
                    <div class="wbcartddesc">
                      <div class="cart-item__price-wrapper">
                        <p style={{ color: "#2b2b2b", fontWeight: "600" }}>
                          {simulatorStorge
                            ? tarifmode === "tarif_delivery" && user?.wilaya?.id
                              ? (
                                  tarif.find(
                                    (t) => t.wilaya === user?.wilaya?.name
                                  )?.tarif_delivery + somme
                                ).toFixed(2) + " DA"
                              : tarifmode === "tarif_delivery" &&
                                !user.wilaya.id
                              ? (
                                  tarif.find((t) => t?.wilaya === user?.wilaya)
                                    ?.tarif_delivery + somme
                                ).toFixed(2) + " DA"
                              : tarifmode === "tarif_stop_desk" &&
                                user?.wilaya?.id
                              ? (
                                  tarif.find(
                                    (t) => t.wilaya === user.wilaya.name
                                  )?.tarif_stock_desk + somme
                                ).toFixed(2) + " DA"
                              : tarifmode === "tarif_stop_desk" &&
                                !user?.wilaya?.id
                              ? (
                                  tarif.find((t) => t?.wilaya === user?.wilaya)
                                    ?.tarif_stock_desk + somme
                                ).toFixed(2) + " DA"
                              : somme.toFixed(2) + " DA"
                            : // (somme + config.livraison).toFixed(2) + " DA"
                            tarifmode === "tarif_delivery" && user?.wilaya?.id
                            ? (
                                tarif.find((t) => t?.wilaya === user?.wilaya?.name)
                                  ?.tarif_delivery + subtotal
                              ).toFixed(2) + " DA"
                            : tarifmode === "tarif_delivery" && !user?.wilaya?.id
                            ? (
                                tarif.find((t) => t?.wilaya === user?.wilaya)
                                  ?.tarif_delivery + subtotal
                              ).toFixed(2) + " DA"
                            : tarifmode === "tarif_stop_desk" && user?.wilaya?.id
                            ? (
                                tarif.find((t) => t.wilaya === user?.wilaya?.name)
                                  ?.tarif_stock_desk + subtotal
                              ).toFixed(2) + " DA"
                            : tarifmode === "tarif_stop_desk" && !user?.wilaya?.id
                            ? (
                                tarif.find((t) => t?.wilaya === user?.wilaya)
                                  ?.tarif_stock_desk + subtotal
                              ).toFixed(2) + " DA"
                            : subtotal.toFixed(2) + " DA"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {simulatorStorge && (
                  <div class="cart__blocks">
                    <div class="totals wbheadcartdrop">
                      <div class="wbcartddesc">
                        <p>{i18n.t("Votre salaire")}:</p>
                      </div>
                      <div class="wbcartddesc">
                        <div class="cart-item__price-wrapper">
                          <p style={{ color: "#2b2b2b", fontWeight: "600" }}>
                            {simulatorStorge.value + " DA"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="totals wbheadcartdrop">
                      <div class="wbcartddesc">
                        <p>{i18n.t("Durée")}:</p>
                      </div>
                      <div class="wbcartddesc">
                        <div class="cart-item__price-wrapper">
                          <p style={{ color: "#2b2b2b", fontWeight: "600" }}>
                            {simulatorStorge?.sale_number +
                              " " +
                              i18n.t("month")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div class="cart__blocks">
                  <ul
                    class=""
                    style={{
                      listStyle: "none",
                      paddingLeft: "unset",
                      marginTop: "20px",
                    }}
                  >
                    <li class="payment_methods">
                      <input
                        id="payment_method_cod"
                        type="radio"
                        class="input-radio"
                        name="payment_method"
                        onChange={(e) =>
                          e.target.checked && setPaymentMode("payment_delivery")
                        }
                      />

                      <label
                        for="payment_method_cod"
                        style={{
                          verticalAlign: "middle",
                          fontWeight: "400",
                          marginLeft: "8px",
                        }}
                      >
                        {i18n.t("Paiement à la livraison")}{" "}
                      </label>
                      <div
                        class="payment_box"
                        style={{
                          display:
                            paymentmode === "payment_delivery"
                              ? "block"
                              : "none",
                        }}
                      >
                        <p>
                          {i18n.t("Payer en argent comptant à la livraison.")}
                        </p>
                      </div>
                    </li>
                    {/* <li class="payment_methods">
                                            <input id="payment_method_cc_ctp" type="radio" class="input-radio" name="payment_method"
                                                onChange={e => e.target.checked && setPaymentMode("payment_card")}
                                            />

                                            <label for="payment_method_cod" style={{ verticalAlign: "middle", fontWeight: "400", marginLeft: "8px" }}>
                                                {i18n.t('Carte De Crédit Bancaire')}	</label>
                                            <div class="payment_box" style={{ display: paymentmode === "payment_card" ? ("block") : "none" }} >
                                                <p>{i18n.t('Payer avec votre carte bancaire à travers le service ClicToPay.')}</p>
                                            </div>
                                        </li> */}
                  </ul>
                  <div class="totals wbheadcartdrop">
                    <p
                      style={{
                        fontWeight: "400",
                        lineHeight: "1.5",
                        color: "#000",
                      }}
                    >
                      {i18n.t(
                        "Vos données personnelles seront utilisées pour traiter votre commande, soutenir votre expérience sur ce site Web et à d'autres fins décrites dans notre politique de confidentialité."
                      )}
                    </p>
                  </div>

                  <div class="totals wbheadcartdrop">
                    <p
                      style={{
                        fontWeight: "400",
                        lineHeight: "1.5",
                        color: "#000",
                      }}
                    >
                      <input
                        type="checkbox"
                        onChange={(e) => e.target.checked && setCondition(1)}
                      />
                      <span>
                        {" "}
                        {i18n.t(
                          "J’ai lu et j’accepte les conditions générales"
                        )}{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </cart-items>
          {/* <div  class="sperator-item"></div> */}
        </div>
      </div>
    </>
  );
};

export default Checkout;
