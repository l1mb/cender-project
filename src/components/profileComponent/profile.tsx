import inputState from "@/elements/inputElement/state/InputState";
import InputText from "@/elements/inputElement/inputText";
import ProfileButton from "@/elements/profile/buttons/button";
import React, { Suspense, useEffect, useState } from "react";
import defaultInputState from "@/elements/inputElement/state/defaultstate";
import EmailValidation from "@/types/classes/validation/emailValidation";
import Label from "@/elements/home/labelElement/label";
import { useDispatch, useSelector } from "react-redux";
import updateUserDispatch from "@/redux/actions/update";
import userDto from "@/api/types/user/userDto";
import userService from "@/api/httpService/user/userService";
import toastProps from "@/types/constants/toasts/toastProps";
import { toast } from "react-toastify";
import StateType from "@/redux/types/stateType";
import Spinner from "@/elements/home/spinnerElement/spinner";
import errors from "@/types/constants/errors/errors";
import passwordMessages from "@/types/constants/messages/profile";
import profileData from "@/types/constants/components/profile/profileData";
import UsernameValidation from "@/types/classes/validation/usernameValidation";
import Thead from "@/elements/cart/orderTable/thead";
import orderTheadData from "@/types/constants/components/cart/thead";
import OrderProduct from "@/types/interfaces/order/orderProducts";
import SorryImage from "@/elements/cart/sorryImage/sorryImage";
import clockImage from "src/assets/images/profile/clock.png";
import { NavLink } from "react-router-dom";
import orders from "@/api/httpService/orders/orders";
import orderTypes from "@/types/constants/orders/orderTypes";
import styles from "./profile.module.scss";
import RoutesData from "../routesComponent/types/routes/RoutesData";

const Modal = React.lazy(() => import("../modalComponent/modalComponent/modal"));
const PasswordModal = React.lazy(() => import("../modalComponent/passwordModalComponent/passwordModal"));

const Profile: React.FC = (): JSX.Element => {
  const [emailProp, setEmailProp] = useState<inputState>(defaultInputState);
  const [usernameProp, setUsernameProp] = useState<inputState>(defaultInputState);
  const [isInvalid, setInvalid] = useState(true);
  const [isOpen, setOpen] = useState(false);

  const [completed, setCompleted] = useState<OrderProduct[]>([]);

  const user: userDto = useSelector<StateType, userDto>((state: StateType): userDto => state.user);
  const takePrice = (orderProduct: OrderProduct[]) =>
    orderProduct.map((e) => e.Products.price * e.item.count).reduce((acc, a) => acc + a, 0);

  const dispatch = useDispatch();

  const setEmail = (e: inputState) => setEmailProp(e);
  const setUsername = (e: inputState) => setUsernameProp(e);
  const openModal = (e: boolean) => setOpen(e);

  const saveChanges = () => {
    const userModel: userDto = {
      email: emailProp.value,
      userName: usernameProp.value,
      id: user.id,
    };
    if (!isInvalid) {
      dispatch(updateUserDispatch(userModel));
    }
  };

  const getCompleted = async () => {
    try {
      const zipped = await orders.getZippedOrders(orderTypes.completed);
      setCompleted(zipped);
    } catch (error) {
      toast.error(errors.ProductDeleted);
    }
  };

  const savePassword = async (password: string) => {
    if (password !== "") {
      const responseStatus = await userService.patch(password);
      if (responseStatus.status !== 204) {
        toast.error(errors.profileUpdate, toastProps);
      } else {
        toast.success(passwordMessages.passwordSuccess, toastProps);
      }
    }
  };

  useEffect(() => {
    getCompleted();
  }, []);

  useEffect(() => {
    setInvalid(emailProp.error != null || usernameProp.error != null);
  }, [emailProp.error, usernameProp.error]);

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.container}>
        <Label content={profileData.label.profile} classname={styles.label} />
        <div className={styles.content}>
          <div className={styles.column}>
            <div className={styles.imageContainer}>
              <div className={styles.avatarCircle}>
                <span className={styles.initials}>{user.userName[0]}</span>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <InputText
              setValue={setEmail}
              propName="email"
              label={profileData.label.email}
              validation={new EmailValidation()}
              inputType="text"
              predefinedValue={user.email}
            />
            <InputText
              setValue={setUsername}
              inputType="text"
              propName="username"
              label={profileData.label.username}
              validation={new UsernameValidation()}
              predefinedValue={user.userName}
            />
          </div>
          <div className={styles.column}>
            <div className={styles.sideButtons}>
              <ProfileButton label={profileData.label.changePassword} action={() => openModal(true)} />
            </div>
            <div className={styles.sideButtons}>
              <ProfileButton disabled={isInvalid} label={profileData.label.save} action={saveChanges} />
            </div>
            {isInvalid && (
              <div className={styles.error}>
                <span>You cant procceed untill you fiil each field</span>
              </div>
            )}
          </div>
        </div>
        {completed.length > 0 ? (
          <div className={styles.table}>
            <table>
              <Thead data={orderTheadData.slice(1)} />
              <tbody>
                {completed.map((element) => {
                  const date = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(element.item.createOrderDate.toString()));
                  return (
                    <React.Fragment key={element.item.id}>
                      <tr className={styles.row}>
                        <td>{element.Products.name}</td>
                        <td>{element.Products.platform}</td>
                        <td>{date}</td>
                        <td>{element.Products.count}</td>
                        <td>{element.Products.price}</td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
            <span>Total cost: {takePrice(completed)}$</span>
          </div>
        ) : (
          <SorryImage label="Buy something" image={clockImage} className={styles.sorryImage}>
            <h2>Your history is empty</h2>
            <NavLink to={RoutesData.products[0].route}>Add some products into your cart</NavLink>
          </SorryImage>
        )}
      </div>
      <Suspense fallback={<Spinner />}>
        <Modal isOpen={isOpen} setOpen={openModal}>
          <PasswordModal onSubmit={savePassword} />
        </Modal>
      </Suspense>
    </div>
  );
};

export default Profile;
