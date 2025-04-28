import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../i18n';
import { useSelector } from 'react-redux';
import { Apis } from '../../services/Api/config';
import { wishlistActions } from "../../store/wislist/wishlistSlice";
import { useDispatch } from "react-redux";

// import { Link } from 'react-router-dom'
const Wishlist = () => {
    const wishlist = useSelector(state => state.wishlist.wishlistItems)
    const deleteWishlist = (e) => {
        console.log(e)
        dispatch(wishlistActions.deleteItem(e.id))

    };
    const deleteAllWishlist = (wishlist) => {
        //console.log(e)
        wishlist.forEach(wish => {
            dispatch(wishlistActions.deleteItem(wish.id))
        });
        // wishlist.map((wish)=>{
        //     dispatch(wishlistActions.deleteItem(wish.id))
        // })

    };
    const dispatch = useDispatch()

    //console.log("wishlist",wishlist)
    return (
        <>
            <div className="">
                <nav className="breadcrumb row" role="navigation" aria-label="breadcrumbs">
                    <div className="col-12">
                        <Link to="/" title="Home">{i18n.t('home')}</Link>
                        <span aria-hidden="true"><i className="fa fa-angle-right"></i></span>
                        <span>{i18n.t('wishlist')} </span>

                    </div>
                </nav>
            </div>

            <div id="shopify-section-template--14270126358591__wishlist" className="shopify-section">
                <div className="wbmainwish">
                    <h1 className="heading text-left"><span>{i18n.t('wishlist')} </span></h1>
                    <div class="row rless">
                        {
                            wishlist.length > 0 ?
                                (wishlist.map((wish) => {
                                    return (
                                        <div class="cart col-lg-3 col-md-4 col-sm-4 col-6 cless" >
                                            <div class="wbinnerwish" data-product-id="4397860585535" data-product-handle="bajaj-gx1-500-w-camera">
                                                <div class="wbinnerwimg">
                                                    <Link to={
                                                        `/products/${wish.name}`
                                                    } >
                                                        <img class="lazyload img-fluid mx-auto" src={Apis.slug + wish.image} alt="" />
                                                </Link>
                                                <a href="# " class="wbwishremove wishactive" title="Remove Wishlist" onClick={() => deleteWishlist(wish)}>
                                                    <span class="wbaddtowish">
                                                        <svg>
                                                            <use to="#wish"></use>
                                                        </svg>
                                                    </span>

                                                    <span class="wbwishirmv">
                                                        <i class="fa fa-remove"></i>
                                                    </span>
                                                </a>
                                            </div>
                                            <div class="wbwishdesc">
                                                <h5><Link to={
                                                    `/products/${wish.name}`

                                                } >{wish.name}</Link></h5>
                                                <div class="product-price">

                                                    <span class="price-sale">DA {wish.price}</span>
                                                    {/* <span class="compare-price">₹ 650.00</span> */}
                                                </div>
                                            </div>
                                        </div>
                                        </div>)
                                })
                    ) : (
                    <div className="cart__warnings" style={{ display: "block", margin: "auto" }}>
                        <h1 className="cart__empty-text" style={{ display: "block" }}>{i18n.t('Your wishlist is empty')}</h1>
                        <a href="/" className="button">
                            {i18n.t('Continue shopping')}
                        </a><h2 className="cart__login-title">{i18n.t("Have an account?")}</h2>
                        <p className="cart__login-paragraph">
                            <a href="/login" className="link underlined-link">{i18n.t('Log in')}</a> {i18n.t('to check out faster.')}
                        </p>
                    </div>
                    )

                        }
                </div>
                {wishlist.length > 0 &&
                    <div className="text-center">
                        <Link to="/" class="btn btn-primary" style={{ marginRight: "5px" }}>{i18n.t('Continue shopping')}</Link>
                        <a href="# " id="wbwishcall" class="btn btn-primary" onClick={() => deleteAllWishlist(wishlist)}>  {i18n.t('Clear Wishlist')}</a>
                    </div>
                }
            </div>


        </div>
        </>
    )

}

export default Wishlist;