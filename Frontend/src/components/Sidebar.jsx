import { Card } from "react-bootstrap";
import { HomeIcon, LayoutDashboardIcon, LogOut, MessagesSquare, NotebookIcon, PanelLeftClose, Search, Settings2, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import '../style/index.css'

function Sidebar({collapsed, setCollapsed}) {

    const { user, logoutUser } = useAuth();

    return (
        <>
            <div
                className="d-flex flex-column text-dark none-at-1796px"
                style={{
                    width: "100%",
                    height: "100%",
                    background: "#ffffffff",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    borderRadius: "0 25px 25px 0",
                    padding: "20px 10px",
                }}
            >
                {/* HEADER */}
                <div className="d-flex justify-content-end my-3">

                    <PanelLeftClose
                        onClick={() => setCollapsed(!collapsed)}
                    />

                </div>

                {/* MENU ITEMS */}
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item mb-2">
                        <button
                            className="nav-link text-dark d-flex align-items-center gap-3 w-100"
                            style={{
                                borderRadius: "15px",
                                padding: "10px 15px",
                            }}
                        >
                            <HomeIcon />
                            <i className="bi bi-house-door fs-5" />
                            {!collapsed && <span>Home</span>}
                        </button>
                    </li>

                    {
                        user.role === 'dottore' ?
                            <li className="nav-item mb-2">
                                <Card.Link
                                    as={Link}
                                    className="nav-link text-dark d-flex align-items-center gap-3 w-100"
                                    style={{
                                        borderRadius: "15px",
                                        padding: "10px 15px",
                                    }}
                                >
                                    <User />
                                    <i className="bi bi-person fs-5" />
                                    {!collapsed && <span>Profilo</span>}
                                </Card.Link>
                            </li>
                            :
                            null
                    }

                    <hr style={{ borderColor: "#e2e8f0" }} />

                    {
                        user.role === 'dottore' ?
                            <li className="nav-item mb-2">
                                <button
                                    className="nav-link text-dark d-flex align-items-center gap-3 w-100"
                                    style={{
                                        borderRadius: "15px",
                                        padding: "10px 15px",
                                    }}
                                >
                                    <LayoutDashboardIcon />
                                    <i className="bi bi-speedometer2 fs-5" />
                                    {!collapsed && <span>Dashboard</span>}
                                </button>
                            </li>
                            :
                            <li className="nav-item mb-2">
                                <Link
                                    to='/default'
                                    className="nav-link text-dark d-flex align-items-center gap-3 w-100"
                                    style={{
                                        borderRadius: "15px",
                                        padding: "10px 15px",
                                    }}
                                >
                                    <Search />
                                    <i className="bi bi-speedometer2 fs-5" />
                                    {!collapsed && <span>Cerca</span>}
                                </Link>
                            </li>
                    }

                    <li className="nav-item mb-2">
                        <Link
                            to='/messages'
                            className="nav-link text-dark d-flex align-items-center gap-3 w-100"
                            style={{
                                borderRadius: "15px",
                                padding: "10px 15px",
                            }}
                        >
                            <MessagesSquare />
                            <i className="bi bi-chat-dots fs-5" />
                            {!collapsed && <span>Messaggi</span>}
                        </Link>
                    </li>

                    {
                        user.role === 'dottore' ?
                            <li className="nav-item mb-2">
                                <button
                                    className="nav-link text-dark d-flex align-items-center gap-3 w-100"
                                    style={{
                                        borderRadius: "15px",
                                        padding: "10px 15px",
                                    }}
                                >
                                    <NotebookIcon />
                                    <i className="bi bi-bell fs-5" />
                                    {!collapsed && <span>Notifiche</span>}
                                </button>
                            </li>
                            :
                            null
                    }

                    <li className="nav-item mb-2">
                        <button
                            className="nav-link text-dark d-flex align-items-center gap-3 w-100"
                            style={{
                                borderRadius: "15px",
                                padding: "10px 15px",
                            }}
                        >
                            <Settings2 />
                            <i className="bi bi-gear fs-5" />
                            {!collapsed && <span>Impostazioni</span>}
                        </button>
                    </li>

                    <li className="nav-item mt-3 pt-3 border-top">
                        <button
                            onClick={logoutUser}
                            className="nav-link text-dark d-flex align-items-center gap-3 w-100"
                            style={{
                                borderRadius: "15px",
                                padding: "10px 15px",
                            }}
                        >
                            <LogOut />
                            <i className="bi bi-box-arrow-right fs-5" />
                            {!collapsed && <span>Disconnetti</span>}
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar