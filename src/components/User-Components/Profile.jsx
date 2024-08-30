import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateImageUrl } from '../../services/url.service';
import { getUserById } from '../../services/User.service';
import { ROLES_CONSTANT } from '../Utility/constant';
import { errorToast } from '../Utility/Toast';
import { Col, Container, Row } from 'react-bootstrap';
import iconp from "../../assets/image/home/images/icon-person.png";
import iconb from "../../assets/image/home/images/icon-build.png";
import { MdEdit } from "react-icons/md";
import { IoEye } from "react-icons/io5";

export default function Profile() {
    let role = useSelector(state => state.auth.role)
    let id = useSelector(state => state.auth.user._id)
    const [userObj, setUserObj] = useState({});
    const navigate = useNavigate()

    const handleGetUser = async () => {
        try {
            let { data: res } = await getUserById(id)
            if (res.data) {
                console.log(res.data, "dataa")
                setUserObj(res.data);
            }
        }
        catch (err) {
            errorToast(err)
        }
    }


    useEffect(() => {

        handleGetUser()

    }, [])

    return (




        <div className='container my-5'>

            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-6">
                    <div className="profile-section-container">
                        <div className="row d-flex justify-content-between ">
                            <div className="col-6  profile-section-Heading px-4 py-3">Personal Details</div>
                            <div className="col-6 d-flex">
                                <button type="button " onClick={() => { navigate(`/Edit-Profile`) }} className="theme-outline-button ">
                                    <span className='editicn'><MdEdit /></span>  <span>Edit</span>
                                </button>
                                <button type="button" onClick={() => { navigate(`/Supplier/${userObj?._id}`) }} className="theme-outline-button" >
                                    <span className='editicn'> <IoEye /></span> <span>View</span>
                                </button>
                            </div>
                        </div>
                        <div className="row profile-section-Details justify-content-center mt-4 d-flex gap-5 align-items-center px-5 py-5">
                            <div className='col-lg-3 col-sm-12 d-flex justify-content-center align-items-center'> <img src={iconp} alt="" className=" " style={{ width: "140px" }} /></div>
                            <div className="col-lg-9 col-sm-12   " style={{ width: "max-content", fontSize: "0.8rem", fontWeight: "500", color: "black" }}>
                                <div className='row'>
                                    {/* <div className="col-4 my-1">
                                        User Name:
                                    </div> */}
                                    <div className="col-12 fs-3 ">
                                        {userObj?.name}
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className="col-4 ">
                                        Phone:
                                    </div>
                                    <div className="col-8 " >
                                        {userObj?.phone}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-4">
                                        Role:
                                    </div>
                                    <div className="col-8 ">
                                        {userObj?.role}
                                    </div>
                                </div>


                                <div className='row'>
                                    <div className="col-4 ">
                                        Country:
                                    </div>
                                    <div className="col-8  " >
                                        {userObj?.countryObj?.name ? userObj?.countryObj?.name : "N.A."}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-4 ">
                                        State:
                                    </div>
                                    <div className="col-8  " >
                                        {userObj?.stateObj?.name ? userObj?.stateObj?.name : "N.A."}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-4 ">
                                        City:
                                    </div>
                                    <div className="col-8  ">
                                        {userObj?.cityObj?.name ? userObj?.cityObj?.name : "N.A."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="col-12 col-lg-6">
                    {
                        role != ROLES_CONSTANT.USER &&
                        <div className="profile-section-container profile-section-container-2">
                            <div className="row d-flex justify-content-between ">
                                <div className="col-6  profile-section-Heading px-4 py-3">Company Details</div>
                                <div className="col-6 d-flex">
                                    <button type="button " onClick={() => { navigate(`/Edit-Profile`) }} className="theme-outline-button ">
                                        <span className='editicn'><MdEdit /></span>  <span>Edit</span>
                                    </button>
                                    <button type="button" onClick={() => { navigate(`/Supplier/${userObj?._id}`) }} className="theme-outline-button" >
                                        <span className='editicn'> <IoEye /></span> <span>View</span>
                                    </button>
                                </div>
                            </div>
                            <div className="row profile-section-Details justify-content-center mt-4 d-flex  align-items-center px-4 py-4">
                                <div className='col-lg-4 col-sm-12 d-flex justify-content-center align-items-center'> <img src={iconb} alt="" className=" " style={{ width: "140px" }} /></div>
                                <div className="col-lg-8 col-sm-12   " style={{ fontSize: "0.8rem", fontWeight: "500", color: "black" }}>
                                    <div className='row'>
                                        {/* <div className="col-4 my-1">
                                        User Name:
                                    </div> */}
                                        <div className="col-12 fs-3 ">
                                            {userObj?.companyObj?.name}
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col-7 ">
                                            Email:
                                        </div>
                                        <div className="col-5 " >
                                            {userObj?.companyObj?.email}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-7">
                                            Phone no:
                                        </div>
                                        <div className="col-5">
                                            {userObj?.companyObj?.phone}
                                        </div>
                                    </div>


                                    <div className='row'>
                                        <div className="col-7 ">
                                            Dealing With Brand Names:
                                        </div>
                                        <div className="col-5  " >
                                            {userObj?.brandNames}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-7 ">
                                            GST Number:
                                        </div>
                                        <div className="col-5  " >
                                            {userObj?.companyObj?.gstNumber}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-7 ">
                                            Address:
                                        </div>
                                        <div className="col-5  ">
                                            {userObj?.companyObj?.address}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-7 ">
                                            Year of Establishment:
                                        </div>
                                        <div className="col-5  ">
                                            {userObj?.companyObj?.yearOfEstablishment}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className="col-7 ">
                                            Google Maps:
                                        </div>
                                        <div className="col-5  ">
                                            {userObj?.companyObj?.googleMapsLink}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>




                {/* <div className="col-12 col-lg-6">
                    {
                        role != ROLES_CONSTANT.USER &&
                        <div className="profile-section-container rounded">
                            <div className="profile-section-Heading">Company Details</div>

                            <div className="row mt-4 d-flex justify-content-between">
                                <div className="col-5 my-1">
                                    Company Name:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.name}
                                </div>
                                <div className="col-5 my-1">
                                    Company Email:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.email}
                                </div>
                                <div className="col-5 my-1">
                                    Company Phone:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.phone}
                                </div>
                                <div className="col-5 my-1">
                                    Dealing With Brand Names:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.brandNames}
                                </div>
                                <div className="col-5 my-1">
                                Number of Employees:
                            </div>
                            <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                {userObj?.companyObj?.noofepmployee}
                            </div>
                                <div className="col-5 my-1">
                                    GST Number:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.gstNumber}
                                </div>
                                <div className="col-5 my-1">
                                    Address:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.address}
                                </div>



                                <div className="col-5 my-1">
                                    Nature of your business:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.natureOfBusiness}
                                </div>
                                <div className="col-5 my-1">
                                    Annual Turnover:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.annualTurnover}
                                </div>

                                <div className="col-5 my-1">
                                    Year of Establishment:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.yearOfEstablishment}
                                </div>
                                <div className="col-5 my-1">
                                    Legal Status:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.legalStatus}
                                </div>
                                <div className="col-5 my-1">
                                    Company Ceo Name:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.companyCeo}
                                </div>
                                <div className="col-5 my-1">
                                    Google Maps Link:
                                </div>
                                <div className="col-7  my-1" style={{ wordBreak: "break-all" }}>
                                    {userObj?.companyObj?.googleMapsLink}
                                </div>
                            </div>
                        </div>
                    }
                </div> */}
            </div>












            <div className="row">
                {
                    role != ROLES_CONSTANT.USER &&
                    <div>
                        <div className="row d-flex justify-content-between">
                            <div className="col-6  profile-section-Heading px-4 py-3">Subscription Status</div>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 pt-2 d-flex justify-content-end">
                                {
                                    userObj?.subscriptionEndDate &&
                                    <div className="theme-outline-button">
                                        Subscription ends On -  {moment(userObj?.subscriptionEndDate).format("DD-MM-YYYY")}  ({userObj?.isBlocked ? "Blocked Subscription" : "Active Subscription"})
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="row mt-4 d-flex justify-content-between">
                            <div className="col-12">
                                <div className="row d-flex justify-content-between profile-section-container">
                                    {/* <h4 className="col-12">
                                    {userObj?.userSubscriptionMessage}
                                </h4> */}
                                    {/* <h6 className="mt-3 p-3 theme-outline-button" style={{ width: "30%" }}>
                                    <div style={{ fontSize: 25, fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>
                                        Advertisement balance
                                    </div>
                                    <div className='mt-3' style={{ fontSize: 20, color: "black", fontWeight: 300 }}>
                                        {userObj?.numberOfPromotions ? userObj?.numberOfPromotions : 0}
                                    </div>
                                </h6>
                                <h6 className="mt-3 p-3 theme-outline-button" style={{ width: "30%" }}>
                                    <div style={{ fontSize: 25, fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>
                                        Flashsale balance
                                    </div>
                                    <div className='mt-3' style={{ fontSize: 20, color: "black", fontWeight: 300 }}>{userObj?.numberOfSales ? userObj?.numberOfSales : 0}</div>
                                </h6>
                                <h6 className="mt-3 p-3 theme-outline-button" style={{ width: "30%" }}>
                                    <div style={{ fontSize: 25, fontWeight: 600, color: "rgba(0,0,0,0.5)" }}>
                                        Flashsale balance (Days)
                                    </div>
                                    <div className='mt-3' style={{ fontSize: 20, color: "black", fontWeight: 300 }}>
                                        {userObj?.saleDays ? userObj?.saleDays : 0}
                                    </div>
                                </h6> */}

                                    <div className="col-12 col-md-3 py-3">
                                        <div className=" porfilebox">              
                                        <h6> {userObj?.numberOfAdvertisement ? userObj?.numberOfAdvertisement : 0} </h6>          
                                            <h4 > Advertisement balance  </h4>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3 py-3">
                                        <div className="porfilebox" >
                                            <h6>{userObj?.advertisementDays ? userObj?.advertisementDays : 0}</h6>
                                            <h4>Advertisement balance (Days)</h4>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3 py-3">
                                        <div className=" porfilebox">
                                            <h6>{userObj?.numberOfSales ? userObj?.numberOfSales : 0}</h6>
                                            <h4>Flash sale balance</h4>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-3 py-3">
                                        <h6 className="porfilebox">
                                            <h6>  {userObj?.saleDays ? userObj?.saleDays : 0} </h6>
                                            <h4> Flash sale balance (Days)</h4>
                                               
                                        </h6>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>


            {/* {
                role != ROLES_CONSTANT.USER &&
                <div style={{ width: "100%" }} className="profile-section-container rounded">
                    <div className="profile-section-Heading">Documents Uploaded</div>
                    <div className="row mt-4 d-flex justify-content-between">
                        {
                            userObj?.documents && userObj?.documents.length > 0 && userObj?.documents.map((el, index) => {
                                return (
                                    <div className="col-12 pt-4" key={index}>
                                        <div className="row">
                                            <div className="col-12 col-lg-4" style={{ fontSize: 20, fontWeight: "500", textTransform: "capitalize", color: "rgba(0,0,0,0.4)" }} >
                                                {el.name}
                                            </div>
                                            <div className="col-12 col-lg-8">
                                                <a target={"_blank"} href={generateImageUrl(el.image)}><img style={{ height: 200 }} src={generateImageUrl(el.image)} alt="" /></a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr />
                    <div className="profile-section-Heading mt-4">Images Uploaded</div>
                    <div className="row mt-4 d-flex justify-content-between">
                        {
                            userObj?.imagesArr && userObj?.imagesArr.length > 0 && userObj?.imagesArr.map((el, index) => {
                                return (
                                    <div className="col-6 col-md-2 border rounded d-flex justify-content-center align-items-center py-3" key={index}>
                                        <a target={"_blank"} href={generateImageUrl(el.image)}><img style={{ height: 150, width: 150 }} src={generateImageUrl(el.image)} alt="" /></a>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr />
                    <div className="profile-section-Heading mt-4">Videos Uploaded</div>
                    <div className="row mt-4 d-flex justify-content-between gap-1">
                        {
                            userObj?.videoArr && userObj?.videoArr.length > 0 && userObj?.videoArr.map((el, index) => {
                                return (
                                    <div className="col-6 col-md-2  border rounded d-flex justify-content-center align-items-center py-3" key={index}>
                                        <a target={"_blank"} href={generateImageUrl(el.video)}>
                                            <video height={100} width={100} src={generateImageUrl(el.video)} />
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            } */}

        </div >
    )
}
