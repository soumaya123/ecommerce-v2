import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetUser, Orders } from "../../services";
import moment from "moment";
import i18n from "../../i18n";
//import { useSelector } from 'react-redux';

import ModalOrders from "./order-modal";
import wilayasData from '../Checkout/wilayas.json'; // Importez vos données de wilayas et communes ici
import communeData from '../Checkout/commune.json'; // Importez vos données de wilayas et communes ici
// import { Link } from 'react-router-dom'
const Profile = (props) => {
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState();
  const [selectedWilaya, setSelectedWilaya] = useState('');
  const [selectedCommune, setSelectedCommune] = useState('');
  const [communes, setCommunes] = useState([]);
  const userStorage = JSON.parse(localStorage.getItem("user"));
  // console.log("items",items)
  const getUser = async () => {
    let t = await GetUser.isAuthenticate();
    console.log(t);
    if (t) {
      setUser(t.user);
      //alert(JSON.stringify)
    }
  };
  const setuserinformation = (e, key) => {
    setUser({ ...user, [key]: e.target.value });
  };
  const getOrders = async () => {
    let o = await Orders.getOrders();

    if (o) {
      let ordersArray = [];
      //console.log("order",list.data)
      // Mettez à jour le statut pour chaque commande
      let statusOrderChild = [];
      await Promise.all(
        o.data
          .filter((e) => e.customerstId === userStorage.id)
          .map(async (row) => {
            const list1 = await Orders.getDelivery(row.code);
            const listOrderChild = await Orders.getOrdersChildByParentId(
              row.id
            );
            //console.log("listOrderChild",listOrderChild.data)
            if (list1 && listOrderChild.data?.length === 0) {
              let localStatus = "processing";
              if (
                list1.data?.delivery.length === 0 &&
                Object.values(list1.data?.colis).length === 0
              ) {
                localStatus = "processing";
              } else if (
                list1.data?.delivery.length === 0 &&
                Object.values(list1.data?.colis).length > 0
              ) {
                //console.log("orderstest2",row.code)
                localStatus = "processing";
              } else if (
                list1.data?.delivery.length > 0 &&
                Object.values(list1.data?.colis).length > 0
              ) {
                if (
                  list1.data?.delivery[0].status_delivery === 0 ||
                  list1.data?.delivery[0].status_delivery === 1
                ) {
                  localStatus = "shipping";
                } else if (
                  list1.data?.delivery[0].status_delivery === 3 ||
                  list1.data?.delivery[0].status_delivery === 4
                ) {
                  localStatus = "delieverd";
                } else if (list1.data?.delivery[0].status_delivery === 555) {
                  localStatus = "retour";
                } else if (list1.data?.delivery[0].status_delivery === 55) {
                  localStatus = "cloned";
                }
              }
              ordersArray.push({
                ...row,
                statusAuto: localStatus,
                orderChild: 0,
              });
            }
            if (listOrderChild.data?.length > 0) {
              let localStatus = "";
              let statusArray = [];
              await Promise.all(
                listOrderChild.data.map(async (order) => {
                  const order1 = await Orders.getDelivery(order.code);
                  if (
                    order1.data?.delivery.length === 0 &&
                    Object.values(order1.data?.colis).length === 0
                  ) {
                    //console.log("orderstest1",row.code)
                    statusArray.push("processing");
                    //localStatus = "processing";
                  } else if (
                    order1.data?.delivery.length === 0 &&
                    Object.values(order1.data?.colis).length > 0
                  ) {
                    //console.log("orderstest2",row.code)
                    statusArray.push("processing");
                    // localStatus = "processing";
                  } else if (
                    order1.data?.delivery.length > 0 &&
                    Object.values(order1.data?.colis).length > 0
                  ) {
                    console.log("order1", order1);

                    // const coliss = await OrdersStatus.OrdersChildDetailById(
                    //   order.id
                    // );

                    // coliss.data.map((l) => {

                    // const colis = order1.data?.delivery.filter(
                    //   (e) => e.colis?.product_id === l.productId
                    // )[0];
                    if (
                      order1.data?.delivery[0].status_delivery === 0 ||
                      order1.data?.delivery[0].status_delivery === 1
                    ) {
                      statusArray.push("shipping");
                    } else if (
                      order1.data?.delivery[0].status_delivery === 3 ||
                      order1.data?.delivery[0].status_delivery === 4
                    ) {
                      statusArray.push("delieverd");
                    } else if (
                      order1.data?.delivery[0].status_delivery === 555
                    ) {
                      statusArray.push("retour");
                    } else if (
                      order1.data?.delivery[0].status_delivery === 55
                    ) {
                      statusArray.push("cloned");
                    }

                    // });
                  }
                  // statusOrderChild.push(localStatus)
                })
              );
              if (
                statusArray.length ===
                statusArray.filter((e) => e === "shipping").length
              ) {
                localStatus = "shipping";
              } else if (
                statusArray.length ===
                statusArray.filter((e) => e === "delieverd").length
              ) {
                localStatus = "delieverd";
              } else if (
                statusArray.length ===
                statusArray.filter((e) => e === "retour").length
              ) {
                localStatus = "retour";
              } else if (
                statusArray.length ===
                statusArray.filter((e) => e === "cloned").length
              ) {
                localStatus = "cloned";
              } else if (
                statusArray.length !==
                  statusArray.filter((e) => e === "shipping").length &&
                statusArray.filter((e) => e === "processing").length < 0
              ) {
                localStatus = "shipping";
              } else if (
                statusArray.length ===
                statusArray.filter((e) => e === "delieverd").length +
                  statusArray.filter((e) => e === "cloned").length
              ) {
                localStatus = "cloned";
              } else if (
                statusArray.filter((e) => e === "processing").length > 0
              ) {
                localStatus = "processing";
              } else {
                localStatus = "shipping";
              }

              // if (statusOrderChild.length===statusOrderChild.filter((e)=>e==="shipping").length){
              //     statusAuto = "shipping";
              // }else if (statusOrderChild.length===statusOrderChild.filter((e)=>e==="delieverd").length){
              //     statusAuto = "delieverd";
              // }else if (statusOrderChild.length===statusOrderChild.filter((e)=>e==="retour").length){
              //     statusAuto = "retour";
              // }else if (statusOrderChild.length===statusOrderChild.filter((e)=>e==="cloned").length){
              //     statusAuto = "cloned";
              // }else if(statusOrderChild.length !==statusOrderChild.filter((e)=>e==="shipping").length&&(statusOrderChild.filter((e)=>e==="processing").length<0)){
              //     statusAuto = "shipping";
              // }else if(statusOrderChild.length ===(statusOrderChild.filter((e)=>e==="delieverd").length+(statusOrderChild.filter((e)=>e==="cloned").length))){
              //     statusAuto = "cloned";
              // }else if(statusOrderChild.filter((e)=>e==="processing").length>0){
              //     statusAuto = "processing";
              // }else{
              //     statusAuto = "shipping";
              // }
              ordersArray.push({ ...row, statusAuto: localStatus });
              //console.log("order",statusOrderChild)
              // return localStatus;
            }
          })
      );
      setOrders(ordersArray);

      // setlist(ordersArray);
    }
  };
  // const [show, setShow] = useState(false);
  //const [cridentials, setcridentials] = useState({ first_name: props.X.first_name, last_name: props.X.last_name,city:props.X.city,address:props.X.address,phone:props.X.phone,email:props.X.email})
  // const onRecordChange = (e, key) => {
  //     const { value } = e.target;
  //     setcridentials(prevState => ({
  //         ...prevState,
  //         [key]: value
  //     }));
  // };
  const handleSubmit = async (data) => {
    var adding = await GetUser.userUpdate(data.id, data);
    //console.log(adding)
    if (adding) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/profile";
    }
  };
  // const handleShow = () => setShow(true);
  useEffect(() => {
    getUser();
    getOrders();
    //alert(JSON.stringify(props.S))
  }, []);
  const handleWilayaChange = (event) => {
    const selectedWilaya = event.target.value;
    setSelectedWilaya(wilayasData.find(e => e.id === selectedWilaya));
    console.log(selectedWilaya)
    setUser({ ...user, wilaya: wilayasData.find(e => e.id === selectedWilaya)?.name });
    // Filtrer les communes correspondantes
    // const wilayaData = wilayasData.find(w => w.wilaya === selectedWilaya);
    const communeList = communeData.filter(e => e.wilaya_id === selectedWilaya);
    // setUser({ ...user, "wilaya": wilayasData.find(e => e.id === selectedWilaya) })
    setCommunes(communeList);

    // Réinitialiser la commune sélectionnée
    //setSelectedCommune('');
    //setUser({ ...user, "commune": "" })
};

const handleCommuneChange = (event) => {
    setSelectedCommune(communeData.find(e => e.id === event.target.value))
    setUser({ ...user, commune:communeData.find(e => e.id === event.target.value)?.name });

    // setUser({ ...user, "commune": communeData.find(e => e.id === event.target.value) })
    setSelectedCommune(communeData.find(e => e.id === event.target.value));
};
  //console.log("orders",orders)
  return (
    <>
      <div className="">
        <nav
          className="breadcrumb row"
          role="navigation"
          aria-label="breadcrumbs"
        >
          <div className="col-12">
            <a href="/" title="Home">
              {i18n.t("home")}
            </a>
            <span aria-hidden="true">
              <i className="fa fa-angle-right"></i>
            </span>
            <span>{i18n.t("My Account")}</span>
          </div>
        </nav>
      </div>
      <div className="carthead" style={{ justifyContent: "flex-end" }}>
        <Link to="/" className="underlined-link">
          {i18n.t("Continue shopping")}
        </Link>
      </div>
      <section
        id="shopify-section-template--14270126325823__main"
        className="shopify-section"
      >
        {/* <div className="">
                    <h1 className="heading text-left"><span>My Account</span></h1>

                </div> */}

        <div class="product-tab-item">
          <div class="pro-tab tabs">
            <ul class="list-inline nav nav-tabs text-center">
              <li class="nav-item active">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#wbprodtab1-1ccb1891-b5e1-4fb3-9730-41ac25850458"
                >
                  <span>{i18n.t("All Orders")}</span>
                </a>
              </li>
              <li class="nav-item ">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#wbprodtab1-f25f0917-6051-401a-9571-3dad3669d52d"
                >
                  <span>{i18n.t("Profile")}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="clearfix"></div>
          <div class="tab-content tab-pro">
            <div
              class="tab-pane fade "
              id="wbprodtab1-f25f0917-6051-401a-9571-3dad3669d52d"
            >
              <div className="row justify-content-center">
                <div className="customer register col-md-6 col-12">
                  <input
                    type="hidden"
                    name="form_type"
                    value="create_customer"
                  />
                  <input type="hidden" name="utf8" value="✓" />
                  <div className="field">
                    <input
                      type="text"
                      name="first_name"
                      id="RegisterForm-FirstName"
                      value={user?.first_name}
                      onChange={(e) => setuserinformation(e, "first_name")}
                      autocomplete="given-name"
                      placeholder={i18n.t("first_name")}
                      // aria-required="true"
                    />
                    <label for="RegisterForm-FirstName">
                      {i18n.t("first_name")}
                    </label>
                  </div>
                  <div className="field">
                    <input
                      type="text"
                      name="last_name"
                      id="RegisterForm-LastName"
                      value={user?.last_name}
                      onChange={(e) => setuserinformation(e, "last_name")}
                      autocomplete="family-name"
                      placeholder={i18n.t("last_name")}
                      // aria-required="true"
                    />
                    <label for="RegisterForm-LastName">
                      {i18n.t("last_name")}
                    </label>
                  </div>
                  <div className="field">
                    <input
                      type="text"
                      name="phone"
                      id="RegisterForm-LastName"
                      value={user?.phone}
                      onChange={(e) => setuserinformation(e, "phone")}
                      autocomplete="family-name"
                      placeholder={i18n.t("phone")}
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
                      // aria-required="true"
                      onChange={(e) => setuserinformation(e, "city")}
                    />
                    <label for="RegisterForm-LastName">{i18n.t("city")}</label>
                  </div> */}
                  <div className="field">
                    <input
                      type="text"
                      name="address"
                      id="RegisterForm-LastName"
                      value={user?.address}
                      autocomplete="family-name"
                      placeholder={i18n.t("address")}
                      onChange={(e) => setuserinformation(e, "address")}

                      // aria-required="true"
                    />
                    <label for="RegisterForm-LastName">
                      {i18n.t("address")}
                    </label>
                  </div>
                  <div className="field">
                    <input
                      type="email"
                      name="email"
                      value={user?.email}
                      id="RegisterForm-email"
                      autocomplete="email"
                      // aria-required="true"
                      onChange={(e) => setuserinformation(e, "email")}
                      placeholder={i18n.t("email")}
                    />
                    <label for="RegisterForm-email">{i18n.t("email")}</label>
                  </div>

                  <button onClick={() => handleSubmit(user)}>
                    {i18n.t("Update")}
                  </button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade active show"
              id="wbprodtab1-1ccb1891-b5e1-4fb3-9730-41ac25850458"
            >
              <div className="row justify-content-center">
                <div className="customer register col-md-8 col-12">
                  <table className="cart-items">
                    <thead>
                      <tr>
                        <th style={{ width: "unset" }}>{i18n.t("Orders")}</th>
                        <th>{i18n.t("Quantity")}</th>
                        <th>{i18n.t("Date of creation")}</th>
                        <th>{i18n.t("Status")}</th>
                        <th>{i18n.t("Actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((e, key) => {
                        return (
                          <tr className="cart-item" id="CartItem-1">
                            <td>{e.code}</td>
                            <td>{e.number}</td>
                            <td>
                              {`${moment(e.createdAt).format("DD/MM/YYYY")} `}
                            </td>
                            <td>
                              {e.statusAuto === "shipping"
                                ? i18n.t("shipping1")
                                : i18n.t(e.statusAuto)}
                            </td>

                            <ModalOrders order={e} />
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
