import "./PaginaInicialBack.css"

export const PaginaInicialBack = () => {
    return(
        <div className="Back-Main">
            <div className="info-card"> 
            <div className="BackOfficeMain-Header">
                <h1>DashBoard</h1>
                <h3>For a full experience use the navigation bar</h3> 
            </div>
                <div className="conteiner-card">            
                    <h4>In this page you can :</h4>
                    <ul id="main-ul">
                        <li className="main-li"> Manage the Users on "Users"</li>
                        <li className="main-li"> Manage the Hotels on "Hotels"</li>
                        <li className="main-li"> Manage the Rooms on "Rooms" </li>
                        <li className="main-li"> Manage reservations on "Reservations" </li>
                    </ul>  
                </div>
            </div>
        </div>
    )
}