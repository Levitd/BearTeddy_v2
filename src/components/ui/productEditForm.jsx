import React, { useEffect, useState } from "react";
import Page from "../page";
import { FormattedMessage, useIntl } from "react-intl";
import FormComponent, { ButtonField, SubmitCancelButton } from "../common/form";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import { updateProduct } from "../../store/products";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import configFile from "../../config.json";
import UploadFileToFireBaseStorage, { DeleteFileInFireBaseStorage } from "../../utils/UploadFileToFirebaseStorage";
import { uploadImageActiveProductStart } from "../../services/localStorage.service";
import { useNavigate } from "react-router-dom";
import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteFileInActiveProduct } from "../../store/activeProduct";

const ProductEditForm = ({ path, currentUser, param, productId, activeProduct }) => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const savedData = { ...activeProduct };
    const navigate = useNavigate();

    const validatorConfig = {
        name: {
            isRequired: {
                message: <FormattedMessage id='name_is_required' />
            },
            min: { message: <FormattedMessage id='name_must_be_at_least_2_characters' />, value: 2 }
        },
        password: {
            isRequired: {
                message: <FormattedMessage id='password_is_required' />
            },
            isCapitalSymbol: { message: <FormattedMessage id='password_must_contain_at_least_1_capital_letter' /> },
            isContainNumber: { message: <FormattedMessage id='password_must_contain_at_least_1_number' /> },
            min: { message: <FormattedMessage id='password_must_be_at_least_8_characters' />, value: 7 }
        },
        dateOfBirth: {
            maxDate: { message: <FormattedMessage id='max_date_of_birth' /> }
        },
        telegram: {
            isLink: { message: <FormattedMessage id="link_is_incorrect" /> }
        }
    };

    const handleSubmit = (data) => {
        console.log(data);
        const haveImage = data.image ? [...data.image] : [];
        console.log(haveImage);
        const files = document.querySelector(`#avatar`).files;
        if (files && files.length > 0) {
            uploadImageActiveProductStart();
            UploadFileToFireBaseStorage(files);
            let upFiles = false;//localStorage.getItem("uploadToFitebaseEnd");
            let i = 0
            waitUp();
            function waitUp() {
                setTimeout(() => {
                    upFiles = JSON.parse(localStorage.getItem("uploadToFitebaseEnd"));
                    console.log(upFiles);
                    if (upFiles) {
                        const newImage = JSON.parse(localStorage.getItem("uploadToFitebaseFiles"));
                        newImage.map((ni) => {
                            haveImage.push(ni);
                        })
                        data.image = { ...haveImage };
                        console.log(data);
                        UpLoad(data)
                    } else {
                        waitUp();
                    }
                }, 500)
            }
        } else {
            UpLoad(data);
        }
    };
    function UpLoad(data) {
        dispatch(updateProduct(data));
        navigate(-1);
    };
    const recalculation = (data) => {
    };

    const HandleTrash = (e) => {
        let el = e.target.parentNode;
        if (el.tagName === "svg") el = el.parentNode;
        const deletedFile = DeleteFileInFireBaseStorage(el.id);
        console.log(deletedFile);
        // if (deletedFile) {
        let images = [];
        activeProduct.image.map((f) => {
            if (f.name !== el.id) images.push(f);
        });
        const newAP = { ...activeProduct, image: images }
        console.log(newAP);
        dispatch(deleteFileInActiveProduct(el.id));
        dispatch(updateProduct(newAP));
        // }
    }

    const firebaseStorigeUrl = configFile.imgPreviewPathFirebaseStorige;
    //
    const images = activeProduct.image
    console.log(images);
    return (
        <Page title={activeProduct.name} noTranslate={true} widthScreen="w-full my-5 px-5 p-5 mx-auto bg-state-300 rounded border-2 shadow-md">
            <div className="flex flex-col lg:flex-row gap-5 relative">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-3 lg:max-w-[350px]">
                        {images && images.map((p) => {
                            return (
                                <div key={`div_${p.name}`} className="relative">
                                    <button onClick={HandleTrash} id={p.name}>
                                        <TrashIcon className="h-12 w-12 text-red-300 hover:text-red-800 pb-2 absolute left-3 top-5 cursor-pointer hover:scale-150 transition-transform duration-300" key={`trash_${p.name}`} />
                                    </button>
                                    <img src={`${firebaseStorigeUrl}${p.name}?alt=media&token=${p.token}`} alt="" key={`activeProductImage_${p.name}`} />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="w-full lg:w-1/2">
                    <FormComponent onSubmit={handleSubmit}
                        validatorConfig={validatorConfig}
                        defaultData={savedData}
                        recalculation={recalculation}
                    >
                        <input type="file"
                            id="avatar" name="avatar" multiple
                            accept="image/png, image/jpeg"></input>

                        {/* <img src={firebaseStorigeUrl + activeProduct.image[0].name + "?alt=media&token=" + activeProduct.image[0].token} alt="" /> */}

                        {/* <ImgFileld path="imgProfilePath" file={savedData.profile} addClass="h-32 w-auto mx-left mb-2 rounded-md" /> */}
                        <TextField
                            label={<FormattedMessage id='name' />}
                            name="name"
                            autoFocus
                        />
                        <TextAreaField
                            label={<FormattedMessage id='description' />}
                            name="about"
                            type="textarea"
                            rows={10}
                        />
                        <TextField
                            label={<FormattedMessage id='price' />}
                            name="price"
                            type={"number"}
                        />
                        <TextField
                            label={<FormattedMessage id='shipping' />}
                            name="shipping"
                            type={"number"}
                        />
                        {/* <TextField
                    label={<FormattedMessage id='date_of_birth' />}
                    name="dateOfBirth"
                    type="date"
                    max={today}
                /> */}
                        {/* <TextField
                                label={<FormattedMessage id='full_years' />}
                                name="fullYears"
                                readOnly="readonly"
                                disabled={true}
                                noValid={true}
                            /> */}
                        {/* <RadioField
                    options={[
                        { name: <FormattedMessage id='male' />, value: "male", description: "" },
                        { name: <FormattedMessage id='female' />, value: "female", description: "" }
                    ]}
                    name="sex"
                    label={<FormattedMessage id='choose_your_gender' />}
                    valueDefault={savedData.sex}
                /> */}
                        {/* <TextField
                    label={<FormattedMessage id='your_telegram_profile' />}
                    labelLeft={<i className="bi bi-telegram icon-size-big"></i>}
                    type="text"
                    name="telegram"
                /> */}
                        <SubmitCancelButton name="submitCancelButton">
                            <ButtonField type="submit" name="submit" label="save_changes" />
                            <ButtonField type="cancel" name="cancel" label="cancel_changes" />
                        </SubmitCancelButton>
                        {/* <MessageWindow label="data_saved" name="message" type="message" /> */}
                    </FormComponent>
                </div>
            </div>


        </Page>
    );
}

export default ProductEditForm;