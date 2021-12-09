/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { NavLink } from "react-router-dom";
import DropMenu from "@/elements/dropdownMenuElement/dropdown";
import HeaderProps from "@/types/interfaces/props/headerProps/headerProps";
import { useSelector } from "react-redux";
import HeaderCartItem from "@/elements/cart/headerCartElement/header";
import StateType from "@/redux/types/stateType";
import roles from "@/types/constants/roles/roles";
import styles from "./nav.module.scss";

const Navigation: React.FC<HeaderProps> = (props): JSX.Element => {
  const appState = useSelector<StateType, StateType>((state) => state);

  return (
    <nav className={styles.navBar}>
      <ol>
        <li>
          <NavLink activeClassName={styles.active} to={props.data.home.route}>
            {props.data.home.label}
          </NavLink>
        </li>

        <div tabIndex={0} className={styles.dropdown_link_wrapper}>
          <span>Products</span>
          <DropMenu props={{ data: props.data.products, className: styles.dropdown_wrapper }} />
        </div>
        <li>
          <NavLink activeClassName={styles.active} to={props.data.about.route}>
            {props.data.about.label}
          </NavLink>
        </li>
        <li>
          {!appState.user.authencated ? (
            <NavLink activeClassName={styles.active} to={props.data.signIn.route}>
              {props.data.signIn.label}
            </NavLink>
          ) : (
            <NavLink activeClassName={styles.active} to={props.data.profile.route}>
              {appState.role === roles.admin ? appState.role : appState.user.userName}
            </NavLink>
          )}
        </li>

        {!appState.user.authencated ? (
          <li>
            <NavLink activeClassName={styles.active} to={props.data.signUp.route}>
              {props.data.signUp.label}
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <HeaderCartItem styles={styles} data={props} />
            </li>
            <li>
              <button type="button" onClick={props.signOutHandle}>
                <span>Sign out</span>
              </button>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};
export default Navigation;
