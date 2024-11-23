import { Link } from "react-router-dom";
import LogoUnifor from "../../../src/assets/Unifor.png"
export const Header = () => {
    return(
        <>
            <section>
                <div>
                    <h1>Header</h1>
                    <img src={LogoUnifor} alt="Logo Unifor"/>
                </div>

                <div>
                    <nav>
                        <button><Link to={"/loginPage"}>Login</Link></button>
                        <button><Link to={"/registerPage"}>Register</Link></button>
                    </nav>
                </div>
            </section>
        </>
    );
};