import React from "react";
import { useIntl } from "react-intl";
import ListBoxFilter from "../components/ListBoxFilter";
import Page from "../components/page";
// import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import InputSearch from "../components/inputSearch";

const MainPage = ({ locale }) => {
    const intl = useIntl()
    // console.log(intl.messages.search)
    const placeholder = intl.messages.search;

    // const handleClickFilters = () => {
    //     console.log("handleClickFilters");
    //     const filtersEl = document.querySelector(".filters");
    //     filtersEl.classList.toggle("filters_show");
    // };
    const listBay = [
        { id: 1, name: intl.messages.the_newest },
        { id: 2, name: intl.messages.favorite },
        { id: 3, name: "Еще не проданные" },
        { id: 4, name: "Нашедшие свой дом" },
        { id: 5, name: "Ищут новый дом" },
    ];
    const listSize = [
        { id: 1, name: intl.messages.all_sizes },
        { id: 2, name: "до 14 см" },
        { id: 3, name: "от 14 см до 20 см" },
        { id: 4, name: "от 20 см до 35 см" },
        { id: 5, name: "от 35 см и выше" },
    ];
    const listPrice = [
        { id: 1, name: intl.messages.any_price },
        { id: 2, name: "до 100$" },
        { id: 3, name: "от 100$ до 250$" },
        { id: 4, name: "от 250$ до 500$" },
        { id: 5, name: "от 500$ и выше" },
    ];
    const filterStyle = "w-full lg:max-w-xs";
    return (
        <>
            <Page>
                <div className="main">
                    <div className="flex flex-col lg:flex-row">
                        <InputSearch name="search" placeholder={placeholder} />
                        {/* <div className="search flex flex-row">
                            <div className="input-group">

                                <input type="text" className="form-control" placeholder={placeholder} aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                                    <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />

                                </button>
                            </div>
                            <div className="ms-1 btn-filters">
                                <button type="button" onClick={handleClickFilters} className="btn btn-secondary"><i className="bi bi-filter-square"></i></button>
                            </div>
                        </div> */}
                        <div className="filters pe-2 py-2 flex flex-col lg:flex-row w-11/12 lg:w-full mx-auto justify-around flex-wrap sm:flex-nowrap flex-auto gap-2 place-content-stretch">
                            <div className={filterStyle}>
                                <ListBoxFilter list={listBay} locale={locale} />
                                {/* <select className="form-select form-select_filters" aria-label="Default select news">
                            <option value="1"><FormattedMessage id='the_newest' /></option>
                            <option value="2"><FormattedMessage id='favorite' /></option>
                            <option value="3">Еще не проданные</option>
                            <option value="4">Нашедшие свой дом</option>
                            <option value="5">Ищут новый дом</option>
                        </select> */}
                            </div>
                            <div className={filterStyle}>
                                <ListBoxFilter list={listSize} locale={locale} />
                                {/* <select className="form-select form-select_filters" aria-label="Default select size">
                            <option value="1">Все размеры</option>
                            <option value="2">до 14 см</option>
                            <option value="3">от 14 см до 20 см</option>
                            <option value="4">от 20 см до 35 см</option>
                            <option value="5">от 35 см и выше</option>
                        </select> */}
                            </div>
                            <div className={filterStyle}>
                                <ListBoxFilter list={listPrice} locale={locale} />
                                {/* <select className="form-select form-select_filters" aria-label="Default select price">
                            <option value="1">Любая цена</option>
                            <option value="2">до 100$ </option>
                            <option value="3">от 100$ до 250$</option>
                            <option value="4">от 250$ до 500$</option>
                            <option value="5">от 500$ и больше</option>
                        </select> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Page>
        </>
    );
};

export default MainPage;
