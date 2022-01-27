import React from 'react';
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.onInput = this.onInput.bind(this);
    }

    onInput(e) {
        let { countryList, rootStateHandler } = this.props;
        let goodArray = countryList.map((countryObj) => countryObj.location);

        console.log(goodArray);
        if (goodArray.includes(e.target.value )) {
            console.log('match found')
            rootStateHandler(e.target.value);
        }

    }


    render() {

        let { location, countryList } = this.props;
        let label;

        switch (location) {
            case '/':
                label = 'Overview'
                break;

            default:
                break;
        }
        return (
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-hidden">
                    <div className="col-12 col-sm-3 col-xl-2 px-sm-2 px-0 bg-dark d-flex sticky-top">
                        <div className="d-flex flex-sm-column flex-row flex-grow-1 align-items-center align-items-sm-start px-3 pt-2 text-white">
                            <a href="/" className="d-flex align-items-center pb-sm-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5">C<span className="d-none d-sm-inline">ovid</span></span>
                            </a>
                            <ul className="nav nav-pills flex-sm-column flex-row flex-nowrap flex-shrink-1 flex-sm-grow-0 flex-grow-1 mb-sm-auto mb-0 justify-content-center align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <Link to='/'>
                                        <div className="nav-link px-sm-0 px-2">
                                            <i className="fs-5 bi-house"></i><span className="ms-1 d-none d-sm-inline">Overview</span>
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-sm-0 px-2">
                                        <i className="fs-5 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-sm-0 px-2">
                                        <i className="fs-5 bi-table"></i><span className="ms-1 d-none d-sm-inline">Orders</span></a>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="nav-link dropdown-toggle px-sm-0 px-2" id="dropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fs-5 bi-bootstrap"></i><span className="ms-1 d-none d-sm-inline">Bootstrap</span>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdown">
                                        <li><a className="dropdown-item" href="#">New project...</a></li>
                                        <li><a className="dropdown-item" href="#">Settings</a></li>
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a className="dropdown-item" href="#">Sign out</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-sm-0 px-2">
                                        <i className="fs-5 bi-grid"></i><span className="ms-1 d-none d-sm-inline">Products</span></a>
                                </li>
                                <li>
                                    <a href="#" className="nav-link px-sm-0 px-2">
                                        <i className="fs-5 bi-people"></i><span className="ms-1 d-none d-sm-inline">Customers</span> </a>
                                </li>
                            </ul>
                            <div className="dropdown py-sm-4 mt-sm-auto ms-auto ms-sm-0 flex-shrink-1">
                                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="hugenerd" width="28" height="28" className="rounded-circle" />
                                    <span className="d-none d-sm-inline mx-1">Joe</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                    <li><a className="dropdown-item" href="#">New project...</a></li>
                                    <li><a className="dropdown-item" href="#">Settings</a></li>
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-9 col-xl-10 d-flex flex-column h-100">
                        <main className="row h-100 overflow-auto">
                            <div className="col">
                                <div className='row mb-3 sticky-top align-items-center' style={{ color: '#0d6efd', height: '10vh', backgroundColor: '#212529' }}>
                                    <div className='col-6 col-sm-3'>
                                        {label}
                                    </div>
                                    <div className='col-6 col-sm-3'>
                                        {/* <label for="exampleDataList" class="form-label">Datalist example</label> */}
                                        <input className="form-control" onInput={this.onInput} list="datalistOptions" id="countrySelect" placeholder="Select Country" />
                                        <datalist id="datalistOptions">
                                            {countryList.map((country) =>
                                                <option key={country.location} value={country.location} />
                                            )}
                                        </datalist>
                                    </div>
                                </div>
                                {this.props.children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        );
    }
}


export default Navbar;


