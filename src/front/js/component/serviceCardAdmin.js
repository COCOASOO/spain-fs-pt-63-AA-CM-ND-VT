import React, { useContext, useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import "../../styles/ServiceCard.css";
import { Context } from "../store/appContext";

const ServiceCardAdmin = ({ service, onEdit, onDelete }) => {
    const { store, actions } = useContext(Context);
    const [serviceTypeName, setServiceTypeName] = useState("");
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dszc6zmjd'
        }
    });

    const myImage = service.image ? cld.image(service.image) : null;

    useEffect(() => {
        const fetchMasterServices = async () => {
            const masterServices = await actions.getMasterServices();
            const serviceType = masterServices.find(ms => ms.id === service.type);
            if (serviceType) {
                setServiceTypeName(serviceType.type);
            }
        };

        fetchMasterServices();
    }, [service.type, actions]);

    return (
        <div className="card mb-4">
            <div className="row no-gutters">
                <div className="col-md-3 d-none d-md-block">
                    <div className="card-img-left">
                        {myImage ? (
                            <AdvancedImage cldImg={myImage} className="img-cover" />
                        ) : (
                            <img src="https://dummyimage.com/300x200/cccccc/000000.jpg&text=No+image+available" alt="Default" className="img-cover" />
                        )}
                    </div>
                </div>
                <div className="col-md-7 col-12">
                    <div className="card-body rounded m-2">
                        <h5 className="card-title">{service.name}</h5>
                        <p className="card-text">Description: {service.description}</p>
                        <p className="card-text">Type: {serviceTypeName}</p>
                        <p className="card-text">Price: {service.price}€</p>
                        <p className="card-text">Duration: {service.duration} minutes</p>
                        <p className="card-text">Available: {service.available ? "Yes" : "No"}</p>
                    </div>
                </div>
                <div className="col-md-2 col-12">
                    <div className="d-flex justify-content-center flex-wrap mt-3">
                        <button className="btn btn-outline-primary rounded py-1 px-2 m-2 btnwid" onClick={() => onEdit(service)}>Edit</button>
                        <button className="btn btn-outline-danger rounded py-1 px-2 m-2 btnwid" onClick={() => onDelete(service.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCardAdmin;
